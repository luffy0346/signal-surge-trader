
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FeatureItem {
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    title: "Institutional-Grade Signals",
    description: "Access cutting-edge quantitative models optimized for high-frequency execution."
  },
  {
    title: "Multi-Asset Coverage",
    description: "Trade Forex, Equities, and Commodities with predictive analytics."
  },
  {
    title: "Seamless Integration",
    description: "Use API or our models to plug directly into your systems."
  },
  {
    title: "AI Strategy Optimization",
    description: "Our machine learning adapts and refines predictive accuracy."
  },
  {
    title: "Risk-Controlled Execution",
    description: "Models prioritize capital preservation and volatility management."
  },
  {
    title: "24/7 Expert Support",
    description: "Our team of professional traders is always available to assist you."
  },
];

const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );
    
    if (featuresRef.current) {
      const featureElements = featuresRef.current.querySelectorAll('.feature-card');
      featureElements.forEach(el => observer.observe(el));
    }
    
    return () => {
      if (featuresRef.current) {
        const featureElements = featuresRef.current.querySelectorAll('.feature-card');
        featureElements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);
  
  return (
    <section className="py-24 px-6">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Why Choose <span className="text-gradient">Us</span>?
        </h2>
        <p className="text-signaledge-gray-light text-center max-w-2xl mx-auto mb-16">
          Our platform combines cutting-edge technology with expert analysis to deliver reliable trading signals that give you the edge.
        </p>
        
        <div 
          ref={featuresRef} 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "feature-card opacity-0 translate-y-10 transition-all duration-700"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-signaledge-lime bg-opacity-10">
                <div className="w-6 h-6 bg-signaledge-lime rounded-full opacity-50"></div>
              </div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-signaledge-gray-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
