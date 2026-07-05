import React from 'react';

const Testimonials = () => {
  const reviews = [
    {
      stars: "★★★★★",
      quote: "Nirmanam Solutions completely optimized our API gateway. Transaction processing latency dropped by over 45% in weeks. They are highly skilled engineers.",
      name: "Ramanathan Iyer",
      title: "CTO, IndusFin Systems",
      flagship: true
    },
    {
      stars: "★★★★★",
      quote: "The frontend rewrite was flawless. Our web vitals are all green, and conversion rates rose directly as a result of the styling revamp. Outstanding communication.",
      name: "Nisha Sen",
      title: "Director of Product, Nexa Retail"
    },
    {
      stars: "★★★★★",
      quote: "Collaborative, agile, and technically rigorous. They operate like a premium in-house engineering team rather than an external agency.",
      name: "Abhinav Rao",
      title: "Founder, Peak SaaS"
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header" style={{ margin: '0 auto 4rem', textAlign: 'center' }}>
          <div className="section-tag">Validation</div>
          <h2>Trusted by <span className="gradient-text">engineering leaders</span></h2>
        </div>

        <div className="testi-grid">
          {reviews.map((rev, idx) => (
            <div className={`testi-card ${rev.flagship ? 'flagship' : ''}`} key={idx}>
              {rev.flagship ? (
                <>
                  <div>
                    <div className="stars">{rev.stars}</div>
                    <p className="testi-quote" style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>"{rev.quote}"</p>
                  </div>
                  <div className="author-info flex-column-mobile" style={{ justifyContent: 'flex-start' }}>
                    <div className="author-avatar" style={{ width: '56px', height: '56px', fontSize: '1.25rem' }}>
                      {rev.name[0]}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{rev.name}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{rev.title}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="stars">{rev.stars}</div>
                  <p className="testi-quote">"{rev.quote}"</p>
                  <div className="author-info">
                    <div className="author-avatar">
                      {rev.name[0]}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{rev.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rev.title}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
