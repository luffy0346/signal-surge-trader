
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowRight, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! I'm SignalEdge AI Assistant. How can I help you with trading signals and strategies today?',
    isBot: true,
    timestamp: new Date(),
  },
];

// Pre-defined responses for common questions
const predefinedResponses: Record<string, string> = {
  'hello': 'Hello! How can I help you with trading today?',
  'hi': 'Hi there! What would you like to know about our trading signals?',
  'pricing': 'We offer three pricing tiers: Basic ($99/month), Pro ($199/month), and Enterprise ($499/month). Each offers different levels of signal frequency and asset coverage.',
  'signals': 'Our proprietary algorithms analyze market data in real-time to generate high-frequency trading signals with precise entry and exit points for stocks, forex, and commodities.',
  'accuracy': 'Our signals have an average win rate of 58% based on back testing and live market performance. We continuously refine our models to adapt to changing market conditions.',
  'trial': 'Yes, we offer a 7-day free trial for all new users. You can experience the full power of our signals with no commitment required.',
  'cancel': 'You can cancel your subscription anytime from your account dashboard. There are no long-term contracts or cancellation fees.',
  'refund': 'We offer a 30-day money-back guarantee if you're not satisfied with our service.',
  'supported markets': 'We provide signals for forex, stocks, and commodities across global markets.',
  'contact': 'You can reach our support team at support@signaledge.com or through the Contact page on our website.',
};

// Function to generate responses based on user input
const generateResponse = (input: string): string => {
  // Convert input to lowercase for case-insensitive matching
  const lowerInput = input.toLowerCase();
  
  // Check for common greetings or questions
  for (const [keyword, response] of Object.entries(predefinedResponses)) {
    if (lowerInput.includes(keyword.toLowerCase())) {
      return response;
    }
  }
  
  // Default response if no keywords match
  return "Thanks for your question. Our trading signals are designed to give you an edge in the markets. Could you please be more specific or ask about our pricing, accuracy, or supported markets?";
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI thinking and typing
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(userMessage.text),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-50 transition-all duration-300",
          isOpen 
            ? "bg-red-500 hover:bg-red-600" 
            : "bg-signaledge-lime hover:bg-signaledge-lime-hover shadow-glow-lime"
        )}
      >
        {isOpen ? <X size={24} className="text-white" /> : <MessageCircle size={24} className="text-black" />}
      </button>
      
      {/* Chat widget */}
      <div 
        className={cn(
          "fixed bottom-24 right-6 w-[350px] max-h-[500px] bg-signaledge-card rounded-xl shadow-lg flex flex-col z-40 border border-muted transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 transform translate-y-0" : "opacity-0 pointer-events-none transform translate-y-10"
        )}
      >
        {/* Header */}
        <div className="p-4 bg-signaledge-background rounded-t-xl border-b border-muted flex items-center">
          <Bot className="text-signaledge-lime mr-2" size={20} />
          <div>
            <h3 className="font-semibold text-white">SignalEdge Assistant</h3>
            <p className="text-xs text-signaledge-gray-light">Ask me anything about trading</p>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={cn(
                "flex",
                message.isBot ? "justify-start" : "justify-end"
              )}
            >
              <div 
                className={cn(
                  "max-w-[80%] p-3 rounded-lg",
                  message.isBot 
                    ? "bg-signaledge-section-alt text-white rounded-tl-none" 
                    : "bg-signaledge-lime text-black rounded-tr-none"
                )}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 block text-right mt-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-signaledge-section-alt max-w-[80%] p-3 rounded-lg rounded-tl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-signaledge-gray-light rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-signaledge-gray-light rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-signaledge-gray-light rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="p-4 border-t border-muted">
          <div className="flex items-center bg-signaledge-section-alt rounded-lg">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-white placeholder:text-signaledge-gray-light"
            />
            <button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
              className={cn(
                "p-2 rounded-lg mx-1",
                inputValue.trim() === '' 
                  ? "text-signaledge-gray-dark" 
                  : "text-signaledge-lime hover:bg-signaledge-background"
              )}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotWidget;
