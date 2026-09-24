import React, { useState, useEffect, useRef, Component } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import './SectionStage.css';

/**
 * React Error Boundary around Spline WebGL Canvas
 * Catches 403 HTTP CDN errors, corrupt scene buffer reads, and WebGL crashes gracefully.
 */
class SplineErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('Spline ErrorBoundary caught runtime issue:', error);
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Direct High-Performance Native Spline Canvas
 * Uses @splinetool/runtime Application directly for zero-latency instant rendering from HTTP memory cache
 */
const NativeSplineCanvas = ({ sceneUrl, sectionName, onLoad, onError }) => {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let appInstance = null;
    let isMounted = true;

    async function initSpline() {
      try {
        const { Application } = await import('@splinetool/runtime');
        if (!isMounted || !canvasRef.current) return;

        appInstance = new Application(canvasRef.current);
        await appInstance.load(sceneUrl);

        if (isMounted) {
          setIsLoaded(true);
          window.dispatchEvent(new CustomEvent('spline-model-ready', { detail: { id: sectionName } }));
          if (onLoad) onLoad(appInstance);
        }

        const handleResize = () => {
          if (appInstance && typeof appInstance.requestRender === 'function') {
            appInstance.requestRender();
          }
        };

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (appInstance) {
              if (entry.isIntersecting) {
                if (typeof appInstance.play === 'function') appInstance.play();
              } else {
                if (typeof appInstance.stop === 'function') appInstance.stop();
              }
            }
          },
          { threshold: 0.05 }
        );

        if (canvasRef.current) {
          observer.observe(canvasRef.current);
        }

        window.addEventListener('resize', handleResize, { passive: true });
        window.addEventListener('orientationchange', handleResize, { passive: true });
      } catch (err) {
        console.warn(`NativeSplineCanvas load issue for ${sectionName}:`, err);
        if (isMounted) {
          if (onError) onError(err);
          window.dispatchEvent(new CustomEvent('spline-model-ready', { detail: { id: sectionName } }));
        }
      }
    }

    initSpline();

    return () => {
      isMounted = false;
      try {
        if (appInstance && typeof appInstance.stop === 'function') {
          appInstance.stop();
        }
        if (appInstance && typeof appInstance.dispose === 'function') {
          appInstance.dispose();
        }
      } catch {
        // Cleanup ignore
      }
    };
  }, [sceneUrl, sectionName, onLoad, onError]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.6s ease'
      }}
    />
  );
};

/**
 * SectionStage Component
 * Reusable 3D Stage box that manages:
 * - IntersectionObserver viewport mounting
 * - Framer Motion scroll-linked parallax
 * - Interactive SVG 3D Fallback Visualizer
 */
import { useActiveSceneManager } from '../hooks/useActiveSceneManager';

