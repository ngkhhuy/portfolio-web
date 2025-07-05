"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import '../styles/projects.css';

export default function Project() {
  const [theme, setTheme] = useState('dark');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  
  useEffect(() => {
    setMounted(true);
  }, []);

  
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

    const interactiveElements = document.querySelectorAll('a, button, .project-card');
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

  // Dữ liệu dự án
  const projects = [
    {
      id: 1,
      name: "Photo Gallery App Backend API",
      description: "A RESTful and real-time chat backend for a photo-sharing application built with Node.js, Express, MongoDB, and Socket.IO..",
      mainFeatures: [
        "User registration & login with JWT ",
        "Password reset functionality",
        "Photo upload to Cloudinary",
        "CRUD operations on photos",
        "Control photo visibility (public/private)",
        "Real-time chat with Socket.IO and MongoDB persistence"
      ],
      technologies: ["Node.js", "MongoDB", "Express.js", "JWT","Socket.IO", "CORS"],
      status: "Completed",
      githubLink: "https://github.com/ngkhhuy/Photo-App-Backend",
    },
    {
      id: 2,
      name: "File Transfer and Chat Website ",
      description: "A web application built with Node.js and Express that allows users to transfer files and chat with each other.",
      mainFeatures: [
        "User Authentication (Login/Register)",
        "File Upload and Download",
        "Real-time Chat using Socket.IO",
        "Chat realtime",
        "Admin Dashboard",
        "File Management System"
      ],
      technologies: ["Node.js", "Express.js", "FPT Server", "My SQL", "Socket.IO"],
      status: "Completed",
      githubLink: "https://github.com/ngkhhuy/PBL4",
      
    }
  ];

 
  if (!mounted) {
    return null;
  }

  return (
    <div className="container project-container">
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
        <Link href="/" className="nav-link">Home</Link>
        <Link href="/info" className="nav-link">Info</Link>
        <Link href="/project" className="nav-link active">Projects</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
      </nav>

      {/* Projects Content */}
      <div className="projects-content">
        <h1 className="projects-title">My Projects</h1>
        <p className="projects-subtitle">Here are some of the projects I&apos;ve done</p>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-features">
                <h4>Main Features:</h4>
                <ul>
                  {project.mainFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="project-technologies">
                <h4>Technologies Used:</h4>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-links">
                <a href={project.githubLink} className="project-link github-link">
                  <span>GitHub</span>
                </a>
                
              </div>
            </div>
          ))}
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