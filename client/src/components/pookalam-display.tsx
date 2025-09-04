import { motion } from "framer-motion";

interface PookalaDisplayProps {
  className?: string;
}

export default function PookalaDisplay({ className = "" }: PookalaDisplayProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={`relative ${className}`}
      data-testid="display-pookalam"
    >
      <div className="flower-of-life">
        {/* Outer rectangles layer */}
        {[...Array(9)].map((_, i) => (
          <div key={`rect-${i}`} className={`rectangle rect${i + 1}`}></div>
        ))}
        
        <div className="rect-circle1 circ1"></div>
        
        {/* Second rectangles layer */}
        {[...Array(9)].map((_, i) => (
          <div key={`rect1-${i}`} className={`rectangle1 rect1${i + 1}`}></div>
        ))}
        
        <div className="rect-circle2 circ2"></div>
        
        {/* Third rectangles layer */}
        {[...Array(9)].map((_, i) => (
          <div key={`rect2-${i}`} className={`rectangle2 rect2${i + 1}`}></div>
        ))}
        
        <div className="rect-circle3 circ3"></div>
        
        {/* Fourth rectangles layer */}
        {[...Array(9)].map((_, i) => (
          <div key={`rect3-${i}`} className={`rectangle3 rect3${i + 1}`}></div>
        ))}
        
        <div className="rect-circle4 circ4"></div>
        
        {/* Main circles */}
        <div id="circle1" className="circle">
          <div id="circle2" className="circle"></div>
          <div id="circle-inner-container">
            {/* Wave sections */}
            <div className="wave-sec">
              {[...Array(7)].map((_, i) => (
                <div key={`wave-1-${i}`} className="wave-container">
                  <div className="wave"></div>
                  <div className="wave1"></div>
                  <div className="wave2"></div>
                </div>
              ))}
            </div>
            
            <div className="wave-sec wave-sec-2">
              {[...Array(7)].map((_, i) => (
                <div key={`wave-2-${i}`} className="wave-container">
                  <div className="wave"></div>
                  <div className="wave1"></div>
                  <div className="wave2"></div>
                </div>
              ))}
            </div>
            
            <div className="wave-sec wave-sec-3">
              {[...Array(7)].map((_, i) => (
                <div key={`wave-3-${i}`} className="wave-container">
                  <div className="wave"></div>
                  <div className="wave1"></div>
                  <div className="wave2"></div>
                </div>
              ))}
            </div>
            
            <div className="wave-sec wave-sec-4">
              {[...Array(7)].map((_, i) => (
                <div key={`wave-4-${i}`} className="wave-container">
                  <div className="wave"></div>
                  <div className="wave1"></div>
                  <div className="wave2"></div>
                </div>
              ))}
            </div>
            
            {/* Boats (Vanchi) */}
            {[1, 2, 3].map((num) => (
              <div key={`vanchi-${num}`} className={`vanchi vanchi${num}`}>
                <div className="vanchi-inner">
                  <div className="vanchi-circle0"></div>
                  <div className="vanchi-circle1"></div>
                  <div className="vanchi-circle2"></div>
                  <div className="vanchi-circle-gold-1"></div>
                  <div className="vanchi-circle-gold-2"></div>
                  <div className="vanchi-circle-gold-3"></div>
                  <div className="vanchi-circle-gold-4"></div>
                  <div className="umbrella">
                    <div className="curve c1"></div>
                    <div className="curve c2"></div>
                    <div className="curve c3"></div>
                    <div className="curve c4"></div>
                    <div className="curve c5"></div>
                    <div className="cane"></div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Sun */}
            <div className="sun"></div>
            
            {/* Clouds */}
            {[1, 2, 3, 4].map((num) => (
              <div key={`cloud-${num}`} className={`clouds cloud${num}`}>
                <div className="cloud"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .flower-of-life {
          margin: 0 auto;
          width: min(500px, 85vw);
          height: min(500px, 85vw);
          max-width: 500px;
          max-height: 500px;
          position: relative;
          overflow: hidden;
          border-radius: 50%;
          border: 2px solid rgba(255, 215, 0, 0.3);
          box-shadow: 
            0 0 30px rgba(255, 215, 0, 0.2),
            inset 0 0 20px rgba(255, 215, 0, 0.1);
          box-sizing: border-box;
          background: radial-gradient(circle at center, #2a1810 0%, #1a0a1a 70%, #0a0a0a 100%);
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .flower-of-life {
            width: min(300px, 90vw);
            height: min(300px, 90vw);
            border-width: 1px;
          }
          
          /* Scale down all absolute positioned elements proportionally */
          .flower-of-life * {
            transform-origin: center;
            transform: scale(0.6) !important;
          }
          
          .rectangle {
            width: 210px;
            height: 210px;
            top: 45px;
            left: 45px;
          }
          
          .rect-circle1 {
            width: 269px;
            height: 269px;
            top: 14px;
            left: 14px;
          }
          
          .rectangle1 {
            width: 191px;
            height: 191px;
            top: 54px;
            left: 54px;
          }
          
          .rect-circle2 {
            width: 233px;
            height: 233px;
            top: 32px;
            left: 32px;
          }
          
          .rectangle2 {
            width: 165px;
            height: 165px;
            top: 67px;
            left: 67px;
          }
          
          .rect-circle3 {
            width: 197px;
            height: 197px;
            top: 50px;
            left: 50px;
          }
          
          .rectangle3 {
            width: 140px;
            height: 140px;
            top: 80px;
            left: 80px;
          }
          
          .rect-circle4 {
            width: 168px;
            height: 168px;
            top: 65px;
            left: 65px;
          }
          
          #circle1 {
            width: 150px;
            height: 150px;
            left: 69px;
            top: 69px;
          }
          
          #circle2 {
            width: 138px;
            height: 138px;
            border-width: 6px;
          }
        }
        
        @media (max-width: 480px) {
          .flower-of-life {
            width: min(250px, 95vw);
            height: min(250px, 95vw);
          }
          
          .flower-of-life * {
            transform: scale(0.5) !important;
          }
        }

        .rectangle {
          width: 350px;
          height: 350px;
          background: #dc2626;
          position: absolute;
          top: 75px;
          left: 75px;
        }

        .rect1 { transform: rotate(10deg); }
        .rect2 { transform: rotate(20deg); }
        .rect3 { transform: rotate(30deg); }
        .rect4 { transform: rotate(40deg); }
        .rect5 { transform: rotate(50deg); }
        .rect6 { transform: rotate(60deg); }
        .rect7 { transform: rotate(70deg); }
        .rect8 { transform: rotate(80deg); }
        .rect9 { transform: rotate(90deg); }

        .rect-circle1 {
          background: #ea580c;
          width: 449px;
          height: 449px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #ea580c;
          position: absolute;
          z-index: 20;
          top: 23px;
          left: 23px;
        }

        .rectangle1 {
          width: 318px;
          height: 318px;
          background: #eab308;
          position: absolute;
          top: 90px;
          left: 90px;
          z-index: 21;
        }

        .rect11 { transform: rotate(0deg); }
        .rect12 { transform: rotate(10deg); }
        .rect13 { transform: rotate(20deg); }
        .rect14 { transform: rotate(30deg); }
        .rect15 { transform: rotate(40deg); }
        .rect16 { transform: rotate(50deg); }
        .rect17 { transform: rotate(60deg); }
        .rect18 { transform: rotate(70deg); }
        .rect19 { transform: rotate(80deg); }

        .rect-circle2 {
          background: #84cc16;
          width: 388px;
          height: 388px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #84cc16;
          position: absolute;
          z-index: 22;
          top: 53px;
          left: 53px;
        }

        .rectangle2 {
          width: 275px;
          height: 275px;
          background: white;
          position: absolute;
          top: 111px;
          left: 111px;
          z-index: 23;
        }

        .rect21 { transform: rotate(0deg); }
        .rect22 { transform: rotate(10deg); }
        .rect23 { transform: rotate(20deg); }
        .rect24 { transform: rotate(30deg); }
        .rect25 { transform: rotate(40deg); }
        .rect26 { transform: rotate(50deg); }
        .rect27 { transform: rotate(60deg); }
        .rect28 { transform: rotate(70deg); }
        .rect29 { transform: rotate(80deg); }

        .rect-circle3 {
          background: #84cc16;
          width: 328px;
          height: 328px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #84cc16;
          position: absolute;
          z-index: 24;
          top: 83px;
          left: 83px;
        }

        .rectangle3 {
          width: 233px;
          height: 233px;
          background: #ea580c;
          position: absolute;
          top: 133px;
          left: 133px;
          z-index: 25;
        }

        .rect31 { transform: rotate(0deg); }
        .rect32 { transform: rotate(10deg); }
        .rect33 { transform: rotate(20deg); }
        .rect34 { transform: rotate(30deg); }
        .rect35 { transform: rotate(40deg); }
        .rect36 { transform: rotate(50deg); }
        .rect37 { transform: rotate(60deg); }
        .rect38 { transform: rotate(70deg); }
        .rect39 { transform: rotate(80deg); }

        .rect-circle4 {
          background: #dc2626;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #dc2626;
          position: absolute;
          z-index: 25;
          top: 108px;
          left: 108px;
        }

        .circle {
          background: transparent;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          overflow: hidden;
          border: 10px solid #facc15;
          position: absolute;
          z-index: 25;
        }

        #circle1 {
          width: 250px;
          height: 250px;
          left: 115px;
          top: 115px;
          background-color: #0ea5e9;
        }

        #circle2 {
          border: 10px solid #fff;
          top: 0px;
          width: 230px;
          height: 230px;
          z-index: 21;
          left: 0px;
        }

        #circle-inner-container {
          position: absolute;
          top: 130px;
        }

        .wave-sec {
          position: absolute;
          top: 22px;
          display: flex;
        }

        .wave-sec-2 {
          top: 38px;
          left: 5px;
        }

        .wave-sec-3 {
          top: 74px;
        }

        .wave-sec-4 {
          top: 57px;
        }

        .wave-container {
          position: relative;
          width: 50px;
          height: 35px;
          margin: 0 auto;
          overflow: hidden;
          display: inline-flex;
        }

        .wave,
        .wave1,
        .wave2 {
          position: absolute;
          bottom: -60%;
          width: 50px;
          height: 38px;
          background-color: rgba(15, 191, 255, 0.95);
          border-radius: 45%;
          animation: rotate 6s linear infinite;
        }

        .wave1 {
          background-color: rgba(15, 191, 255, 0.94);
          transform: translate(-20%, 0) rotate(0deg);
          animation: rotate1 6s linear -4s infinite;
        }

        .wave2 {
          background-color: rgba(15, 191, 255, 0.93);
          transform: translate(20%, 0) rotate(0deg);
          animation: rotate2 6s linear -2s infinite;
        }

        @keyframes rotate {
          50% {
            border-radius: 38%;
            transform: rotate(180deg);
          }
          100% {
            border-radius: 45%;
            transform: rotate(360deg);
          }
        }

        @keyframes rotate1 {
          50% {
            border-radius: 38%;
            transform: translate(-30%, 8%) rotate(180deg);
          }
          100% {
            border-radius: 45%;
            transform: translate(-20%, 0%) rotate(360deg);
          }
        }

        @keyframes rotate2 {
          50% {
            transform: translate(30%, 8%) rotate(180deg);
          }
          100% {
            transform: translate(20%, 0%) rotate(360deg);
          }
        }
        
        /* Reduce motion for mobile performance and accessibility */
        @media (prefers-reduced-motion: reduce) {
          .wave, .wave1, .wave2,
          .vanchi1, .vanchi2, .vanchi3,
          .cloud1, .cloud2, .cloud3, .cloud4 {
            animation: none;
          }
        }
        
        /* Performance optimization for mobile */
        @media (max-width: 640px) {
          .wave, .wave1, .wave2 {
            animation-duration: 8s; /* Slower on mobile for better performance */
          }
          
          .vanchi1, .vanchi2, .vanchi3 {
            animation-duration: 2s;
          }
        }

        @keyframes jump {
          0% {
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
          }    
          100% {
            transform: translate3d(0, 20%, 0) scale3d(1, 1, 1);
          }
        }

        .vanchi {
          position: absolute;
          top: -20px;
          left: 97px;
          height: 40px;
          width: 83px;
          background: transparent;
          border-top-left-radius: 225px 0px;
          border-top-right-radius: 225px 0px;
          border-bottom-right-radius: 375px 205px;
          border-bottom-left-radius: 0 225px;
          border: solid 6px #6b7280;
          border-top: none;
          border-left: none;
          margin: 20px;
        }

        .vanchi1 {
          animation: jump 1s linear alternate infinite;
        }

        .vanchi2 {
          top: -2px;
          left: 118px;
          animation: jump 3s linear alternate infinite;
        }

        .vanchi3 {
          top: 14px;
          left: 75px;
          animation: jump 2s linear alternate infinite;
        }

        .vanchi-inner {
          position: relative;
        }

        .vanchi-circle0 {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #6b7280;
          position: absolute;
          left: -5px;
          top: 38px;
        }

        .vanchi-circle1 {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #6b7280;
          position: absolute;
          left: 69px;
          top: -9px;
        }

        .vanchi-circle2 {
          width: 12px;
          height: 17px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #6b7280;
          position: absolute;
          left: 72px;
          top: 8px;
        }

        .vanchi-circle-gold-1 {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #facc15;
          position: absolute;
          left: 74px;
          top: -5px;
        }

        .vanchi-circle-gold-2 {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #facc15;
          position: absolute;
          left: 77px;
          top: 13px;
        }

        .vanchi-circle-gold-3 {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #facc15;
          position: absolute;
          left: 74px;
          top: 23px;
        }

        .vanchi-circle-gold-4 {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #facc15;
          position: absolute;
          left: 62px;
          top: 31px;
        }

        .umbrella {
          background: #7c3aed;
          height: 16px;
          width: 24px;
          border-radius: 50% 50% 0 0/100% 100% 0 0;
          position: absolute;
          top: 8px;
        }

        .umbrella:before,
        .umbrella:after {
          content: '';
          position: absolute;
          border-radius: 50% 50% 0 0/100% 100% 0 0;
          top: 0;
          bottom: 0;
          z-index: 2;
        }

        .umbrella:before {
          left: 17%;
          right: 17%;
          background: #a855f7;
        }

        .umbrella:after {
          left: 38%;
          right: 38%;
          background: #c084fc;
        }

        .umbrella .curve {
          position: absolute;
          bottom: 0;
          background: #fff;
          border-radius: 50% 50% 0 0/100% 100% 0 0;
          height: 5px;
          z-index: 3;
        }

        .umbrella .curve.c1,
        .umbrella .curve.c5 {
          width: 17%;
        }

        .umbrella .curve.c2,
        .umbrella .curve.c4 {
          width: 21%;
        }

        .umbrella .curve.c1 {
          left: 0;
        }

        .umbrella .curve.c2 {
          left: 17%;
        }

        .umbrella .curve.c3 {
          left: 38%;
          right: 38%;
        }

        .umbrella .curve.c4 {
          right: 17%;
        }

        .umbrella .curve.c5 {
          right: 0;
        }

        .umbrella .cane {
          z-index: 13;
          position: absolute;
          background: #991b1b;
          top: 12px;
          left: 47%;
          right: 48%;
          height: 21px;
          width: 2px;
        }

        .vanchi1 .umbrella,
        .vanchi1 .umbrella:before,
        .vanchi1 .umbrella:after {
          background: #16a34a;
        }

        .vanchi2 .umbrella,
        .vanchi2 .umbrella:before,
        .vanchi2 .umbrella:after {
          background: #dc2626;
        }

        .sun {
          left: 6px;
          top: -95px;
          width: 70px;
          height: 70px;
          background: #fbbf24;
          background-image: radial-gradient(rgba(255, 204, 2, 0) 0%, #fbbf24 100%);
          box-shadow: 0 0 50px 10px #fbbf24;
          border-radius: 50%;
          position: absolute;
        }

        .cloud {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15) inset;
          opacity: 0.7;
        }

        .cloud:before {
          top: 2px;
          left: 11px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.2) inset;
        }

        .cloud:before,
        .cloud:after {
          content: "";
        }

        .cloud:after {
          top: 9px;
          right: -14px;
          width: 34px;
          height: 11px;
          border-radius: 7.5px;
          box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.2) inset;
        }

        .cloud,
        .cloud:before,
        .cloud:after {
          position: absolute;
          background: #f3f4f6;
        }

        .clouds {
          position: absolute;
        }

        .cloud1 {
          top: -76px;    
          animation: cloud1 5s linear infinite;
        }

        .cloud2 {
          top: -96px;    
          animation: cloud2 9s linear infinite;
        }

        .cloud3 {
          top: -64px;    
          animation: cloud3 7s linear infinite;
        }

        .cloud4 {
          top: -48px;    
          animation: cloud1 4s linear infinite;
        }

        @keyframes cloud1 {
          from { left: 10px; }
          to { left: 200px; }
        }

        @keyframes cloud2 {
          from { left: 55px; }
          to { left: 200px; }
        }

        @keyframes cloud3 {
          from { left: 100px; }
          to { left: 250px; }
        }
      `}</style>
    </motion.div>
  );
}