const SectionStage = ({
  sceneUrl,
  sectionName = 'Section Stage',
  accentColor = 'var(--accent-indigo)',
  glowColor = 'rgba(99, 102, 241, 0.22)',
  activeStep = 0,
  highlightFacet = null,
  onSplineLoad = null,
  className = '',
  borderless = false,
  fallbackType = 'default',
}) => {
  const containerRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const { shouldRender } = useActiveSceneManager(sectionName, isInViewport);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const splineAppRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Tight Viewport Observer
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { rootMargin: '150px 0px 150px 0px', threshold: 0.01 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Framer Motion Scroll Parallax linked to container position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  const translateY = useTransform(smoothProgress, [0, 0.5, 1], [30, 0, -30]);
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [6, 0, -6]);
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [-8, 0, 8]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.94, 1.0, 0.96]);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleSplineLoad = (splineApp) => {
    splineAppRef.current = splineApp;
    window.dispatchEvent(new CustomEvent('spline-model-ready', { detail: { id: sectionName } }));
    if (onSplineLoad) {
      onSplineLoad(splineApp);
    }
  };

  const handleSplineError = (err) => {
    console.warn(`Spline scene load issue for ${sectionName}:`, err);
    window.dispatchEvent(new CustomEvent('spline-model-ready', { detail: { id: sectionName } }));
  };

  const isValidSplineUrl = !isMobile && typeof sceneUrl === 'string' && sceneUrl.trim().length > 0 && sceneUrl.includes('spline.design');
  const isIframeEmbed = isValidSplineUrl && sceneUrl.includes('my.spline.design');
  const isSplineCodeUrl = isValidSplineUrl && sceneUrl.includes('.splinecode');

  useEffect(() => {
    if (isIframeEmbed) {
      window.dispatchEvent(new CustomEvent('spline-model-ready', { detail: { id: sectionName } }));
    }
  }, [isIframeEmbed, sectionName]);


  const fallbackComponent = (
    <Fallback3dVisualizer
      type={fallbackType}
      accentColor={accentColor}
      glowColor={glowColor}
      mousePos={mousePos}
      activeStep={activeStep}
      highlightFacet={highlightFacet}
      onLoaded={() => setIsLoading(false)}
    />
  );

  return (
    <motion.div
      ref={containerRef}
      className={`section-stage-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        y: shouldReduceMotion || isValidSplineUrl ? 0 : translateY,
        rotateX: shouldReduceMotion || isValidSplineUrl ? 0 : rotateX,
        rotateY: shouldReduceMotion || isValidSplineUrl ? 0 : rotateY,
        scale: shouldReduceMotion || isValidSplineUrl ? 1 : scale,
        perspective: isValidSplineUrl ? 'none' : 1200
      }}
    >
      {/* Dynamic Ambient Radial Glow in Section Accent Color */}
      <div
        className="stage-ambient-glow"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`
        }}
      />

      <div
        className={`stage-container ${borderless || isValidSplineUrl ? 'borderless' : ''}`}
        style={{
          transform: shouldReduceMotion || isValidSplineUrl
            ? 'none'
            : `rotateX(${mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`
        }}
      >
        {/* Viewport & Concurrency-Aware Lazy Spline Canvas wrapped in Error Boundary */}
        {shouldRender && isValidSplineUrl ? (
          <div className="spline-canvas-box is-ready">
            {isIframeEmbed ? (
              <>
                <iframe
                  key={stageKey}
                  src={sceneUrl}
                  frameBorder="0"
                  width="100%"
                  height="100%"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '480px',
                    border: 'none',
                    background: 'transparent',
                    pointerEvents: 'auto'
                  }}
                  onLoad={() => {
                    setIsLoading(false);
                    window.dispatchEvent(new CustomEvent('spline-model-ready', { detail: { id: sectionName } }));
                  }}
                  title={sectionName}
                />
                {/* Protective Watermark Shield Overlay: Prevents clicking on spline.design link inside iframe */}
                <div
                  className="spline-iframe-watermark-shield"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
              </>
            ) : isSplineCodeUrl ? (
              <SplineErrorBoundary fallback={fallbackComponent} onError={handleSplineError}>
                <NativeSplineCanvas
                  key={stageKey}
                  sceneUrl={sceneUrl}
                  sectionName={sectionName}
                  onLoad={handleSplineLoad}
                  onError={handleSplineError}
                />
              </SplineErrorBoundary>
            ) : null}
          </div>
        ) : (
          /* Interactive Fallback 3D Visualizer Engine */
          fallbackComponent
        )}

        {/* Solid Watermark Masking Cover Bar across bottom */}
        {!borderless && !isValidSplineUrl && <div className="stage-watermark-cover" />}

        {/* Glass Reflection Highlight Overlay */}
        {!borderless && !isValidSplineUrl && <div className="stage-glass-reflection" />}
      </div>
    </motion.div>
  );
};

/**
 * Interactive SVG 3D Fallback Stage
 * Rendered when a Spline URL is streaming or when customizable fallback visuals are needed.
 */
