import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FallingPetalsProps {
  show: boolean;
  onComplete?: () => void;
}

interface Petal {
  id: string;
  emoji: string;
  startX: number;
  duration: number;
  delay: number;
  size: number;
}

export default function FallingPetals({ show, onComplete }: FallingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!show) return;

    const petalEmojis = ['🌸', '🌺', '🌻', '🌼', '🌷', '🏵️', '🌹', '💐'];
    
    // Create 30 petals for a rich effect
    const newPetals = Array.from({ length: 30 }, (_, i) => ({
      id: `petal-${i}-${Date.now()}`,
      emoji: petalEmojis[Math.floor(Math.random() * petalEmojis.length)],
      startX: Math.random() * 100,
      duration: Math.random() * 2 + 3, // 3-5 seconds
      delay: Math.random() * 2, // 0-2 seconds delay
      size: Math.random() * 0.5 + 0.8, // 0.8-1.3x size
    }));

    setPetals(newPetals);

    // Clear petals after animation
    const timeout = setTimeout(() => {
      setPetals([]);
      onComplete?.();
    }, 6000);

    return () => clearTimeout(timeout);
  }, [show, onComplete]);

  const removePetal = (id: string) => {
    setPetals(prev => prev.filter(p => p.id !== id));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40" data-testid="falling-petals">
      <AnimatePresence>
        {petals.map(petal => (
          <motion.div
            key={petal.id}
            initial={{ 
              x: `${petal.startX}vw`,
              y: "-10vh",
              rotate: 0,
              opacity: 0,
              scale: petal.size
            }}
            animate={{ 
              x: `${petal.startX + (Math.random() - 0.5) * 30}vw`,
              y: "110vh",
              rotate: Math.random() * 720 - 360, // Random rotation
              opacity: [0, 1, 1, 0],
            }}
            transition={{ 
              duration: petal.duration,
              delay: petal.delay,
              ease: "easeOut",
              opacity: {
                times: [0, 0.1, 0.9, 1]
              }
            }}
            onAnimationComplete={() => removePetal(petal.id)}
            className="fixed text-4xl"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
          >
            {petal.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}