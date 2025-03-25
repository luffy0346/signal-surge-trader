
import React, { useEffect, useRef } from 'react';
import { List, FileText, Zap, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Step = ({ number, icon, title, description, delay }: StepProps) => (
  <div 
    className="step-card opacity-0 translate-y-10 transition-all duration-700 flex flex-col items-center"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-signaledge-lime bg-opacity-10 relative">
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-signaledge-lime flex items-center justify-center text-black font-bold text-sm">
        {number}
      </div>
      <div className="text-signaledge-lime">
        {icon}
      </div>
    </div>
    <h3 className="font-semibold text-xl mb-2 text-center">{title}</h3>
    <p className="text-signaledge-gray-light text-center">{description}</p>
  </div>
);

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.step-card');
            elements.forEach(el => {
              el.classList.add('opacity-100');
              el.classList.remove('opacity-0', 'translate-y-10');
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
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
    <section className="py-24 px-6 bg-signaledge-section-alt">
      <div className="section-container" ref={sectionRef}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          How It <span className="text-gradient">Works</span>
        </h2>
        <p className="text-signaledge-gray-light text-center max-w-2xl mx-auto mb-16">
          Our streamlined process gets you from signup to successful trading in four simple steps
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Step 
            number={1}
            icon={<List size={24} />}
            title="Choose Your Plan"
            description="Select a subscription that fits your trading goals and gain access to our institutional-grade intraday trading models"
            delay={100}
          />
          
          <Step 
            number={2}
            icon={<FileText size={24} />}
            title="Access Proprietary Signals & Insights"
            description="Receive high-frequency, data-driven trading signals, market microstructure analytics, and execution strategies via our secure platform"
            delay={200}
          />
          
          <Step 
            number={3}
            icon={<Zap size={24} />}
            title="Automate & Execute Trades"
            description="Integrate signals into your own trading system or use our recommended execution models to optimize trade performance in fast-moving markets"
            delay={300}
          />
          
          <Step 
            number={4}
            icon={<TrendingUp size={24} />}
            title="Monitor & Optimize Performance"
            description="Leverage our performance analytics, risk assessment tools, and optimization strategies to refine your approach and enhance long-term profitability"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
