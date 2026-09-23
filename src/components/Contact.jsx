import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, Check, ChevronDown, Mail, MapPin, Clock } from 'lucide-react';
import Reveal from '../animations/Reveal';
import emailjs from '@emailjs/browser';
import AiButton from './ui/ai-button';
import { TypingKeyboard } from './ui/typing-keyboard';

// Premium Custom Select Dropdown Component
const CustomSelect = ({ id, value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(`#${id}-container`)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('click', handleOutsideClick);
    }
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isOpen, id]);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div id={`${id}-container`} className="custom-select-container" style={{ position: 'relative' }}>
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`custom-select-trigger ${isOpen ? 'active' : ''}`}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown
          size={16}
          className="select-arrow-icon"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            color: 'var(--text-muted)'
          }}
        />
      </button>

      {isOpen && (
        <ul className="custom-select-dropdown">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`custom-select-option ${value === opt.value ? 'selected' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [details, setDetails] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const sectionRef = useRef(null);

  // Parallax scroll for Contact section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const contentX = useTransform(scrollYProgress, [0.1, 0.45], [-40, 0]);
  const stageX = useTransform(scrollYProgress, [0.1, 0.45], [40, 0]);

  const serviceOptions = [
    { value: 'web', label: 'Web Platform Development' },
    { value: 'mobile', label: 'Mobile Application Engineering' },
    { value: 'uiux', label: 'System UI/UX Audit & Design' },
    { value: 'devops', label: 'Cloud Infrastructure & Scaling' },
    { value: 'other', label: 'Other Development Services' }
  ];

  const budgetOptions = [
    { value: '1', label: 'Under ₹50,000' },
    { value: '2', label: '₹50,000 - ₹1,50,000' },
    { value: '3', label: '₹1,50,000 - ₹3,00,000' },
    { value: '4', label: '₹3,00,000+' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!service || !budget) {
      alert('Please fill out all selections.');
      return;
    }

    setIsSubmitting(true);

    const serviceMap = {
      'web': 'Web Platform Development',
      'mobile': 'Mobile Application Engineering',
      'uiux': 'System UI/UX Audit & Design',
      'devops': 'Cloud Infrastructure & Scaling',
      'other': 'Other Development Services'
    };

    const budgetMap = {
      '1': 'Under ₹50,000',
      '2': '₹50,000 - ₹1,50,000',
      '3': '₹1,50,000 - ₹3,00,000',
      '4': '₹3,00,000+'
    };

    try {
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceID || !templateID || !publicKey) {
        console.error('EmailJS credentials missing. Check your .env file.');
        alert('Email service not configured. Please contact us at nirmanamsolutions@gmail.com');
        return;
      }

      const templateParams = {
        from_name: name,
        from_email: email,
        service_type: serviceMap[service] || service,
        budget_range: budgetMap[budget] || budget,
        message: details,
        to_name: 'Nirmanam Solutions',
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      setShowToast(true);

      setName('');
      setEmail('');
      setService('');
      setBudget('');
      setDetails('');

      setTimeout(() => setShowToast(false), 3500);
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send inquiry. Please try again or email us directly at nirmanamsolutions@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="container">
        <Reveal>
          <div className="section-header" style={{ marginBottom: '3.5rem' }}>
            <div className="section-tag">Communication Portal</div>
            <h2>Let's build <span className="gradient-text">together</span></h2>
            <p>Have a project in mind? Reach out directly or submit your requirements below.</p>
          </div>
        </Reveal>

        {/* 2-Column Grid: Form & Info Left, Typing Keyboard Interactive Demo Right */}
        <div className="contact-stage-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          {/* Left Column: Form & Cards */}
          <motion.div style={{ x: contentX }}>
            <div className="contact-info" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <Reveal delay={0.1}>
                <div className="ci-card" style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  background: 'rgba(13, 7, 26, 0.6)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div className="ci-icon" style={{ shrink: 0, marginTop: '2px' }}>
                    <Mail size={18} />
                  </div>
                  <div className="ci-text" style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>Email Address</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', wordBreak: 'break-all', lineHeight: 1.4 }}>
                      <a href="mailto:nirmanamsolutions@gmail.com" style={{ color: 'var(--text-secondary)' }}>nirmanamsolutions@gmail.com</a>
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="ci-card" style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  background: 'rgba(13, 7, 26, 0.6)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div className="ci-icon" style={{ shrink: 0, marginTop: '2px' }}>
                    <MapPin size={18} />
                  </div>
                  <div className="ci-text" style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>Our Location</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.4, color: 'var(--text-secondary)' }}>Pune, Maharashtra, India</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="ci-card" style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  background: 'rgba(13, 7, 26, 0.6)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div className="ci-icon" style={{ shrink: 0, marginTop: '2px' }}>
                    <Clock size={18} />
                  </div>
                  <div className="ci-text" style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>Response Time</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.4, color: 'var(--text-secondary)' }}>Within 24 hours guaranteed</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.25} yOffset={25}>
              <form className="contact-form glassmorphic" onSubmit={handleSubmit} style={{
                padding: '3rem 2.5rem',
                borderRadius: '24px',
                width: '100%',
                boxSizing: 'border-box',
                background: 'rgba(13, 7, 26, 0.75)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Project Initiation</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-service">Solutions Needed *</label>
                    <CustomSelect
                      id="contact-service"
                      value={service}
                      onChange={setService}
                      options={serviceOptions}
                      placeholder="Select a solution"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-budget">Estimated Budget *</label>
                    <CustomSelect
                      id="contact-budget"
                      value={budget}
                      onChange={setBudget}
                      options={budgetOptions}
                      placeholder="Select budget range"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-details">Project Objectives *</label>
                  <textarea
                    id="contact-details"
                    rows={4}
                    placeholder="Describe your target scope, technical goals, and target timeline..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                  />
                </div>

                <AiButton type="submit" variant="primary" className="btn-full" disabled={isSubmitting} icon={!isSubmitting && <Send size={14} />}>
                  {isSubmitting ? "Transmitting..." : "Submit Inquiry"}
                </AiButton>
              </form>
            </Reveal>
          </motion.div>

          {/* Right Column: Interactive Typing Keyboard */}
          <motion.div style={{ x: stageX }} className="flex items-center justify-center min-h-[480px]">
            <TypingKeyboard
              autoTypeText="Nirmanam Solutions. High-performance web applications & modern digital software architecture. Built with precision and speed.        "
              typingSpeed={[40, 110]}
              scale={0.72}
              accentColor="#a855f7"
              secondaryAccent="#c084fc"
            />
          </motion.div>
        </div>
      </div>

      {/* Toast Alert */}
      <div className={`toast ${showToast ? 'show' : ''}`}>
        <span className="toast-icon"><Check size={16} /></span>
        <span>Project details submitted! We'll reply within 24 hours.</span>
      </div>
    </section>
  );
};

export default Contact;
