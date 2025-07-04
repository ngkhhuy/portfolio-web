"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import '../styles/contact.css';

export default function Contact() {
  const [theme, setTheme] = useState('dark');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Đảm bảo component đã mount (client-side)
  useEffect(() => {
    setMounted(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Message sent! I will get back to you soon.');
  };

  // Không render gì cho đến khi component đã mount
  if (!mounted) {
    return null;
  }

  return (
    <div className="container contact-container">
      {/* Custom Cursor */}
      <div 
        className={`cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />
      
      {/* Cursor Light Effect */}
      <div 
        className={`cursor-light ${isHovering ? 'hover' : ''}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Site Name */}
      <div className="site-name">Nguyen Khanh Huy</div>
      <div className="site-description">Software Engineer</div>

      {/* Navigation */}
      <nav className="navigation">
        <Link href="/" className="nav-link">Home</Link>
        <Link href="/info" className="nav-link">Info</Link>
        <Link href="/project" className="nav-link">Projects</Link>
        <Link href="/contact" className="nav-link active">Contact</Link>
      </nav>

      {/* Contact Content */}
      <div className="contact-content">
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-subtitle">Let's discuss opportunities and collaborations</p>

        <div className="contact-grid">
          {/* Contact Methods */}
          <div className="contact-card">
            <h3 className="contact-card-title">Contact Information</h3>
            <div className="contact-methods">
              <a href="mailto:khanhhuy.nguyen@example.com" className="contact-link">
                <div className="contact-method">
                  <div className="contact-icon">📧</div>
                  <div className="contact-info">
                    <div className="contact-label">Email</div>
                    <div className="contact-value">khanhhuy.nguyen@example.com</div>
                  </div>
                </div>
              </a>

              <a href="tel:+84123456789" className="contact-link">
                <div className="contact-method">
                  <div className="contact-icon">📱</div>
                  <div className="contact-info">
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">+84 123 456 789</div>
                  </div>
                </div>
              </a>

              <div className="contact-method">
                <div className="contact-icon">📍</div>
                <div className="contact-info">
                  <div className="contact-label">Location</div>
                  <div className="contact-value">Ho Chi Minh City, Vietnam</div>
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

          {/* Social Links */}
          <div className="contact-card">
            <h3 className="contact-card-title">Social Media</h3>
            <div className="social-links">
              <a href="https://github.com/khanhhuy" className="social-link" target="_blank" rel="noopener noreferrer">
                <div className="social-icon">🐙</div>
                <div className="social-name">GitHub</div>
              </a>

              <a href="https://linkedin.com/in/khanhhuy" className="social-link" target="_blank" rel="noopener noreferrer">
                <div className="social-icon">💼</div>
                <div className="social-name">LinkedIn</div>
              </a>

              <a href="https://facebook.com/khanhhuy" className="social-link" target="_blank" rel="noopener noreferrer">
                <div className="social-icon">📘</div>
                <div className="social-name">Facebook</div>
              </a>

              <a href="https://instagram.com/khanhhuy" className="social-link" target="_blank" rel="noopener noreferrer">
                <div className="social-icon">📸</div>
                <div className="social-name">Instagram</div>
              </a>

              <a href="https://twitter.com/khanhhuy" className="social-link" target="_blank" rel="noopener noreferrer">
                <div className="social-icon">🐦</div>
                <div className="social-name">Twitter</div>
              </a>

              <a href="https://t.me/khanhhuy" className="social-link" target="_blank" rel="noopener noreferrer">
                <div className="social-icon">✈️</div>
                <div className="social-name">Telegram</div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-card">
            <h3 className="contact-card-title">Send Message</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="form-input" 
                  placeholder="Your full name"
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-input" 
                  placeholder="your.email@example.com"
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="form-input" 
                  placeholder="What's this about?"
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  className="form-textarea" 
                  placeholder="Tell me about your project or opportunity..."
                  required 
                />
              </div>

              <button type="submit" className="form-button">
                Send Message
              </button>
            </form>
          </div>
        </div>

        
      </div>

      {/* Theme Toggle Buttons */}
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