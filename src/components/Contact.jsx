import React, { useState, useEffect } from 'react';
import { Send, Check, ChevronDown, Mail, MapPin, Clock } from 'lucide-react';
import Reveal from '../animations/Reveal';
import emailjs from '@emailjs/browser';

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

    // Add validations for custom dropdown selects
    if (!service || !budget) {
      alert('Please fill out all selections.');
      return;
    }

    setIsSubmitting(true);

    // Service mapping for better email display
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
      // EmailJS configuration from environment variables
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Validate environment variables
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

      // Reset form fields
      setName('');
      setEmail('');
      setService('');
      setBudget('');
      setDetails('');

      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send inquiry. Please try again or email us directly at nirmanamsolutions@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <Reveal>
          <div className="section-header" style={{ marginBottom: '4rem' }}>
            <div className="section-tag">Communication Portal</div>
            <h2>Let's build <span className="gradient-text">together</span></h2>
            <p>Have a project in mind? Reach out directly or submit your requirements below.</p>
          </div>
        </Reveal>

        <div className="contact-layout">
          {/* Left Side: Contact Info */}
          <div className="contact-info">
            <Reveal delay={0.1}>
              <div className="ci-card">
                <div className="ci-icon">
                  <Mail size={20} />
                </div>
                <div className="ci-text">
                  <h4>Email Address</h4>
                  <p><a href="mailto:nirmanamsolutions@gmail.com" style={{ color: 'var(--text-secondary)' }}>nirmanamsolutions@gmail.com</a></p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="ci-card">
                <div className="ci-icon">
                  <MapPin size={20} />
                </div>
                <div className="ci-text">
                  <h4>Our Location</h4>
                  <p>Pune, Maharashtra, India</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="ci-card">
                <div className="ci-icon">
                  <Clock size={20} />
                </div>
                <div className="ci-text">
                  <h4>Response Time</h4>
                  <p>We typically respond within 24 hours.</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Form */}
          <div className="contact-form-wrapper">
            <Reveal delay={0.15} yOffset={30}>
              <form className="contact-form glassmorphic" onSubmit={handleSubmit} style={{ padding: '3.5rem 3rem', borderRadius: '20px', width: '100%', boxSizing: 'border-box' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="john@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-service">Solutions Needed</label>
                    <CustomSelect
                      id="contact-service"
                      value={service}
                      onChange={setService}
                      options={serviceOptions}
                      placeholder="Select a solution"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-budget">Estimated Budget</label>
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
                  <label htmlFor="contact-details">Project Objectives</label>
                  <textarea
                    id="contact-details"
                    rows={3}
                    placeholder="Please describe target scope and timelines..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            </Reveal>
          </div>
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
