import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Firework {
  id: string;
  x: number;
  y: number;
  color: string;
  delay: number;
}

export default function Fireworks() {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    const colors = ['#FFD700', '#FF6B35', '#DC143C', '#50C878', '#8A2BE2'];
    
    // Create multiple fireworks
    const newFireworks = Array.from({ length: 15 }, (_, i) => ({
      id: Math.random().toString(36).substring(2),
      x: Math.random() * 100,
      y: Math.random() * 50 + 25,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: i * 0.2,
    }));

    setFireworks(newFireworks);

    // Clean up after animation completes
    const timeout = setTimeout(() => {
      setFireworks([]);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const removeFirework = (id: string) => {
    setFireworks(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30" data-testid="fireworks-display">
      <AnimatePresence>
        {fireworks.map(firework => (
          <motion.div
            key={firework.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1, 1.5],
              opacity: [1, 1, 0] 
            }}
            transition={{ 
              duration: 2,
              delay: firework.delay,
              ease: "easeOut"
            }}
            onAnimationComplete={() => removeFirework(firework.id)}
            className="absolute w-4 h-4 rounded-full"
            style={{
              left: `${firework.x}%`,
              top: `${firework.y}%`,
              backgroundColor: firework.color,
              boxShadow: `0 0 20px ${firework.color}`,
            }}
          >
            {/* Firework sparks */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: Math.cos(i * Math.PI / 4) * 50,
                  y: Math.sin(i * Math.PI / 4) * 50,
                }}
                transition={{ 
                  duration: 1.5,
                  delay: firework.delay + 0.3,
                  ease: "easeOut"
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: firework.color,
                  boxShadow: `0 0 10px ${firework.color}`,
                }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
