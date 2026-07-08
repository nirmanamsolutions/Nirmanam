import React, { useRef, useState } from 'react';
import './HoloCard.css';

const HoloCard = () => {
  const cardRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);

  const handlePointerMove = (e) => {
    setIsRotating(false);
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    const hw = rect.width / 2;
    const hh = rect.height / 2;
    const ratioX = (x - (rect.left + hw)) / hw;
    const ratioY = (y - (rect.top + hh)) / hh;

    card.style.setProperty("--ratio-x", ratioX);
    card.style.setProperty("--ratio-y", ratioY);
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--ratio-x", "0");
    card.style.setProperty("--ratio-y", "0");
    setIsRotating(true);
  };

  return (
    <div
      ref={cardRef}
      className={`holo-card ${isRotating ? 'rotate' : ''}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Glow Orbs & Grid in background */}
      <div className="holo-glow-core" />
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />

      {/* Decorative Technical Rings and Ticks */}
      <div className="hud-ticks" />
      <div className="holo-ring ring-1" />
      <div className="holo-ring ring-2" />
      <div className="holo-ring ring-3" />
      <div className="holo-ring ring-4" />

      {/* Holographic Overlays */}
      <div className="circles" />
      <div className="holo-bg" />
      <div className="holo-lines" />

      {/* Logo & Branding */}
      <div className="holo-card-logo">
        <div className="logo-emblem">
          <div className="emblem-hexagon">
            <div className="hex-inner">
              <div className="hex-line line-l"></div>
              <div className="hex-line line-m"></div>
              <div className="hex-line line-r"></div>
            </div>
          </div>
        </div>
        <span className="brand-title">NIRMANAM</span>
        <span className="brand-subtitle">SOLUTIONS</span>
      </div>
    </div>
  );
};

export default HoloCard;
