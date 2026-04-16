import React, { useEffect, useRef } from 'react';

const AntigravityTheme = ({ darkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const colors = darkMode 
      ? ['rgba(139, 92, 246, 0.4)', 'rgba(59, 130, 246, 0.4)', 'rgba(236, 72, 153, 0.4)', 'rgba(255, 255, 255, 0.2)'] // Vaporwave
      : ['rgba(99, 102, 241, 0.3)', 'rgba(14, 165, 233, 0.3)', 'rgba(217, 70, 239, 0.3)', 'rgba(30, 41, 59, 0.1)']; // Indigo

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5 - 0.5; // Antigravity (always floats up slowly)
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.waveOffset = Math.random() * Math.PI * 2;
      }
      
      update() {
        this.x += this.speedX + Math.sin(this.waveOffset) * 0.5;
        this.y += this.speedY;
        this.waveOffset += 0.02;
        
        // Reset if it goes off screen
        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = Math.min(window.innerWidth / 15, 100);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default AntigravityTheme;
