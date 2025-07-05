"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import './styles/home.css';

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

 
  useEffect(() => {
    if (mounted) {
      const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
      
      if (!hasLoadedBefore) {
      
        setIsLoading(true);
        sessionStorage.setItem('hasLoadedBefore', 'true');
        
      
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
      }
    }
  }, [mounted]);


  useEffect(() => {
    if (mounted) {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      setTheme(savedTheme);
      document.body.className = savedTheme === 'light' ? 'light-theme' : '';
    }
  }, [mounted]);

 
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

 
  if (!mounted) {
    return null;
  }

  return (
    <>
      {}
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-text">
            <strong>Nguyen Khanh Huy</strong> Portfolio
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container home-container">
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

        {/* Personal Info */}
        <div className="personal-info">
          <h1 className="about-title">About</h1>
        
          
          <div className="about-description-container">
            <p className="about-description">
              I am Nguyen Khanh Huy, a 4th-year Information Technology student majoring in Information Systems. 
              I have a strong interest in building web systems, especially in backend development. 
              I am a self-motivated learner and enjoy working in teams to solve problems and grow together. 
              I am eager to gain hands-on experience and contribute to real-world projects as a Web Developer Intern.
            </p>
          </div>
          
          <h2 className="skills-title">Skills</h2>

          <div className="skills-icons">
            <div className="skills-container">
              {}
              <div className="skill-icon">
                <img src="/icons/javascript.png" alt="Javascript" />
              </div>
              <div className="skill-icon">
                <img src="/icons/nodejs.png" alt="NodeJs" />
              </div>
              <div className="skill-icon">
                <img src="/icons/typescript.png" alt="TypeScript" />
              </div>
              <div className="skill-icon">
                <img src="/icons/mongodb.png" alt="MongoDB" />
              </div>
              <div className="skill-icon">
                <img src="/icons/express.png" alt="ExpressJs" />
              </div>
              <div className="skill-icon">
                <img src="/icons/react.png" alt="React" />
              </div>
              <div className="skill-icon">
                <img src="/icons/git.png" alt="Git" />
              </div>
              <div className="skill-icon">
                <img src="/icons/postman.png" alt="Postman" />
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="skill-icon">
                <img src="/icons/javascript.png" alt="Javascript" />
              </div>
              <div className="skill-icon">
                <img src="/icons/nodejs.png" alt="NodeJs" />
              </div>
              <div className="skill-icon">
                <img src="/icons/typescript.png" alt="TypeScript" />
              </div>
              <div className="skill-icon">
                <img src="/icons/mongodb.png" alt="MongoDB" />
              </div>
              <div className="skill-icon">
                <img src="/icons/express.png" alt="ExpressJs" />
              </div>
              <div className="skill-icon">
                <img src="/icons/react.png" alt="React" />
              </div>
              <div className="skill-icon">
                <img src="/icons/git.png" alt="Git" />
              </div>
              <div className="skill-icon">
                <img src="/icons/postman.png" alt="Postman" />
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
    </>
  )
}
