
import React from 'react';
import { cn } from "@/lib/utils";

interface PlanFeature {
  text: string;
}

interface PlanCardProps {
  title: string;
  price: string;
  features: PlanFeature[];
  isFeatured?: boolean;
  className?: string;
}

const PlanCard = ({
  title,
  price,
  features,
  isFeatured = false,
  className,
}: PlanCardProps) => {
  return (
    <div 
      className={cn(
        "pricing-card animate-fade-up",
        isFeatured ? "pricing-card-featured" : "",
        className
      )}
      style={{ 
        animationDelay: isFeatured ? '200ms' : '100ms',
        animationFillMode: 'both'
      }}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-signaledge-lime font-bold text-2xl mb-4">{price}</p>
      <ul className="text-sm text-left space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-signaledge-lime mr-2">✓</span>
            <span className="text-white">{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanCard;
