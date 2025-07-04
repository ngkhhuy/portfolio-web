"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import '../styles/info.css';

export default function Info() {
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

    const interactiveElements = document.querySelectorAll('a, button, .info-card, .contact-link');
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

  // Không render gì cho đến khi component đã mount
  if (!mounted) {
    return null;
  }

  return (
    <div className="container info-container">
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
        <Link href="/info" className="nav-link active">Info</Link>
        <Link href="/project" className="nav-link">Projects</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
      </nav>

      {/* Info Content */}
      <div className="info-content">
        <h1 className="info-title">Personal Information</h1>
        <p className="info-subtitle">Get to know more about me</p>

        <div className="info-grid">
          {/* Basic Information */}
          <div className="info-card">
            <h3 className="info-card-title">Basic Information</h3>
            <div className="info-item">
              <span className="info-label">Full Name:</span>
              <span className="info-value">Nguyen Khanh Huy</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age:</span>
              <span className="info-value">2004 (22 years old)</span>
            </div>
            <div className="info-item">
              <span className="info-label">Location:</span>
              <span className="info-value">Lien Chieu, Da Nang</span>
            </div>
            <div className="info-item">
              <span className="info-label">Nationality:</span>
              <span className="info-value">Vietnamese</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className="info-value">Student</span>
            </div>
          </div>

          {/* Education */}
          <div className="info-card">
            <h3 className="info-card-title">Education</h3>
            <div className="info-item">
              <span className="info-label">University:</span>
              <span className="info-value">Da Nang University of Science and Technology – DUT</span>
            </div>
            <div className="info-item">
              <span className="info-label">Major:</span>
              <span className="info-value">Information Systems</span>
            </div>
            <div className="info-item">
              <span className="info-label">Year:</span>
              <span className="info-value">4th year (2022-now)</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Focus:</span>
              <span className="info-value">Web Development & Backend</span>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="info-card">
            <h3 className="info-card-title">Technical Skills</h3>
            <div className="skills-list">
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Express.js</span>
              <span className="skill-tag">React</span>
              <span className="skill-tag">Next.js</span>
              <span className="skill-tag">MongoDB</span>
              <span className="skill-tag">Github</span>
              <span className="skill-tag">Git</span>
              <span className="skill-tag">Postman</span>
              <span className="skill-tag">RESTful API</span>
              <span className="skill-tag">Socket.io</span>
            </div>
          </div>

          {/* Languages */}
          <div className="info-card">
            <h3 className="info-card-title">Languages</h3>
            <div className="languages-list">
              <div className="language-item">
                <span className="language-name">Vietnamese</span>
                <span className="language-level">Native</span>
              </div>
              <div className="language-item">
                <span className="language-name">English</span>
                <span className="language-level">TOEIC 630</span>
              </div>
              
            </div>
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