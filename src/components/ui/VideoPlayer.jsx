import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useVideoAutoplay } from '../../utils/useVideoAutoplay';

export function VideoPlayer({
  src,
  hasHueOverlay = true,
  hueColor = "#15BCDF",
  maxWidth = "644px",
  className = "",
  style = {}
}) {
  const videoRef = useRef(null);
  useVideoAutoplay(videoRef);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth,
        marginLeft: 'auto',
        ...style
      }}
      className={className}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth, height: 'auto' }}>
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            width: '100%',
            maxWidth,
            height: 'auto',
            display: 'block',
            objectFit: 'contain'
          }}
        />

        {hasHueOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
              maxWidth,
              height: '100%',
              backgroundColor: hueColor,
              mixBlendMode: 'hue',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
