
import React, { useEffect, useRef } from 'react';
import { List, FileText, Zap, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Card, CardContent } from "@/components/ui/card";

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  iconBgColor?: string;
  accentColor?: string;
}

const Step = ({ number, icon, title, description, delay, iconBgColor = "bg-signaledge-lime", accentColor = "text-signaledge-lime" }: StepProps) => (
  <div 
    className="step-card opacity-0 translate-y-10 transition-all duration-700"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <Card className="relative overflow-hidden h-full glass-card border-opacity-30 hover:shadow-glow-lime transition-all duration-500">
      <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-signaledge-lime bg-opacity-10 flex items-center justify-center">
        <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-signaledge-lime flex items-center justify-center text-black font-bold text-base">
          {number}
        </div>
      </div>
      
      <CardContent className="pt-8 pb-6 px-6">
        <div className="mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-signaledge-background border border-signaledge-lime border-opacity-20">
          <div className={accentColor}>
            {icon}
          </div>
        </div>
        
        <h3 className="font-semibold text-xl mb-3 text-white">{title}</h3>
        <p className="text-signaledge-gray-light text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
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
    <section className="py-20 px-6 bg-signaledge-background relative overflow-hidden">
      {/* Background elements for visual interest */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-signaledge-lime blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/5 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
      </div>
      
      <div className="section-container relative z-10" ref={sectionRef}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-400">STEP</span> <span className="text-gradient">1</span>
            <span className="mx-8 text-blue-400">STEP</span> <span className="text-gradient">2</span>
            <span className="mx-8 text-blue-400">STEP</span> <span className="text-gradient">3</span>
            <span className="mx-8 text-blue-400">STEP</span> <span className="text-gradient">4</span>
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mt-12 mb-4">
            How It <span className="text-gradient">Works</span>
          </h3>
          <p className="text-signaledge-gray-light max-w-2xl mx-auto">
            Our streamlined process gets you from signup to successful trading in four simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 max-w-7xl mx-auto">
          <Step 
            number={1}
            icon={<List size={28} />}
            title="Choose Your Plan"
            description={<>Select a subscription that fits your <span className="text-white">trading goals</span> and gain access to our <span className="text-gradient font-medium">institutional-grade intraday trading models</span></>}
            delay={100}
          />
          
          <Step 
            number={2}
            icon={<FileText size={28} />}
            title="Access Proprietary Signals & Insights"
            description={<>Receive high-frequency, <span className="text-blue-400 font-medium">data-driven trading signals</span>, <span className="text-blue-400 font-medium">market microstructure analytics</span>, and <span className="text-blue-400 font-medium">execution strategies</span> via our secure platform</>}
            delay={200}
          />
          
          <Step 
            number={3}
            icon={<Zap size={28} />}
            title="Automate & Execute Trades"
            description={<>Integrate signals into your own trading system or use our recommended <span className="text-blue-400 font-medium">execution models</span> to optimize trade performance in fast-moving markets</>}
            delay={300}
          />
          
          <Step 
            number={4}
            icon={<TrendingUp size={28} />}
            title="Monitor & Optimize Performance"
            description={<>Leverage our <span className="text-blue-400 font-medium">performance analytics</span>, <span className="text-blue-400 font-medium">risk assessment tools</span>, and <span className="text-blue-400 font-medium">optimization strategies</span> to refine your approach and enhance long-term profitability</>}
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
