import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NameInputModal from "@/components/name-input-modal";
import MaveliCharacter from "@/components/maveli-character";
import PookalaDisplay from "@/components/pookalam-display";
import ParticleSystem from "@/components/particle-system";
import Fireworks from "@/components/fireworks";
import FallingPetals from "@/components/falling-petals";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NameValidation {
  name: string;
  isReal: boolean;
  comment: string;
  cached?: boolean;
}

export default function Home() {
  const [userName, setUserName] = useState<string>("");
  const [nameValidation, setNameValidation] = useState<NameValidation | null>(null);
  const [showNameModal, setShowNameModal] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if name is already stored
    const storedName = localStorage.getItem('onamUserName');
    const storedValidation = localStorage.getItem('onamNameValidation');
    
    if (storedName && storedValidation) {
      setUserName(storedName);
      setNameValidation(JSON.parse(storedValidation));
      setShowNameModal(false);
    }
  }, []);

  const handleNameSubmit = async (name: string) => {
    try {
      const sessionId = localStorage.getItem('onamSessionId') || generateSessionId();
      localStorage.setItem('onamSessionId', sessionId);

      const response = await fetch('/api/validate-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to validate name');
      }

      const validation: NameValidation = await response.json();
      
      setUserName(validation.name);
      setNameValidation(validation);
      setShowNameModal(false);
      
      // Store in localStorage
      localStorage.setItem('onamUserName', validation.name);
      localStorage.setItem('onamNameValidation', JSON.stringify(validation));
      
      // Trigger petals animation immediately
      setShowPetals(true);
      
      // Show validation comment as toast
      toast({
        title: "🌸 Welcome Message",
        description: validation.comment,
        duration: 6000,
      });

    } catch (error) {
      console.error('Error validating name:', error);
      toast({
        title: "Error",
        description: "Failed to validate name. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateSessionId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const scrollToStory = () => {
    document.getElementById('storySection')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const triggerFireworks = () => {
    setShowFireworks(true);
    toast({
      title: "🎆 Fireworks Display!",
      description: "Spectacular celebration for the festival!",
      duration: 3000,
    });
    
    setTimeout(() => {
      setShowFireworks(false);
    }, 5000);
  };

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
    toast({
      title: musicPlaying ? "🔇 Music Paused" : "🎵 Music Playing",
      description: musicPlaying ? "Festive music paused" : "Enjoy the festive atmosphere!",
      duration: 2000,
    });
  };

  const getPersonalizedGreeting = () => {
    if (!nameValidation) {
      return "Welcome to the Festival of Kings! 🌸";
    }

    if (nameValidation.isReal) {
      return `🌸 Happy Onam, ${userName}! King Mahabali is delighted to meet you! 🌸`;
    } else {
      return `🌸 Happy Onam, "${userName}"! King Mahabali appreciates your... creative name choice! 😄 🌸`;
    }
  };

  const getPersonalizedFooter = () => {
    if (!nameValidation) {
      return "May this Onam bring joy, prosperity, and happiness to your life! 🌸";
    }

    if (nameValidation.isReal) {
      return `${userName}, may this Onam bring you the same joy and prosperity that King Mahabali brought to Kerala! 🌸`;
    } else {
      return `"${userName}", even with such an interesting name, you're warmly welcomed to our celebration! The king has a sense of humor too! 😉🌸`;
    }
  };

  return (
    <div className="min-h-screen relative" data-testid="home-page">
      {/* Background Effects - Removed particle system */}
      
      {/* Beautiful Animated Flowers - Mobile Optimized */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        {/* Left side flowers - Hidden on small mobile, smaller on mobile */}
        <motion.div 
          className="absolute top-20 left-2 sm:left-4 lg:left-8 text-3xl sm:text-4xl lg:text-6xl opacity-20 sm:opacity-30"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        >🌺</motion.div>
        <motion.div 
          className="absolute top-40 left-4 sm:left-8 lg:left-16 text-2xl sm:text-3xl lg:text-4xl opacity-25 sm:opacity-40 hidden xs:block"
          animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >🌸</motion.div>
        <motion.div 
          className="absolute top-64 left-1 sm:left-3 lg:left-6 text-3xl sm:text-4xl lg:text-5xl opacity-20 sm:opacity-35 hidden sm:block"
          animate={{ y: [0, -12, 0], rotate: [0, 7, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        >🌻</motion.div>
        <motion.div 
          className="absolute bottom-40 left-3 sm:left-6 lg:left-12 text-2xl sm:text-3xl lg:text-4xl opacity-15 sm:opacity-30 hidden md:block"
          animate={{ y: [0, -9, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 3 }}
        >🌼</motion.div>
        <motion.div 
          className="absolute bottom-64 left-4 sm:left-10 lg:left-20 text-3xl sm:text-4xl lg:text-6xl opacity-15 sm:opacity-25 hidden lg:block"
          animate={{ y: [0, -11, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, delay: 4 }}
        >🌷</motion.div>
        
        {/* Right side flowers - Hidden on small mobile, smaller on mobile */}
        <motion.div 
          className="absolute top-32 right-2 sm:right-4 lg:right-10 text-3xl sm:text-4xl lg:text-5xl opacity-20 sm:opacity-35"
          animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, delay: 0.5 }}
        >🏵️</motion.div>
        <motion.div 
          className="absolute top-56 right-1 sm:right-3 lg:right-6 text-2xl sm:text-3xl lg:text-4xl opacity-25 sm:opacity-40 hidden xs:block"
          animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, delay: 1.5 }}
        >🌹</motion.div>
        <motion.div 
          className="absolute top-80 right-4 sm:right-8 lg:right-16 text-3xl sm:text-4xl lg:text-6xl opacity-15 sm:opacity-30 hidden sm:block"
          animate={{ y: [0, -13, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, delay: 2.5 }}
        >💐</motion.div>
        <motion.div 
          className="absolute bottom-48 right-2 sm:right-4 lg:right-8 text-3xl sm:text-4xl lg:text-5xl opacity-20 sm:opacity-35 hidden md:block"
          animate={{ y: [0, -9, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, delay: 3.5 }}
        >🌺</motion.div>
        <motion.div 
          className="absolute bottom-72 right-3 sm:right-7 lg:right-14 text-2xl sm:text-3xl lg:text-4xl opacity-15 sm:opacity-25 hidden lg:block"
          animate={{ y: [0, -7, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, delay: 4.5 }}
        >🌸</motion.div>
        
        {/* Top flowers - Hidden on mobile to avoid header interference */}
        <motion.div 
          className="absolute top-12 left-1/3 text-3xl sm:text-4xl lg:text-5xl opacity-15 sm:opacity-30 hidden md:block"
          animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 4.3, repeat: Infinity, delay: 1 }}
        >🌻</motion.div>
        <motion.div 
          className="absolute top-8 right-1/3 text-2xl sm:text-3xl lg:text-4xl opacity-20 sm:opacity-35 hidden md:block"
          animate={{ y: [0, -8, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 5.3, repeat: Infinity, delay: 2 }}
        >🌼</motion.div>
        
        {/* Bottom flowers - Better mobile positioning */}
        <motion.div 
          className="absolute bottom-20 left-1/4 text-3xl sm:text-4xl lg:text-6xl opacity-15 sm:opacity-25 hidden sm:block"
          animate={{ y: [0, -12, 0], rotate: [0, 7, 0] }}
          transition={{ duration: 6.3, repeat: Infinity, delay: 3 }}
        >🌷</motion.div>
        <motion.div 
          className="absolute bottom-16 right-1/4 text-3xl sm:text-4xl lg:text-5xl opacity-15 sm:opacity-30 hidden sm:block"
          animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4.7, repeat: Infinity, delay: 4 }}
        >🏵️</motion.div>
      </div>

      {/* Name Input Modal */}
      <AnimatePresence>
        {showNameModal && (
          <NameInputModal
            onSubmit={handleNameSubmit}
            onClose={() => setShowNameModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Music Control */}
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-8 relative" data-testid="section-hero">
          {/* Animated Maveli Character - Desktop */}
          <div className="absolute top-20 right-6 sm:right-10 hidden md:block z-0">
            <MaveliCharacter size="large" />
          </div>
          
          {/* Mobile Maveli Character - smaller and better positioned */}
          <div className="absolute top-4 right-2 block md:hidden z-0 opacity-70">
            <MaveliCharacter size="small" />
          </div>

          <div className="text-center max-w-4xl mx-auto relative z-10">
            {/* Enhanced magical glow effect behind title */}
            <div className="absolute inset-0 bg-gradient-to-r from-festival-gold/30 via-festival-orange/25 to-festival-red/30 blur-3xl rounded-full animate-pulse"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="animate-float mb-6 sm:mb-8 relative z-10"
            >
              <motion.h1 
                className="hero-title font-festival bg-gradient-to-r from-festival-gold via-festival-orange to-festival-red bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(255, 215, 0, 0.5)",
                    "0 0 40px rgba(255, 165, 0, 0.8)",
                    "0 0 20px rgba(255, 215, 0, 0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(255, 215, 0, 0.3))'
                }}
              >
                Happy Onam
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 font-medium px-4 sm:px-0 leading-relaxed" 
                data-testid="text-greeting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {getPersonalizedGreeting()}
              </motion.p>
            </motion.div>

            {/* Beautiful Pookalam Display */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mb-12"
            >
              <PookalaDisplay />
            </motion.div>

            {/* Call to Action - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center px-4 sm:px-0"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  data-testid="button-story"
                  onClick={scrollToStory}
                  className="w-full sm:w-auto festival-gradient-green text-accent-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:shadow-xl transform transition-all duration-300 border border-festival-green/30 text-sm sm:text-base min-h-[48px]"
                  style={{
                    boxShadow: '0 0 20px rgba(22, 163, 74, 0.3)'
                  }}
                >
                  Discover Onam Story 📖
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  data-testid="button-celebrate"
                  onClick={triggerFireworks}
                  className="w-full sm:w-auto festival-gradient-red text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:shadow-xl transform transition-all duration-300 border border-festival-red/30 text-sm sm:text-base min-h-[48px]"
                  style={{
                    boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)'
                  }}
                >
                  Celebrate Now! 🎆
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Story Section - Mobile Optimized */}
        <section id="storySection" className="py-12 sm:py-16 lg:py-20 px-4" data-testid="section-story">
          <div className="max-w-4xl mx-auto">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-festival bg-gradient-to-r from-festival-gold via-festival-orange to-festival-red bg-clip-text text-transparent mb-4"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3))'
                  }}>
                The Legend of Onam
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch mb-12 sm:mb-16">
              {/* The Golden Age */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-full"
              >
                <Card className="glass-card border-festival-gold/20 h-full hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-festival-gold to-festival-orange bg-clip-text text-transparent mb-4">
                      The Golden Age
                    </h3>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                        Long ago, Kerala was ruled by the benevolent King Mahabali, whose reign brought unprecedented prosperity and happiness. Under his rule, there was no poverty, no crime, and no sorrow.
                      </p>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        However, the gods became concerned about his growing power. Lord Vishnu, in his Vamana avatar, visited the king and asked for three paces of land.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Onam Today */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full"
              >
                <Card className="glass-card border-festival-gold/20 h-full hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-festival-gold to-festival-orange bg-clip-text text-transparent mb-4">
                      Onam Today
                    </h3>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                        Every year, Malayalis celebrate Onam to welcome back their beloved king. It's a time of unity, joy, and cultural richness - transcending all boundaries of caste, creed, and religion.
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4 sm:space-x-6 lg:space-x-8 text-2xl sm:text-3xl lg:text-4xl mt-auto">
                      {['🌸', '🥥', '🎭', '🛶'].map((emoji, i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            delay: i * 0.5 
                          }}
                          className="hover:scale-125 cursor-pointer transition-transform duration-300"
                          whileHover={{ scale: 1.3 }}
                        >
                          {emoji}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Celebration Section - Enhanced */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden" data-testid="section-celebration">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-festival-gold/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-festival-orange/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Main celebration title */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-festival bg-gradient-to-r from-festival-red via-festival-orange to-festival-gold bg-clip-text text-transparent mb-6 sm:mb-8"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(220, 38, 38, 0.3))'
                }}
              >
                🎊 Join the Grand Celebration! 🎊
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  data-testid="button-celebrate-main"
                  onClick={triggerFireworks}
                  className="festival-gradient-red text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-semibold hover:shadow-2xl transform transition-all duration-300 border border-festival-red/30 min-h-[56px] relative overflow-hidden"
                  style={{
                    boxShadow: '0 8px 32px rgba(220, 38, 38, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <span className="relative z-10">🎆 Celebrate Onam! 🎆</span>
                </Button>
              </motion.div>
              
              {/* Decorative celebration icons */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex justify-center items-center space-x-3 sm:space-x-4 text-3xl sm:text-4xl mt-8"
              >
                {['🎊', '🎉', '✨', '🎆', '🌟'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{ 
                      y: [0, -12, 0],
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                    className="hover:scale-150 cursor-pointer transition-transform duration-300"
                    whileHover={{ 
                      scale: 1.5, 
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer - Enhanced Mobile Experience */}
        <footer className="py-12 sm:py-16 px-4 text-center relative overflow-hidden" data-testid="section-footer">
          {/* Beautiful gradient background with animation */}
          <div className="absolute inset-0 bg-gradient-to-t from-festival-gold/15 via-festival-orange/8 to-transparent animate-pulse"></div>
          
          {/* Additional decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-1/4 left-1/6 w-20 sm:w-32 h-20 sm:h-32 bg-festival-gold/5 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/6 w-24 sm:w-40 h-24 sm:h-40 bg-festival-orange/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Main personalized message with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-6 sm:mb-8"
            >
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-festival-gold/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <motion.p 
                  className="text-lg sm:text-xl lg:text-2xl font-festival bg-gradient-to-r from-festival-gold via-festival-orange to-festival-red bg-clip-text text-transparent leading-relaxed px-2 sm:px-0"
                  data-testid="text-personalized-footer"
                  animate={{ scale: [1, 1.01, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {getPersonalizedFooter()}
                </motion.p>
              </div>
            </motion.div>

            {/* Enhanced animated emojis with better mobile spacing */}
            <motion.div 
              className="flex justify-center items-center space-x-3 sm:space-x-6 lg:space-x-8 mb-6 sm:mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {['🌺', '🎭', '🛶', '🥥', '🌸'].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl"
                  animate={{ 
                    y: [0, -12, 0],
                    rotate: [0, 8, -8, 0],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ 
                    duration: 3.5, 
                    repeat: Infinity, 
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                  whileHover={{ 
                    scale: 1.4, 
                    rotate: 360,
                    transition: { duration: 0.6, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(255, 215, 0, 0.4))',
                    cursor: 'pointer'
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced sparkle effects - fewer on mobile */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-yellow-300 text-base sm:text-lg lg:text-xl"
                  style={{
                    left: `${15 + i * 12}%`,
                    top: `${25 + (i % 4) * 15}%`,
                  }}
                  animate={{ 
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.2, 0.5],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 4.5, 
                    repeat: Infinity, 
                    delay: i * 0.7,
                    ease: "easeInOut"
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>

            {/* Developer signature with enhanced mobile styling */}
            <motion.div
              className="mt-6 sm:mt-8 space-y-2 sm:space-y-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.p 
                className="text-sm sm:text-base font-medium bg-gradient-to-r from-festival-gold to-festival-orange bg-clip-text text-transparent"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Made with 💖 by <span className="font-bold">Athul</span>
              </motion.p>
              <p className="text-xs sm:text-sm text-muted-foreground/80">© 2024 Onam Festival Celebration</p>
              <motion.div
                className="flex justify-center space-x-2 mt-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {['🌟', '🌸', '🌟'].map((star, i) => (
                  <motion.span
                    key={i}
                    className="text-yellow-300 text-xs sm:text-sm"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    {star}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </footer>
      </main>

      {/* Fireworks Display */}
      <AnimatePresence>
        {showFireworks && <Fireworks />}
      </AnimatePresence>

      {/* Falling Petals */}
      <FallingPetals 
        show={showPetals} 
        onComplete={() => setShowPetals(false)} 
      />
    </div>
  );
}
