
import React, { useEffect, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How do your signals work?",
    answer: "Our proprietary algorithms analyse market data in real time to generate high-frequency trading signals. These signals provide precise entry and exit points, helping traders capitalize on short-term market movements with maximum efficiency."
  },
  {
    question: "What makes your signals better than others?",
    answer: "Our signals are developed in-house by a team of expert quant traders and data scientists, ensuring superior accuracy and speed. Unlike many services that rely on outdated strategies, we leverage AI-powered optimization and real-time market adaptation, giving our clients a significant edge."
  },
  {
    question: "Can I automate my trades using your signals?",
    answer: "Yes! Our signals are designed to be easily integrated with popular trading platforms and automated trading systems. You can execute trades manually or use automation tools to streamline your trading process."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a free trial for new users to experience the power of our signals firsthand. Sign up today and see how our proprietary strategies can enhance your trading performance risk-free."
  },
  {
    question: "What is the accuracy rate of your signals?",
    answer: "Our proprietary algorithms have been optimized for high accuracy, with an average win rate of 58% based on back testing and live market performance. We continuously refine our models to adapt to changing market conditions."
  },
  {
    question: "What markets do you cover?",
    answer: "We provide signals for forex, stocks, and commodities, ensuring that traders have access to the most profitable opportunities across different asset classes."
  }
];

const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    >
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
        <p className="text-signaledge-gray-light text-center max-w-2xl mx-auto mb-16">
          Get answers to the most common questions about our trading signals
        </p>
        
        <div className="max-w-3xl mx-auto glass-card p-6 rounded-xl animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-muted last:border-0 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-medium py-4 flex hover:no-underline hover:text-signaledge-lime">
                  <span className="text-signaledge-lime mr-2">📌</span>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="py-4 text-signaledge-gray-light">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
