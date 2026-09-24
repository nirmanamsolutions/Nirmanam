// FPS Performance Diagnostics HUD Component - Nirmanam Solutions
import React, { useState, useEffect, useRef } from 'react';
import { Activity, AlertTriangle, CheckCircle, Play, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

const SECTION_COMPONENTS = {
  home: {
    name: 'Hero Section (#home)',
    components: ['Spline 3D Scene Canvas', 'ParticleCanvas Ambient Mesh', 'Framer Motion Scroll Parallax']
  },
  about: {
    name: 'About Section (#about)',
    components: ['SectionStage 3D Visualizer', 'Backdrop Blur Filter Panels', 'Expandable Bento Grid Cards']
  },
  services: {
    name: 'Services Section (#services)',
    components: ['Services Bento Grid', 'Mouse Radial Spotlight Gradient', 'Card Backdrop Blur']
  },
  portfolio: {
    name: 'Portfolio Section (#portfolio)',
    components: ['Project Cards Grid', 'Horizontal Scroll Slider', 'Image Contain/Cover Layers']
  },
  process: {
    name: 'Process Section (#process)',
    components: ['Vertical Timeline Nodes', 'Staggered Motion Reveal']
  },
  contact: {
    name: 'Contact Section (#contact)',
    components: ['3D TypingKeyboard CSS Perspective', 'Interactive Form Elements']
  }
};

const FpsDiagnostics = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fps, setFps] = useState(60);
  const [minFps, setMinFps] = useState(60);
  const [avgFps, setAvgFps] = useState(60);
  const [currentSection, setCurrentSection] = useState('home');
  const [frameDrops, setFrameDrops] = useState([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditReport, setAuditReport] = useState(null);
  const [copied, setCopied] = useState(false);

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsHistoryRef = useRef([]);
  const sectionStatsRef = useRef({});

  // 1. High-Precision rAF FPS Monitor Loop
  useEffect(() => {
    let animationFrameId;

    const tick = (now) => {
      frameCountRef.current++;
      const delta = now - lastTimeRef.current;

      if (delta >= 500) {
        const instantFps = Math.round((frameCountRef.current * 1000) / delta);
        setFps(instantFps);

        fpsHistoryRef.current.push(instantFps);
        if (fpsHistoryRef.current.length > 120) fpsHistoryRef.current.shift();

        // Update Min FPS & Avg FPS
        setMinFps((prev) => Math.min(prev, instantFps));
        const avg = Math.round(
          fpsHistoryRef.current.reduce((a, b) => a + b, 0) / fpsHistoryRef.current.length
        );
        setAvgFps(avg);

        // Record Section-specific Stats
        if (!sectionStatsRef.current[currentSection]) {
          sectionStatsRef.current[currentSection] = { samples: [], drops: 0 };
        }
        sectionStatsRef.current[currentSection].samples.push(instantFps);

        // Detect Frame Drop (< 45 FPS)
        if (instantFps < 45) {
          sectionStatsRef.current[currentSection].drops++;
          setFrameDrops((prev) => [
            {
              time: new Date().toLocaleTimeString(),
              fps: instantFps,
              section: currentSection,
              suspects: SECTION_COMPONENTS[currentSection]?.components || []
            },
            ...prev.slice(0, 14)
          ]);
        }

        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentSection]);

  // 2. Active Section Observer
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'portfolio', 'process', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 3. Automated Full-Page Scroll Audit Script
  const runAutoAudit = () => {
    setIsAuditing(true);
    setAuditReport(null);
    setMinFps(60);
    setFrameDrops([]);
    sectionStatsRef.current = {};

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const duration = 9000; // 9 seconds smooth scroll down
      const startTime = performance.now();

      const scrollStep = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, progress * totalHeight);

        if (progress < 1) {
          requestAnimationFrame(scrollStep);
        } else {
          // Scroll back up to top
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
              finishAudit();
            }, 1000);
          }, 800);
        }
      };

      requestAnimationFrame(scrollStep);
    }, 600);
  };

  const finishAudit = () => {
    setIsAuditing(false);
    const summary = {};

    Object.keys(SECTION_COMPONENTS).forEach((sec) => {
      const data = sectionStatsRef.current[sec] || { samples: [60], drops: 0 };
      const samples = data.samples.length > 0 ? data.samples : [60];
      const avgSecFps = Math.round(samples.reduce((a, b) => a + b, 0) / samples.length);
      const minSecFps = Math.min(...samples);

      summary[sec] = {
        name: SECTION_COMPONENTS[sec].name,
        avgFps: avgSecFps,
        minFps: minSecFps,
        drops: data.drops,
        components: SECTION_COMPONENTS[sec].components
      };
    });

    setAuditReport(summary);
  };

  const generateMarkdownReport = () => {
    if (!auditReport) return '';
    let report = `# Nirmanam Solutions - Performance & FPS Audit Report\n\n`;
    report += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    report += `| Section | Avg FPS | Min FPS | Drops (<45 FPS) | Bottleneck Components |\n`;
    report += `|---|---|---|---|---|\n`;

    Object.keys(auditReport).forEach((sec) => {
      const item = auditReport[sec];
      report += `| ${item.name} | ${item.avgFps} FPS | ${item.minFps} FPS | ${item.drops} | ${item.components.join(', ')} |\n`;
    });

    if (frameDrops.length > 0) {
      report += `\n### Observed Frame Drop Events:\n`;
      frameDrops.forEach((d) => {
        report += `- **[${d.time}]** ${d.fps} FPS in \`${d.section}\` -> Culprits: ${d.suspects.join(', ')}\n`;
      });
    } else {
      report += `\n### Result: High Performance (Zero Critical Frame Drops < 45 FPS)\n`;
    }

    return report;
  };

  const copyReport = () => {
    const text = generateMarkdownReport();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFpsColor = (f) => {
    if (f >= 55) return '#10b981'; // Green
    if (f >= 40) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999999, fontFamily: 'sans-serif' }}>
      {/* Floating Minimized Badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            background: 'rgba(10, 5, 22, 0.88)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${getFpsColor(fps)}`,
            borderRadius: '24px',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}
        >
          <Activity size={16} color={getFpsColor(fps)} />
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: getFpsColor(fps) }}>{fps} FPS</span>
          <span style={{ fontSize: '11px', color: '#a1a1aa' }}>({currentSection})</span>
        </button>
      )}

      {/* Expanded Diagnostic HUD Panel */}
      {isOpen && (
        <div
          style={{
            width: '360px',
            maxHeight: '85vh',
            background: 'rgba(10, 5, 22, 0.94)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '16px',
            padding: '16px',
            color: '#fff',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            overflowY: 'auto'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '14px' }}>
              <Activity size={18} color="#a855f7" />
              <span>FPS & Performance Auditor</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer' }}
            >
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Metrics Dashboard Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textOverflow: 'ellipsis' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#a1a1aa', textTransform: 'uppercase' }}>Current</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: getFpsColor(fps) }}>{fps}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#a1a1aa', textTransform: 'uppercase' }}>Min FPS</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: getFpsColor(minFps) }}>{minFps}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#a1a1aa', textTransform: 'uppercase' }}>Avg FPS</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: getFpsColor(avgFps) }}>{avgFps}</div>
            </div>
          </div>

          {/* Active Section & Component Target */}
          <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.25)', padding: '10px 12px', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', color: '#c084fc', fontWeight: '600', marginBottom: '4px' }}>
              Active Viewport Section: <span style={{ color: '#fff' }}>{SECTION_COMPONENTS[currentSection]?.name}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#a1a1aa' }}>
              Component Stack: {SECTION_COMPONENTS[currentSection]?.components.join(' • ')}
            </div>
          </div>

          {/* Action Button: Auto Audit */}
          <button
            onClick={runAutoAudit}
            disabled={isAuditing}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '10px',
              borderRadius: '10px',
              background: isAuditing ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #a855f7, #6366f1)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '12px',
              border: 'none',
              cursor: isAuditing ? 'not-allowed' : 'pointer'
            }}
          >
            <Play size={14} />
            <span>{isAuditing ? 'Auditing Entire Site (Auto Scrolling...)' : 'Run Auto-Scroll Performance Audit'}</span>
          </button>

          {/* Audit Results Table */}
          {auditReport && (
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '10px', fontSize: '11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', color: '#10b981' }}>Audit Completed</span>
                <button
                  onClick={copyReport}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#c084fc', cursor: 'pointer', fontSize: '11px' }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy Report'}</span>
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Object.keys(auditReport).map((sec) => (
                  <div key={sec} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
                    <span>{sec.toUpperCase()}</span>
                    <span>
                      Avg: <strong style={{ color: getFpsColor(auditReport[sec].avgFps) }}>{auditReport[sec].avgFps}</strong> |
                      Min: <strong style={{ color: getFpsColor(auditReport[sec].minFps) }}>{auditReport[sec].minFps}</strong> |
                      Drops: <strong style={{ color: auditReport[sec].drops > 0 ? '#ef4444' : '#10b981' }}>{auditReport[sec].drops}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Observed Frame Drop Logs */}
          <div style={{ fontSize: '11px' }}>
            <div style={{ fontWeight: 'bold', color: '#a1a1aa', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={12} color="#f59e0b" />
              <span>Frame Drops Log ({frameDrops.length})</span>
            </div>
            {frameDrops.length === 0 ? (
              <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 0' }}>
                <CheckCircle size={13} />
                <span>Zero severe frame drops detected.</span>
              </div>
            ) : (
              <div style={{ maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {frameDrops.map((drop, idx) => (
                  <div key={idx} style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '2px solid #ef4444', padding: '4px 8px', borderRadius: '4px' }}>
                    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{drop.fps} FPS</span> in <strong>#{drop.section}</strong> at {drop.time}
                    <div style={{ fontSize: '10px', color: '#a1a1aa' }}>Suspects: {drop.suspects.join(', ')}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FpsDiagnostics;
