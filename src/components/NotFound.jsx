import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import AiButton from './ui/ai-button';


const NotFound = ({ onBackHome }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-primary, #09090b)',
        color: 'var(--text-primary, #f4f4f5)',
        textAlign: 'center',
        padding: '2rem',
        position: 'relative',
        zIndex: 99999
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: '540px' }}
      >
        <div
          style={{
            fontSize: '7.5rem',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-secondary, #a1a1aa)', marginBottom: '2rem', lineHeight: 1.6 }}>
          The module or page you are requesting could not be located in our digital space. Check the URL or return to the main dashboard.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <AiButton
            onClick={onBackHome || (() => (window.location.href = '/'))}
            variant="primary"
            icon={<Home size={16} />}
          >
            Return to Studio Home
          </AiButton>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
