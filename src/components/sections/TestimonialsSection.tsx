
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Day Trader",
    content: "SignalEdge completely transformed my trading approach. The signals are remarkably accurate and have helped me achieve consistent profits even in volatile markets.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Forex Trader",
    content: "After trying numerous signal services, SignalEdge stands out with its precision and reliability. My win rate has improved significantly since subscribing.",
    rating: 5
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Crypto Investor",
    content: "The algorithmic signals provided by SignalEdge give me confidence in my trading decisions. The platform is intuitive and the support team is extremely responsive.",
    rating: 4
  },
  {
    id: 4,
    name: "Emma Thompson",
    role: "Portfolio Manager",
    content: "As a professional money manager, I need reliable signals that can withstand market volatility. SignalEdge delivers consistently, helping me exceed client expectations.",
    rating: 5
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Retail Trader",
    content: "The ROI I've achieved with SignalEdge is exceptional. Their signals have helped me build a sustainable income stream through trading.",
    rating: 5
  },
  {
    id: 6,
    name: "Olivia Garcia",
    role: "Swing Trader",
    content: "The quality of SignalEdge's analysis is outstanding. Their signals have significantly improved my entry and exit timing, maximizing profits on each trade.",
    rating: 4
  },
  {
    id: 7,
    name: "Robert Kim",
    role: "Institutional Trader",
    content: "We've integrated SignalEdge into our trading desk operations with impressive results. The accuracy and speed of their signals give us a competitive advantage.",
    rating: 5
  },
  {
    id: 8,
    name: "Sophia Martinez",
    role: "Commodity Trader",
    content: "SignalEdge has transformed my commodity trading strategy. Their insights into market microstructure have been invaluable for optimizing my positions.",
    rating: 5
  },
  {
    id: 9,
    name: "Thomas Wright",
    role: "Automated Trading Developer",
    content: "The API integration with SignalEdge is seamless. I've built automated systems around their signals with exceptional performance metrics.",
    rating: 4
  },
  {
    id: 10,
    name: "Aisha Patel",
    role: "Options Strategist",
    content: "SignalEdge provides the edge I need for precise options trading. The signals are consistently reliable and have dramatically improved my success rate.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };
  
  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );
  
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
      className="px-6 py-24 bg-signaledge-background transition-all duration-1000 opacity-0"
    >
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Trader <span className="text-gradient">Testimonials</span>
        </h2>
        <p className="text-signaledge-gray-light text-center max-w-2xl mx-auto mb-16">
          Hear from our community of successful traders who rely on our signals
        </p>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 max-w-6xl mx-auto">
          <div className="relative w-full">
            <div className="grid md:grid-cols-3 gap-6">
              {currentTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${(testimonial.id % testimonialsPerPage) * 100}ms`, animationFillMode: 'both' }}
                >
                  <Card className="glass-card h-full hover:shadow-glow-lime transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < testimonial.rating ? "fill-signaledge-lime text-signaledge-lime" : "text-signaledge-gray-dark"}
                          />
                        ))}
                      </div>
                      <p className="mb-4 text-signaledge-gray-light italic">"{testimonial.content}"</p>
                      <div className="mt-auto">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-signaledge-gray-light">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prevPage}
            className="p-2 rounded-full bg-signaledge-card hover:bg-signaledge-lime hover:text-black transition-colors duration-300"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex space-x-2 items-center">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  currentPage === i 
                    ? "bg-signaledge-lime w-4" 
                    : "bg-signaledge-gray-dark"
                )}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextPage}
            className="p-2 rounded-full bg-signaledge-card hover:bg-signaledge-lime hover:text-black transition-colors duration-300"
            aria-label="Next testimonials"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
