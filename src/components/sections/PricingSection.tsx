
import React, { useEffect, useRef, useState } from 'react';
import PlanCard from '../ui/PlanCard';
import Button from '../ui/Button';
import PaymentModal from '../payment/PaymentModal';

interface PlanFeature {
  text: string;
}

interface Plan {
  title: string;
  price: string;
  features: PlanFeature[];
  isFeatured?: boolean;
}

const plans: Plan[] = [
  {
    title: "Starter Plan",
    price: "$100/mo",
    features: [
      { text: "Daily forex & commodity signals" },
      { text: "Email + Telegram alerts" },
      { text: "Live chat support" },
      { text: "Weekly market recap" },
      { text: "Beginner-friendly tutorials" },
    ]
  },
  {
    title: "Pro Plan",
    price: "$200/mo",
    features: [
      { text: "Real-time signals & analysis" },
      { text: "Automated execution integration" },
      { text: "One-on-one trader consultations" },
      { text: "Advanced technical reports" },
      { text: "Priority customer support" },
    ],
    isFeatured: true
  },
  {
    title: "Institutional Plan",
    price: "$300/mo",
    features: [
      { text: "Custom HFT signals" },
      { text: "Direct API access" },
      { text: "Dedicated account manager" },
      { text: "Mentorship & capital strategy" },
      { text: "White-glove onboarding" },
    ]
  }
];

const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  const handleSubscribe = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
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
      ref={sectionRef}
      className="px-6 py-24 bg-signaledge-section-alt transition-all duration-1000 opacity-0"
      id="pricing"
    >
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Subscription <span className="text-gradient">Plans</span>
        </h2>
        <p className="text-signaledge-gray-light text-center max-w-2xl mx-auto mb-16">
          Choose the perfect plan that fits your trading needs and goals
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              isFeatured={plan.isFeatured}
              onSubscribe={() => handleSubscribe(plan)}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
          <Button 
            variant="primary" 
            size="lg" 
            className="shadow-glow-lime"
            onClick={() => handleSubscribe(plans[1])} // Default to Pro plan
          >
            Start Trading Now
          </Button>
          <p className="mt-4 text-signaledge-gray-light">
            All plans include a 7-day money-back guarantee
          </p>
        </div>
      </div>
      
      {selectedPlan && (
        <PaymentModal 
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          planTitle={selectedPlan.title}
          planPrice={selectedPlan.price}
        />
      )}
    </section>
  );
};

export default PricingSection;
