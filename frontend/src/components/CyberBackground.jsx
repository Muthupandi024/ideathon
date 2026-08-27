import React, { useEffect, useRef } from 'react';

const CyberBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Smooth Cursor Tracking
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle Array - Soft, Elegant, Sleek
    const count = Math.min(Math.max(Math.floor((width * height) / 5200), 160), 300);
    const particles = [];

    const palette = [
      'rgba(6, 182, 212, ',   // Cyan
      'rgba(59, 130, 246, ',  // Electric Blue
      'rgba(139, 92, 246, ',  // Violet
      'rgba(236, 72, 153, ',  // Pink Accent
    ];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.4 + 1,
        colorPrefix: palette[Math.floor(Math.random() * palette.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        baseAlpha: 0.42 + Math.random() * 0.5,
      });
    }

    const render = () => {
      // Lerp mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Dark Luxury Canvas Base
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // Soft Ambient Radial Aura (Cyan & Purple)
      const aura1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 0, width * 0.2, height * 0.3, width * 0.5);
      aura1.addColorStop(0, 'rgba(6, 182, 212, 0.05)');
      aura1.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = aura1;
      ctx.fillRect(0, 0, width, height);

      const aura2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 0, width * 0.8, height * 0.7, width * 0.5);
      aura2.addColorStop(0, 'rgba(139, 92, 246, 0.05)');
      aura2.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = aura2;
      ctx.fillRect(0, 0, width, height);

      // Receding horizon grid adds depth beneath the neural field.
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
      ctx.lineWidth = 1;
      const horizon = height * 0.5;
      for (let i = -10; i <= 10; i += 1) {
        ctx.beginPath();
        ctx.moveTo(width / 2 + i * 8, horizon);
        ctx.lineTo(width / 2 + i * width * 0.12, height + 40);
        ctx.stroke();
      }
      for (let i = 1; i < 12; i += 1) {
        const y = horizon + Math.pow(i / 12, 1.8) * (height - horizon + 40);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Cursor Radial Spotlight Glow
      const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 350);
      cursorGlow.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
      cursorGlow.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)');
      cursorGlow.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = cursorGlow;
      ctx.fillRect(0, 0, width, height);

      // Render Neural Connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 170;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.3;
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Update & Draw Soft Glowing Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce gently off borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse Interactivity: subtle repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Pulse Alpha
        p.pulse += p.pulseSpeed;
        const alpha = Math.max(0.1, p.baseAlpha + Math.sin(p.pulse) * 0.2);

        // Draw glowing nodes with a larger depth halo.
        ctx.save();
        ctx.shadowBlur = 18;
        ctx.shadowColor = p.colorPrefix + '1)';
        ctx.fillStyle = p.colorPrefix + `${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
        ctx.globalAlpha = 0.18;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default CyberBackground;
