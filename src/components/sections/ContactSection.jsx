import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { ChamferCard } from '../common/ChamferCard';
import { Button } from '../common/Button';
import { TypewriterBanner } from '../ui/TypewriterBanner';
import { siteContent } from '../../data/siteContent';
import { useIsMobile } from '../../utils/useIsMobile';

export function ContactSection() {
  const isMobile = useIsMobile(700);
  const { staircaseHeading, description, cards, solutionsNeeded, budgetRanges, terminalText } = siteContent.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    solution: solutionsNeeded[0],
    budget: budgetRanges[1],
    objectives: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        solution: solutionsNeeded[0],
        budget: budgetRanges[1],
        objectives: ''
      });
    }, 4000);
  };

  return (
    <section
      id="contact"
      style={{
        background: 'linear-gradient(180deg, var(--bg-base) 0%, var(--bg-surface) 100%)',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 60px) clamp(60px, 8vw, 100px) clamp(20px, 9vw, 118px)'
      }}
    >
      <SectionHeader
        staircaseLines={staircaseHeading}
        description={description}
      />

      {/* Typewriter Banner */}
      <div style={{ marginBottom: '28px' }}>
        <TypewriterBanner text={terminalText} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: '28px', alignItems: 'start' }}>
        {/* Left Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ChamferCard style={{ padding: '20px 24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: "var(--font-quantico)", marginBottom: '6px', letterSpacing: '0.1em' }}>
              DIRECT EMAIL
            </div>
            <a
              href={`mailto:${cards.email}`}
              style={{ fontSize: '15px', color: 'var(--accent-cyan)', fontWeight: 700, wordBreak: 'break-all' }}
            >
              {cards.email}
            </a>
          </ChamferCard>

          <ChamferCard style={{ padding: '20px 24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: "var(--font-quantico)", marginBottom: '6px', letterSpacing: '0.1em' }}>
              HEADQUARTERS
            </div>
            <p style={{ fontSize: '15px', color: 'var(--text-heading)', fontWeight: 700, margin: 0 }}>
              {cards.location}
            </p>
          </ChamferCard>

          <ChamferCard style={{ padding: '20px 24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: "var(--font-quantico)", marginBottom: '6px', letterSpacing: '0.1em' }}>
              SLA GUARANTEE
            </div>
            <p style={{ fontSize: '15px', color: 'var(--text-heading)', fontWeight: 700, margin: 0 }}>
              {cards.responseTime}
            </p>
          </ChamferCard>
        </div>

        {/* Right Form Column */}
        <ChamferCard style={{ padding: '28px 28px' }}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--accent-cyan)' }}
            >
              <div style={{ fontSize: '44px', marginBottom: '12px' }}>✓</div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '8px' }}>
                INQUIRY TRANSMITTED
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                Thank you for reaching out to Nirmanam. Our team will respond within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-heading)', fontFamily: "var(--font-quantico)", marginBottom: '6px' }}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      backgroundColor: 'var(--bg-base)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-heading)',
                      fontFamily: "var(--font-quantico)",
                      fontSize: '13.5px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-heading)', fontFamily: "var(--font-quantico)", marginBottom: '6px' }}>
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul@startup.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      backgroundColor: 'var(--bg-base)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-heading)',
                      fontFamily: "var(--font-quantico)",
                      fontSize: '13.5px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-heading)', fontFamily: "var(--font-quantico)", marginBottom: '6px' }}>
                    SOLUTIONS NEEDED
                  </label>
                  <select
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      backgroundColor: 'var(--bg-base)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-heading)',
                      fontFamily: "var(--font-quantico)",
                      fontSize: '13px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {solutionsNeeded.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-heading)', fontFamily: "var(--font-quantico)", marginBottom: '6px' }}>
                    ESTIMATED BUDGET
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      backgroundColor: 'var(--bg-base)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-heading)',
                      fontFamily: "var(--font-quantico)",
                      fontSize: '13px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {budgetRanges.map((b, idx) => (
                      <option key={idx} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-heading)', fontFamily: "var(--font-quantico)", marginBottom: '6px' }}>
                  PROJECT OBJECTIVES *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your product vision, timeline, and key requirements..."
                  value={formData.objectives}
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    backgroundColor: 'var(--bg-base)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-heading)',
                    fontFamily: "var(--font-quantico)",
                    fontSize: '13.5px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <Button type="submit" variant="primary" style={{ width: '100%', padding: '14px 22px', marginTop: '6px' }}>
                SUBMIT INQUIRY
              </Button>
            </form>
          )}
        </ChamferCard>
      </div>
    </section>
  );
}
