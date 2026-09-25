import { useEffect } from 'react';

/**
 * Custom hook to ensure robust video autoplay playback.
 * - Mutes video before playing
 * - Retries video.play() every 1s if paused
 * - Retries on first user click or touchstart
 * - Swallows promise rejections
 */
export function useVideoAutoplay(videoRef) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      if (!video) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Swallow autoplay rejection silently
        });
      }
    };

    // Initial attempt
    attemptPlay();

    // Retry interval every 1 second
    const intervalId = setInterval(() => {
      if (video && video.paused) {
        attemptPlay();
      }
    }, 1000);

    // Interaction listeners
    const handleUserInteraction = () => {
      attemptPlay();
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [videoRef]);
}
