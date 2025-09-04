import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: string;
  emoji: string;
  startX: number;
  duration: number;
}

export default function ParticleSystem() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const symbols = ['🌸', '🌺', '🌻', '🌼', '💐', '🎭', '👑'];
    
    const createParticle = (): Particle => ({
      id: Math.random().toString(36).substring(2),
      emoji: symbols[Math.floor(Math.random() * symbols.length)],
      startX: Math.random() * 100,
      duration: Math.random() * 5 + 8, // 8-13 seconds
    });

    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = [...prev, createParticle()];
        // Keep only the last 10 particles to prevent memory issues
        return newParticles.slice(-10);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const removeParticle = (id: string) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0" data-testid="particle-system">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: `${particle.startX}vw`,
              y: "100vh",
              rotate: 0,
              opacity: 0 
            }}
            animate={{ 
              x: `${particle.startX + (Math.random() - 0.5) * 20}vw`,
              y: "-10vh",
              rotate: 360,
              opacity: [0, 1, 1, 0] 
            }}
            transition={{ 
              duration: particle.duration,
              ease: "linear",
              opacity: {
                times: [0, 0.1, 0.9, 1]
              }
            }}
            onAnimationComplete={() => removeParticle(particle.id)}
            className="fixed text-2xl particle"
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
