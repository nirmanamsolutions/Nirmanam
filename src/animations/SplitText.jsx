import React, { useState, useEffect } from 'react';

const SplitText = ({ words, delay = 2000, speed = 80 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullWord = words[currentWordIndex];

    const tick = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText((prev) => fullWord.slice(0, prev.length + 1));
        
        if (currentText === fullWord) {
          timer = setTimeout(() => setIsDeleting(true), delay);
          return;
        }
      } else {
        // Deleting
        setCurrentText((prev) => prev.slice(0, -1));

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          return;
        }
      }

      const nextSpeed = isDeleting ? speed / 2 : speed;
      timer = setTimeout(tick, nextSpeed);
    };

    timer = setTimeout(tick, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, delay, speed]);

  return (
    <span className="typing-container">
      <span className="typing-text gradient-text">
        {currentText || '\u00A0'}
      </span>
      <style>{`
        .typing-container {
          position: relative;
          display: inline-block;
          min-height: 1.25em;
          width: 100%;
          vertical-align: bottom;
        }
        .typing-text {
          position: absolute;
          left: 0;
          top: 0;
          white-space: nowrap;
          border-right: 2px solid var(--accent-indigo);
          padding-right: 4px;
          animation: blink 0.75s step-end infinite;
        }
        @keyframes blink {
          from, to { border-color: transparent }
          50% { border-color: var(--accent-indigo); }
        }
      `}</style>
    </span>
  );
};

export default SplitText;
