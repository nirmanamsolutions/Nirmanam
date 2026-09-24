"use client";
import React from "react";

const loaderStyles = `
.loader-wrapper {
  color: #fff;
  -webkit-user-select: none;
  user-select: none;
  background-color: transparent;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: clamp(260px, 45vw, 340px);
  height: clamp(260px, 45vw, 340px);
  font-family: var(--font-display, 'Outfit', sans-serif);
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  padding: 1.5rem;
  box-sizing: border-box;
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.loader {
  aspect-ratio: 1;
  z-index: 0;
  background-color: transparent;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: inset 0 10px 24px rgba(255, 255, 255, 0.9), inset 0 24px 38px #a855f7, inset 0 60px 70px #6366f1;
  animation: 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite loader-rotate;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.loader-pulse-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: inset 0 10px 24px #ffffff, inset 0 24px 20px #e879f9, inset 0 50px 70px #3b82f6;
  opacity: 0;
  animation: 2.4s ease-in-out infinite loader-pulse;
  will-change: opacity;
  transform: translate3d(0, 0, 0);
}
@keyframes loader-rotate {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
@keyframes loader-pulse {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
.loader-text-block {
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.loader-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
}
.loader-line-main {
  font-size: clamp(1.4rem, 4vw, 1.85rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.loader-line-sub {
  font-size: clamp(0.95rem, 2.5vw, 1.25rem);
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-cyan, #c084fc);
}
.loader-letter {
  opacity: 0.45;
  z-index: 1;
  animation: 1.8s ease-in-out infinite loader-letter-anim;
  display: inline-block;
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
}
@keyframes loader-letter-anim {
  0%, 100% { opacity: 0.45; transform: translate3d(0, 0, 0) scale3d(1, 1, 1); }
  25% { opacity: 1; transform: translate3d(0, -4px, 0) scale3d(1.15, 1.15, 1); color: #c084fc; }
  50% { opacity: 0.75; transform: translate3d(0, 0, 0) scale3d(1, 1, 1); }
}
`;

interface ComponentProps {
  text?: string;
  progress?: number | null;
}

export const Component: React.FC<ComponentProps> = ({ text = "Nirmanam Solutions", progress: _progress = null }) => {
  const parts = text.split(" ");
  const mainWord = parts[0] || "Nirmanam";
  const subWord = parts.slice(1).join(" ") || "Solutions";

  return (
    <>
      <style>{loaderStyles}</style>
      <div className="loader-wrapper">
        <div className="loader-text-block">
          {/* Line 1: NIRMANAM */}
          <div className="loader-line loader-line-main">
            {mainWord.split("").map((char, index) => (
              <span
                key={index}
                className="loader-letter"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Line 2: SOLUTIONS */}
          {subWord && (
            <div className="loader-line loader-line-sub">
              {subWord.split("").map((char, index) => (
                <span
                  key={index}
                  className="loader-letter"
                  style={{ animationDelay: `${(mainWord.length + index) * 0.08}s` }}
                >
                  {char}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="loader">
          <div className="loader-pulse-ring" />
        </div>
      </div>
    </>
  );
};

export default Component;
