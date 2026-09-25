import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ChamferCard } from '../common/ChamferCard';
import { siteContent } from '../../data/siteContent';
import { useIsMobile } from '../../utils/useIsMobile';

export function ServicesSection() {
  const isMobile = useIsMobile(700);
  const { staircaseHeading, description, items } = siteContent.services;

  return (
    <section
      id="services"
      style={{
        backgroundColor: 'var(--bg-base)',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 60px) clamp(60px, 8vw, 100px) clamp(20px, 9vw, 118px)'
      }}
    >
      <SectionHeader
        staircaseLines={staircaseHeading}
        description={description}
      />

      {/* 6 Services Grid */}
      <div
        style={{
          marginTop: 'clamp(40px, 5vw, 64px)',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {items.map((service) => (
          <ChamferCard
            key={service.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              padding: '24px 24px'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-quantico)",
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--accent-cyan)',
                    letterSpacing: '0.08em'
                  }}
                >
                  SERVICE // {service.id}
                </span>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'var(--accent-cyan)',
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                  }}
                />
              </div>

              <h3
                style={{
                  fontSize: 'clamp(18px, 2.2vw, 22px)',
                  fontWeight: 700,
                  color: 'var(--text-heading)',
                  marginBottom: '10px'
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                  color: 'var(--text-body)',
                  marginBottom: '16px'
                }}
              >
                {service.description}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
                {service.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: '13px',
                      color: 'var(--text-body)',
                      marginBottom: '6px',
                      lineHeight: 1.45
                    }}
                  >
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
              {service.tags.map((t, tIdx) => (
                <span
                  key={tIdx}
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: "var(--font-quantico)",
                    color: 'var(--text-heading)',
                    backgroundColor: 'var(--bg-raised)',
                    border: '1px solid var(--border-subtle)',
                    padding: '4px 10px',
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)'
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </ChamferCard>
        ))}
      </div>
    </section>
  );
}
