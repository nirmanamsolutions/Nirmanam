import React from 'react';

export function BrandLogo({ size = 40, showText = true, textColor = '#111111', text = "Nirmanam Solutions" }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: '2px solid var(--accent-cyan)',
          boxShadow: '0 0 10px var(--accent-glow), 0 4px 12px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          backgroundColor: '#111111'
        }}
      >
        <img
          src="/favicon.png"
          alt="Nirmanam Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
            display: 'block'
          }}
        />
      </div>

      {showText && (
        <span
          style={{
            fontFamily: "var(--font-quantico)",
            fontSize: size >= 38 ? 'clamp(20px, 4vw, 24px)' : '20px',
            fontWeight: 700,
            color: textColor,
            letterSpacing: '-0.3px',
            textTransform: 'none'
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
}
