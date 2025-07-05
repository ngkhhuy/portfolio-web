"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import emailjs from '@emailjs/browser';
import '../styles/contact.css';

export default function Contact() {
  const [theme, setTheme] = useState('dark');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');


  useEffect(() => {
    setMounted(true);
    
    // Initialize EmailJS
    emailjs.init("C2twEHcB2ZGxjh1w0"); 
  }, []);

  // Đồng bộ theme từ localStorage khi component mount
  useEffect(() => {
    if (mounted) {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      setTheme(savedTheme);
      document.body.className = savedTheme === 'light' ? 'light-theme' : '';
    }
  }, [mounted]);

  // Cập nhật theme và lưu vào localStorage
  useEffect(() => {
    if (mounted) {
      document.body.className = theme === 'light' ? 'light-theme' : '';
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);

    const interactiveElements = document.querySelectorAll('a, button, .contact-card, .contact-method, .social-link');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        'service_52lipb9',    
        'template_rudpluv',  
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Nguyen Khanh Huy',
          reply_to: formData.email,
        }
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    }
  };


  if (!mounted) {
    return null;
  }

  return (
    <div className="container contact-container">
      {}
      <div 
        className={`cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />
      
      {}
      <div 
        className={`cursor-light ${isHovering ? 'hover' : ''}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {}
      <div className="site-name">Nguyen Khanh Huy</div>
      <div className="site-description">Software Engineer</div>

      {}
      <nav className="navigation">
        <Link href="/" className="nav-link">Home</Link>
        <Link href="/info" className="nav-link">Info</Link>
        <Link href="/project" className="nav-link">Projects</Link>
        <Link href="/contact" className="nav-link active">Contact</Link>
      </nav>

      {}
      <div className="contact-content">
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-subtitle">Let's discuss opportunities and collaborations</p>

        <div className="contact-grid">
          {}
          <div className="contact-card">
            <h3 className="contact-card-title">Contact Information</h3>
            <div className="contact-methods">
              <a href="mailto:ngkhhuy2004@gmail.com" className="contact-link">
                <div className="contact-method">
                  <div className="contact-icon">📧</div>
                  <div className="contact-info">
                    <div className="contact-label">Email</div>
                    <div className="contact-value">ngkhhuy2004@gmail.com</div>
                  </div>
                </div>
              </a>

              <a href="tel:+84983918909" className="contact-link">
                <div className="contact-method">
                  <div className="contact-icon">📱</div>
                  <div className="contact-info">
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">+84 983 918 909</div>
                  </div>
                </div>
              </a>

              <div className="contact-method">
                <div className="contact-icon">📍</div>
                <div className="contact-info">
                  <div className="contact-label">Location</div>
                  <div className="contact-value">Lien Chieu, Da Nang</div>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">🕒</div>
                <div className="contact-info">
                  <div className="contact-label">Response Time</div>
                  <div className="contact-value">Within 24 hours</div>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="contact-card">
            <h3 className="contact-card-title">Social Media</h3>
            <div className="social-links">
              <a href="https://github.com/ngkhhuy" className="social-link" target="_blank" rel="noopener noreferrer">
                <div className="social-icon">
                  <img src="/icons/github.png" alt="GitHub" />
                </div>
                <div className="social-name">GitHub</div>
              </a>

              <a href="https://linkedin.com/in/khanhhuy" className="social-link" target="_blank" rel="noopener noreferrer">
                <div className="social-icon">
                  <img src="/icons/linkedin.png" alt="LinkedIn" />
                </div>
                <div className="social-name">LinkedIn</div>
              </a>

              <a href="https://facebook.com/khanhhuy.dev" className="social-link" target="_blank" rel="noopener noreferrer">
                <div className="social-icon">
                  <img src="/icons/facebook.png" alt="Facebook" />
                </div>
                <div className="social-name">Facebook</div>
              </a>

              <a href="https://t.me/ngkhhuy" className="social-link" target="_blank" rel="noopener noreferrer">
                <div className="social-icon">
                  <img src="/icons/telegram.png" alt="Telegram" />
                </div>
                <div className="social-name">Telegram</div>
              </a>
            </div>
          </div>

          {}
          <div className="contact-card">
            <h3 className="contact-card-title">Send Message</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  className="form-input" 
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  className="form-input" 
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  className="form-input" 
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  className="form-textarea" 
                  placeholder="Tell me about your project or opportunity..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <button 
                type="submit" 
                className={`form-button ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {}
              {submitStatus === 'success' && (
                <div className="form-message success">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="form-message error">
                  ❌ Failed to send message. Please try again or contact me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {}
      <div className="theme-buttons">
        <div className="theme-option">
          <button 
            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => toggleTheme('light')}
          />
          <span>Light</span>
        </div>
        <div className="theme-option">
          <button 
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => toggleTheme('dark')}
          />
          <span>Dark</span>
        </div>
      </div>
    </div>
  );
}