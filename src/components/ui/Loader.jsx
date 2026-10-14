import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

/**
 * Loader — Nirmanam Solutions
 * ────────────────────────────
 * Props:
 *   assetsReady  boolean  — signalled by App.jsx when videos + images are loaded
 *   onFinish     fn       — called once the exit animation completes
 *
 * Phase state machine:
 *   0  fully visible
 *   1  brand text fades up + out
 *   2  3D box animation scales + fades out
 *   3  background overlay dissolves, website fades in
 *   4  fully unmounted
 */
export function Loader({ assetsReady, onFinish }) {
  const [phase, setPhase] = useState(0);
  const onFinishRef = useRef(onFinish);
  const exitStarted = useRef(false);

  // Keep ref fresh without triggering re-renders
  useEffect(() => { onFinishRef.current = onFinish; });

  // ── Exit sequence fires once assets are ready ─────────────────────────────
  useEffect(() => {
    if (!assetsReady || exitStarted.current) return;
    exitStarted.current = true;

    // Staggered exit: text → box → overlay → unmount
    const t1 = setTimeout(() => setPhase(1), 120);
    const t2 = setTimeout(() => setPhase(2), 320);
    const t3 = setTimeout(() => {
      setPhase(3);
      onFinishRef.current?.();
    }, 560);
    const t4 = setTimeout(() => setPhase(4), 940);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [assetsReady]);

  if (phase === 4) return null;


  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase >= 3 ? 0 : 1,
            filter: phase >= 3 ? 'blur(18px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.40, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#F2F1F0',        // exact site bg-base
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            gap: 0,
            pointerEvents: phase >= 3 ? 'none' : 'all',
          }}
        >

          {/* ── 3D Isometric Box Animation ─────────────────────────────── */}
          <motion.div
            animate={{
              opacity: phase >= 2 ? 0 : 1,
              scale: phase >= 2 ? 0.84 : 1,
              filter: phase >= 2 ? 'blur(10px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '140px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '52px',
            }}
          >
            <div className="uiverse-boxes">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="box">
                  <div /><div /><div /><div />
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Brand Text ──────────────────────────────────────────── */}
          <motion.div
            animate={{
              opacity: phase >= 1 ? 0 : 1,
              y: phase >= 1 ? -20 : 0,
              filter: phase >= 1 ? 'blur(8px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              maxWidth: '480px',
              textAlign: 'center',
            }}
          >
            {/* Studio wordmark — text only, zero images */}
            <div style={{
              fontFamily: 'var(--font-quantico)',
              fontWeight: 700,
              fontSize: 'clamp(22px, 4.5vw, 28px)',
              color: '#1a1c1e',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}>
              NIRMANAM SOLUTIONS
            </div>

            {/* Tagline — single line, no wrap */}
            <div style={{
              fontFamily: 'var(--font-quantico)',
              fontWeight: 700,
              fontSize: '9.5px',
              color: '#15BCDF',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              PREMIUM SOFTWARE ENGINEERING STUDIO
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
