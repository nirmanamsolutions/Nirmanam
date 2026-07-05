import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import Reveal from '../animations/Reveal';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [details, setDetails] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        alert('Email service not configured. Please contact us at contact@nirmanam.com');
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
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Reveal>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: '600px' }}>
            <div className="section-tag">Communication Portal</div>
            <h2>Let's build <span className="gradient-text">together</span></h2>
            <p>Have a project in mind? Submit your requirements below, and we'll reply within 24 hours.</p>
          </div>
        </Reveal>

        <Reveal delay={0.15} yOffset={30}>
          <div className="contact-form-wrapper" style={{ width: '100%', maxWidth: '650px' }}>
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
                  <select 
                    id="contact-service"
                    value={service} 
                    onChange={(e) => setService(e.target.value)}
                    required
                  >
                    <option value="">Select a solution</option>
                    <option value="web">Web Platform Development</option>
                    <option value="mobile">Mobile Application Engineering</option>
                    <option value="uiux">System UI/UX Audit & Design</option>
                    <option value="devops">Cloud Infrastructure & Scaling</option>
                    <option value="other">Other Development Services</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-budget">Estimated Budget</label>
                  <select 
                    id="contact-budget"
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)}
                    required
                  >
                    <option value="">Select budget range</option>
                    <option value="1">Under ₹50,000</option>
                    <option value="2">₹50,000 - ₹1,50,000</option>
                    <option value="3">₹1,50,000 - ₹3,00,000</option>
                    <option value="4">₹3,00,000+</option>
                  </select>
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
          </div>
        </Reveal>
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
