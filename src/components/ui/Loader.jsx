import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from '../common/BrandLogo';
import './Loader.css';

export function Loader({ onFinish }) {
  // exitPhase:
  // 0 = Full Visible
  // 1 = Text Fading Out
  // 2 = 3D Loader Box Fading Out
  // 3 = Background Dissolving & Website Revealing
  // 4 = Unmounted
  const [exitPhase, setExitPhase] = useState(0);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  });

  useEffect(() => {
    // Step 1: Start fading out text
    const timer1 = setTimeout(() => {
      setExitPhase(1);
    }, 1400);

    // Step 2: Next fade out 3D Loader Box
    const timer2 = setTimeout(() => {
      setExitPhase(2);
    }, 1620);

    // Step 3: Next fade out background overlay & trigger website reveal
    const timer3 = setTimeout(() => {
      setExitPhase(3);
      if (onFinishRef.current) onFinishRef.current();
    }, 1870);

    // Step 4: Fully unmount loader overlay
    const timer4 = setTimeout(() => {
      setExitPhase(4);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []); // Run strictly ONCE on initial mount

  if (exitPhase === 4) return null;

  return (
    <AnimatePresence>
      {exitPhase < 4 && (
        <motion.div
          key="staggered-loader-overlay"
          initial={{ opacity: 1 }}
          animate={{
            opacity: exitPhase >= 3 ? 0 : 1,
            filter: exitPhase >= 3 ? 'blur(16px)' : 'blur(0px)'
          }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: '#F2F1F0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            pointerEvents: exitPhase >= 3 ? 'none' : 'all'
          }}
        >
          {/* Step 2: 3D Isometric Sliding Box Container (Fades second) */}
          <motion.div
            animate={{
              opacity: exitPhase >= 2 ? 0 : 1,
              scale: exitPhase >= 2 ? 0.85 : 1,
              filter: exitPhase >= 2 ? 'blur(10px)' : 'blur(0px)'
            }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '140px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '50px',
              position: 'relative'
            }}
          >
            <div className="uiverse-boxes">
              <div className="box">
                <div />
                <div />
                <div />
                <div />
              </div>
              <div className="box">
                <div />
                <div />
                <div />
                <div />
              </div>
              <div className="box">
                <div />
                <div />
                <div />
                <div />
              </div>
              <div className="box">
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          </motion.div>

          {/* Step 1: Website Theme Matched Brand Typography & Badge (Fades first) */}
          <motion.div
            animate={{
              opacity: exitPhase >= 1 ? 0 : 1,
              y: exitPhase >= 1 ? -16 : 0,
              filter: exitPhase >= 1 ? 'blur(6px)' : 'blur(0px)'
            }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px'
            }}
          >
            {/* Website Brand Logo */}
            <BrandLogo size={42} showText={true} textColor="#111111" text="Nirmanam Solutions" />

            {/* Subtitle Tagline */}
            <div
              style={{
                fontSize: '12px',
                fontFamily: "var(--font-quantico)",
                fontWeight: 700,
                color: '#0891b2',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginTop: '4px'
              }}
            >
              PREMIUM SOFTWARE ENGINEERING STUDIO
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
