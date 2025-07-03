"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : '';
  }, [theme]);

  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 giây

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove);

    // Add hover listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button');
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

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-text">
            Nguyen Khanh Huy Portfolio
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="home-container">
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
          <Link href="/" className="nav-link active">Home</Link>
          <Link href="/info" className="nav-link">Info</Link>
          <Link href="/project" className="nav-link">Projects</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>

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
    </>
  )
}
