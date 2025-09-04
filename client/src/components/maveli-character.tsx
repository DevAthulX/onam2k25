import { motion } from "framer-motion";

interface MaveliCharacterProps {
  size?: "small" | "medium" | "large" | "extra-large";
  className?: string;
}

export default function MaveliCharacter({ size = "medium", className = "" }: MaveliCharacterProps) {
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24", 
    large: "w-32 h-32",
    "extra-large": "w-48 h-48"
  };

  const crownSizes = {
    small: "w-12 h-5 -top-2",
    medium: "w-16 h-6 -top-3",
    large: "w-20 h-8 -top-4",
    "extra-large": "w-32 h-12 -top-6"
  };

  const emojiSizes = {
    small: "text-lg",
    medium: "text-2xl",
    large: "text-4xl",
    "extra-large": "text-6xl"
  };

  return (
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0] 
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`${sizeClasses[size]} maveli-character mx-auto relative ${className}`}
      data-testid="character-maveli"
    >
      {/* Crown */}
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          delay: 0.5 
        }}
        className={`maveli-crown ${crownSizes[size]} absolute left-1/2 transform -translate-x-1/2`}
      />
      
      {/* Character Face */}
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          delay: 1 
        }}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${emojiSizes[size]}`}
      >
        🤴
      </motion.div>

      {/* Sparkle effects around character */}
      <motion.div
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
        className="absolute -top-1 -right-1 text-yellow-300 text-xs"
      >
        ✨
      </motion.div>
      
      <motion.div
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5] 
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1 
        }}
        className="absolute -bottom-1 -left-1 text-yellow-300 text-xs"
      >
        ✨
      </motion.div>
    </motion.div>
  );
}
