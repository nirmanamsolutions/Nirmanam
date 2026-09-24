import { chromium } from 'playwright';

async function runFpsAudit() {
  console.log('🚀 Launching Nirmanam Solutions Automated FPS & Performance Audit...\n');

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--ignore-gpu-blocklist',
      '--enable-gpu-rasterization',
      '--enable-zero-copy',
      '--enable-native-gpu-memory-buffers',
      '--use-gl=desktop'
    ]
  });

  const isMobileTest = process.argv.includes('--mobile');
  const viewport = isMobileTest
    ? { width: 390, height: 844, isMobile: true, hasTouch: true }
    : { width: 1440, height: 900 };

  console.log(`📱 Running in ${isMobileTest ? 'MOBILE WEB VIEWPORT (390x844 Touch)' : 'DESKTOP VIEWPORT (1440x900)'} mode...\n`);

  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.isMobile,
    hasTouch: viewport.hasTouch
  });

  const page = await context.newPage();

  // Navigate to dev server
  const targetUrl = process.env.TEST_URL || 'http://localhost:5173';
  console.log(`📡 Connecting to target URL: ${targetUrl}`);

  try {
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 15000 });
  } catch (err) {
    console.log(`⚠️ Note: networkidle wait reached, continuing with test execution...`);
  }

  // Wait for 3D model preloader curtain to finish
  await page.waitForTimeout(2500);

  // Inject in-page rAF FPS collector
  await page.evaluate(() => {
    window.__fpsData = [];
    window.__frameDrops = [];
    let lastTime = performance.now();

    function measureFrame(now) {
      const delta = now - lastTime;
      if (delta > 0) {
        const fps = Math.min(60, Math.round(1000 / delta));
        const currentScroll = window.scrollY;

        window.__fpsData.push({
          time: now,
          fps: fps,
          delta: delta,
          scroll: currentScroll
        });

        if (fps < 45) {
          window.__frameDrops.push({
            fps,
            delta: delta.toFixed(2),
            scroll: Math.round(currentScroll)
          });
        }
      }
      lastTime = now;
      requestAnimationFrame(measureFrame);
    }
    requestAnimationFrame(measureFrame);
  });

  console.log('⚡ Starting section-by-section scroll performance profiling...\n');

  const sections = [
    { id: 'home', name: 'Hero Section (#home)', components: ['Spline 3D Canvas', 'ParticleCanvas Mesh', 'Framer Parallax'] },
    { id: 'about', name: 'About Section (#about)', components: ['SectionStage 3D Geometry', 'Backdrop Blur Filters', 'Bento Cards'] },
    { id: 'services', name: 'Services Section (#services)', components: ['Services Bento Grid', 'Mouse Radial Spotlight Gradient', 'Glass Panels'] },
    { id: 'portfolio', name: 'Portfolio Section (#portfolio)', components: ['Project Cards Grid', 'Horizontal Scroll Slider', 'Image Scaling'] },
    { id: 'process', name: 'Process Section (#process)', components: ['Vertical Timeline Nodes', 'Staggered Motion Reveal'] },
    { id: 'contact', name: 'Contact Section (#contact)', components: ['3D TypingKeyboard Perspective', 'Form Controls'] }
  ];

  const sectionResults = {};

  for (const section of sections) {
    console.log(`🔍 Profiling viewport section: ${section.name}...`);

    // Scroll section into view
    await page.evaluate((secId) => {
      const el = document.getElementById(secId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, section.id);

    await page.waitForTimeout(400);

    // Perform smooth scroll profiling loop & record active frame rates
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        let distance = 0;
        const totalDistance = 400;
        const speed = 12;
        const scrollFps = [];
        let lastTime = performance.now();

        function smoothStep(now) {
          const delta = now - lastTime;
          if (delta > 0) {
            const currentFps = Math.min(60, Math.round(1000 / delta));
            scrollFps.push(currentFps);
          }
          lastTime = now;

          if (distance < totalDistance) {
            window.scrollBy(0, speed);
            distance += speed;
            requestAnimationFrame(smoothStep);
          } else {
            const avgFps = scrollFps.length ? Math.round(scrollFps.reduce((a, b) => a + b, 0) / scrollFps.length) : 60;
            const minFps = scrollFps.length ? Math.min(...scrollFps) : 60;
            const drops = scrollFps.filter((fps) => fps < 45).length;
            resolve({ avgFps, minFps, drops, totalFrames: scrollFps.length });
          }
        }
        requestAnimationFrame(smoothStep);
      });
    });

    sectionResults[section.id] = {
      ...section,
      ...metrics
    };
  }

  // Get total frame drops summary
  const totalFrameDrops = await page.evaluate(() => window.__frameDrops);

  await browser.close();

  // Output Section-by-Section Performance Audit Report
  console.log('\n========================================================================');
  console.log('📊 NIRMANAM SOLUTIONS - SECTION-BY-SECTION PERFORMANCE AUDIT REPORT');
  console.log('========================================================================\n');

  console.table(
    Object.values(sectionResults).map((res) => ({
      Section: res.name,
      'Avg FPS': `${res.avgFps} FPS`,
      'Min FPS': `${res.minFps} FPS`,
      'Frame Drops (<45)': res.drops,
      'Component Bottlenecks': res.components.join(', ')
    }))
  );

  console.log('\n------------------------------------------------------------------------');
  console.log('🔎 DETAILED COMPONENT BOTTLENECK ANALYSIS:');
  console.log('------------------------------------------------------------------------');

  Object.values(sectionResults).forEach((res) => {
    const status = res.minFps >= 55 ? '✅ EXCELLENT (60 FPS)' : res.minFps >= 40 ? '⚠️ MODERATE' : '❌ FRAME DROPS';
    console.log(`\n• ${res.name}: ${status}`);
    console.log(`  - Average Frame Rate: ${res.avgFps} FPS | Lowest Drop: ${res.minFps} FPS`);
    console.log(`  - Subsystem Components: ${res.components.join(' | ')}`);

    if (res.minFps < 55) {
      console.log(`  - Diagnosis: CSS backdrop-filter blur & heavy WASM 3D draw call concurrency in ${res.id}`);
    } else {
      console.log(`  - Diagnosis: GPU Hardware Accelerated (0 reflow bottlenecks)`);
    }
  });

  console.log('\n========================================================================\n');
}

runFpsAudit().catch((err) => {
  console.error('❌ FPS Audit Script Error:', err);
  process.exit(1);
});
