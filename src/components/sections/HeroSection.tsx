
import React, { useEffect, useRef } from 'react';
import Button from '../ui/Button';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      id="hero"
      ref={sectionRef} 
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 transition-gpu duration-1000 opacity-0 translate-y-10 relative"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(26, 31, 46, 0.7) 0%, rgba(10, 15, 29, 1) 100%)'
      }}
    >
      {/* Floating Stats Card */}
      <div className="absolute top-[20%] right-[10%] animate-combined-float z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-signaledge-lime opacity-20 blur-md rounded-full"></div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl shadow-glow-lime flex flex-col items-center w-[200px]">
            <div className="w-full flex justify-between items-center mb-2">
              <div className="font-bold text-signaledge-lime text-sm">NASDAQ</div>
              <div className="text-green-400 text-xs font-medium">+2.4%</div>
            </div>
            <div className="w-full h-[2px] bg-gray-700 mb-3"></div>
            <div className="w-full flex justify-between items-center mb-2">
              <div className="font-bold text-signaledge-lime text-sm">EUR/USD</div>
              <div className="text-red-400 text-xs font-medium">-0.3%</div>
            </div>
            <div className="w-full h-[2px] bg-gray-700 mb-3"></div>
            <div className="w-full flex justify-between items-center">
              <div className="font-bold text-signaledge-lime text-sm">BTC/USD</div>
              <div className="text-green-400 text-xs font-medium">+4.7%</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="animate-subtle-float">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Precision-Engineered Trading Signals for <span className="text-gradient">Unmatched High-Frequency Success</span>
            </h1>
          </div>
          <div 
            className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-signaledge-lime opacity-5 blur-[100px] rounded-full"
            aria-hidden="true"
          ></div>
        </div>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-signaledge-gray-light mb-10 animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
          Unlock the Power of Advanced Proprietary Algorithms to Secure a Competitive Edge in Multi-Asset Trading: Stocks, Forex, and Commodities.
        </p>
        
        <div className="space-x-4 animate-fade-up" style={{ animationDelay: "400ms", animationFillMode: "both" }}>
          <Button variant="primary" size="lg">
            Start Trading Now
          </Button>
          <Button variant="secondary" size="lg">
            Free Trial
          </Button>
        </div>
      </div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-10 rounded-full border-2 border-signaledge-gray-light flex justify-center pt-2">
          <div className="w-1 h-2 bg-signaledge-lime rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