const Fallback3dVisualizer = ({ type, accentColor, glowColor: _glowColor, mousePos, activeStep, highlightFacet, onLoaded }) => {
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  return (
    <div className="fallback-3d-stage">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        className="fallback-svg"
        style={{
          transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)`
        }}
      >
        <defs>
          <pattern id={`stage-grid-${type}`} width="30" height="30" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="30" y2="0" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="30" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1" fill={accentColor} opacity="0.4" />
          </pattern>

          <filter id={`stage-glow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id={`grad-primary-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id={`grad-secondary-${type}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Background Grid Mesh */}
        <rect width="100%" height="100%" fill={`url(#stage-grid-${type})`} />

        {/* Section Specific 3D Geometry Rendering */}
        {type === 'hero' && (
          <g className="hero-3d-geometry">
            {/* Outer Orbital Tech Rings */}
            <circle cx="250" cy="250" r="210" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" strokeDasharray="6 12" />
            <circle cx="250" cy="250" r="175" fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.3" className="spin-clockwise" />

            <ellipse cx="250" cy="250" rx="160" ry="70" fill="none" stroke={`url(#grad-primary-${type})`} strokeWidth="2" className="spin-clockwise-fast" />
            <ellipse cx="250" cy="250" rx="140" ry="120" fill="none" stroke={`url(#grad-secondary-${type})`} strokeWidth="1.5" className="spin-counter-fast" />

            {/* Glowing Monogram / Core Node */}
            <polygon
              points="250,150 320,200 320,300 250,350 180,300 180,200"
              fill="rgba(99, 102, 241, 0.12)"
              stroke={accentColor}
              strokeWidth="2"
              filter={`url(#stage-glow-${type})`}
              className="pulse-float"
            />
            <polygon points="250,180 290,210 290,290 250,320 210,290 210,210" fill="url(#grad-primary-hero)" opacity="0.75" />
            <text x="250" y="260" textAnchor="middle" fill="#ffffff" fontSize="28" fontWeight="800" fontFamily="Outfit">NS</text>
          </g>
        )}

        {type === 'about' && (
          <g className="about-3d-geometry">
            {/* Architectural Blueprint Lattice */}
            <circle cx="250" cy="250" r="180" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" />
            <g className="spin-clockwise">
              <rect x="175" y="175" width="150" height="150" fill="rgba(6, 182, 212, 0.08)" stroke="#06b6d4" strokeWidth="1.5" rx="12" />
              <rect x="200" y="200" width="100" height="100" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 6" />
            </g>
            <g className="spin-counter">
              <polygon points="250,130 330,290 170,290" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
            </g>
            <circle cx="250" cy="250" r="35" fill="url(#grad-primary-about)" filter={`url(#stage-glow-${type})`} />
          </g>
        )}

        {type === 'services' && (
          <g className="services-3d-geometry">
            {/* Hexagonal Modular Facet Prism */}
            <g className="spin-slow" style={{ transformOrigin: '250px 250px' }}>
              {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
                const rad = (angle * Math.PI) / 180;
                const x = 250 + Math.cos(rad) * 110;
                const y = 250 + Math.sin(rad) * 110;
                const isHighlighted = highlightFacet === idx;
                return (
                  <g key={idx}>
                    <line x1="250" y1="250" x2={x} y2={y} stroke={isHighlighted ? '#fbbf24' : accentColor} strokeWidth={isHighlighted ? '2.5' : '1'} opacity={isHighlighted ? 1 : 0.4} />
                    <circle
                      cx={x}
                      cy={y}
                      r={isHighlighted ? 18 : 12}
                      fill={isHighlighted ? '#fbbf24' : 'rgba(99, 102, 241, 0.25)'}
                      stroke={accentColor}
                      strokeWidth="2"
                      filter={isHighlighted ? `url(#stage-glow-${type})` : 'none'}
                    />
                  </g>
                );
              })}
            </g>
            <circle cx="250" cy="250" r="45" fill="url(#grad-primary-services)" filter={`url(#stage-glow-${type})`} />
          </g>
        )}

        {type === 'portfolio' && (
          <g className="portfolio-3d-geometry">
            {/* Spatial 3D Gallery Frames */}
            <g className="pulse-float">
              <rect x="150" y="160" width="180" height="120" rx="10" fill="rgba(8, 12, 22, 0.75)" stroke="#06b6d4" strokeWidth="1.5" transform="rotate(-8 250 250)" />
              <rect x="180" y="210" width="180" height="120" rx="10" fill="rgba(15, 23, 42, 0.85)" stroke="#6366f1" strokeWidth="2" transform="rotate(6 250 250)" filter={`url(#stage-glow-${type})`} />
              <line x1="195" y1="230" x2="330" y2="230" stroke="#f9fafb" strokeWidth="3" strokeLinecap="round" transform="rotate(6 250 250)" />
              <line x1="195" y1="255" x2="280" y2="255" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" transform="rotate(6 250 250)" />
            </g>
          </g>
        )}

        {type === 'process' && (
          <g className="process-3d-geometry">
            {/* 4-Step Transforming Process Sphere & Orbit */}
            <circle cx="250" cy="250" r="140" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
            <path d="M 110,250 A 140,140 0 0,1 390,250" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="200" strokeDashoffset={200 - activeStep * 65} />
            <circle cx="250" cy="250" r={30 + activeStep * 12} fill="url(#grad-primary-process)" filter={`url(#stage-glow-${type})`} />
            <text x="250" y="258" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="700">0{activeStep + 1}</text>
          </g>
        )}

        {type === 'contact' && (
          <g className="contact-3d-geometry">
            {/* Calm Pulsing Orb */}
            <circle cx="250" cy="250" r="120" fill="rgba(99, 102, 241, 0.05)" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" className="pulse-slow" />
            <circle cx="250" cy="250" r="80" fill="url(#grad-primary-contact)" opacity="0.8" filter={`url(#stage-glow-${type})`} className="pulse-float" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default SectionStage;
