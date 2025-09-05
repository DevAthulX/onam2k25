import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import MaveliCharacter from "./maveli-character";

interface NameInputModalProps {
  onSubmit: (name: string) => void;
  onClose: () => void;
}

export default function NameInputModal({ onSubmit, onClose }: NameInputModalProps) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (name.trim().length < 2) {
      return;
    }
    
    setIsLoading(true);
    await onSubmit(name.trim());
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-md p-4 sm:p-6"
      data-testid="modal-name-input"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ 
          type: "spring", 
          duration: 0.5,
          bounce: 0.3 
        }}
        className="glass-card rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md mx-auto shadow-2xl border border-festival-gold/20"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 45px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.1)'
        }}
      >
        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="text-center p-0">
            {/* Animated Maveli Character */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6"
            >
              <MaveliCharacter size="medium" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl font-festival bg-gradient-to-r from-festival-gold via-festival-orange to-festival-red bg-clip-text text-transparent mb-4 leading-tight"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3))'
              }}
            >
              Welcome to Onam 2025!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed px-2 sm:px-0"
            >
              King Mahabali wants to know your name for a personalized celebration!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <Input
                data-testid="input-name"
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                maxLength={30}
                className="w-full px-4 py-3 sm:py-4 rounded-xl bg-muted/80 border-2 border-festival-gold/20 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-festival-gold focus:border-festival-gold/50 transition-all duration-300 text-base sm:text-lg backdrop-blur-sm min-h-[48px]"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
                disabled={isLoading}
              />

              <Button
                data-testid="button-begin-celebration"
                onClick={handleSubmit}
                disabled={name.trim().length < 2 || isLoading}
                className="w-full festival-gradient text-primary-foreground py-3 sm:py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-base sm:text-lg min-h-[48px] border border-festival-gold/30"
                style={{
                  boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                  />
                ) : (
                  "Begin Celebration 🌸"
                )}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
