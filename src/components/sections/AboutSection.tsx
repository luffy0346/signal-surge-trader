
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const TechCard = ({ icon, title, description, delay }: TechCardProps) => (
  <Card className="bg-signaledge-card bg-opacity-80 border-muted border-opacity-30 opacity-0 translate-y-10 transition-all duration-700 feature-card"
    style={{ transitionDelay: `${delay}ms` }}>
    <CardContent className="p-6">
      <div className="mb-4 flex items-center text-signaledge-lime">
        {icon}
      </div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-signaledge-gray-light">{description}</p>
    </CardContent>
  </Card>
);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.feature-card');
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
    <section id="about" className="py-10 px-6" ref={sectionRef}>
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-gradient">About Us</span>
        </h2>
        
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-signaledge-gray-light text-lg mb-6 text-center">
            We are a team of elite quantitative traders, algorithmic engineers, and market structure 
            specialists with decades of experience in high-frequency and intraday trading. Our expertise 
            lies in leveraging proprietary models and statistical arbitrage techniques to provide actionable 
            insights that enhance execution performance across multiple asset classes.
          </p>
          
          <div className="bg-signaledge-card bg-opacity-30 p-6 rounded-2xl border border-muted border-opacity-20 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Our <span className="text-gradient">Mission</span>
            </h3>
            <p className="text-center text-lg">
              We empower traders with cutting-edge, algorithm-driven market insights, optimizing 
              execution strategies to maximize intraday profitability with high-frequency precision.
            </p>
            <p className="text-center text-lg mt-4">
              Our mission is to bridge the gap between institutional trading and active market participants, 
              offering professional grade signals backed by robust quantitative research.
            </p>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-5 text-center">
          Our <span className="text-gradient">Technology & Edge</span>
        </h3>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <TechCard 
            icon={<Lightbulb size={24} />}
            title="AI-Enhanced Market Adaptation"
            description="Our machine learning models dynamically adjust to shifting market conditions, ensuring our signals remain resilient and adaptive in high volatility environments."
            delay={100}
          />
          
          <TechCard 
            icon={<TrendingUp size={24} />}
            title="Intraday High-Frequency Execution"
            description="Our algorithms process and react to real-time order flow, liquidity shifts, and microstructure inefficiencies, helping traders seize opportunities throughout the trading day."
            delay={200}
          />
          
          <TechCard 
            icon={<Target size={24} />}
            title="Quantitative Risk Optimization"
            description="We incorporate institutional-grade risk controls and volatility-adjusted strategies to maximize returns while mitigating exposure to adverse market conditions."
            delay={300}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
