import { useEffect, useRef, type ReactNode } from "react";

interface SharedParticleBackgroundProps {
  children: ReactNode;
  isDark: boolean;
}

export function SharedParticleBackground({
  children,
  isDark,
}: SharedParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      glowing: boolean;
    }> = [];

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = container.scrollHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const particleCount = Math.min(
        160,
        Math.max(60, Math.round((width * height) / 18000)),
      );
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.3 + 0.1),
        speedX: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.6 + 0.2,
        glowing: Math.random() > 0.7,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.strokeStyle = isDark
        ? "rgba(255,255,255,0.02)"
        : "rgba(15,23,42,0.015)";
      context.lineWidth = 1;

      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      for (const particle of particles) {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

        if (particle.glowing) {
          context.fillStyle = isDark
            ? `rgba(0, 240, 255, ${particle.opacity})`
            : `rgba(30, 144, 255, ${particle.opacity})`;
          context.shadowBlur = 4;
          context.shadowColor = isDark ? "#00f0ff" : "#1e90ff";
        } else {
          context.fillStyle = isDark
            ? `rgba(255, 255, 255, ${particle.opacity})`
            : `rgba(15, 23, 42, ${particle.opacity / 2})`;
          context.shadowBlur = 0;
        }

        context.fill();
        particle.y += particle.speedY;
        particle.x += particle.speedX;

        if (particle.y < 0) {
          particle.y = height;
          particle.x = Math.random() * width;
        }
        if (particle.x < 0 || particle.x > width) {
          particle.x = Math.random() * width;
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${isDark ? "bg-slate-950" : "bg-slate-50"}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
