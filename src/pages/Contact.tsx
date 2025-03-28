
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from "@/components/ui/card";
import Button from '@/components/ui/Button';
import { Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! We'll be in touch soon.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Contact Us</span>
              </h1>
              <p className="text-signaledge-gray-light max-w-2xl mx-auto text-lg">
                Our team of trading specialists is here to answer your questions and provide expert guidance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="glass-card hover:shadow-glow-lime transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-signaledge-card p-4 rounded-full mb-4">
                    <Phone className="h-6 w-6 text-signaledge-lime" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Call Us</h3>
                  <p className="text-signaledge-gray-light mb-4">Our team is available during business hours</p>
                  <a href="tel:+1-555-123-4567" className="text-signaledge-lime hover:underline">+1 (555) 123-4567</a>
                </CardContent>
              </Card>
              
              <Card className="glass-card hover:shadow-glow-lime transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-signaledge-card p-4 rounded-full mb-4">
                    <Mail className="h-6 w-6 text-signaledge-lime" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Email Us</h3>
                  <p className="text-signaledge-gray-light mb-4">We'll respond to your inquiry promptly</p>
                  <a href="mailto:support@signaledge.com" className="text-signaledge-lime hover:underline">support@signaledge.com</a>
                </CardContent>
              </Card>
              
              <Card className="glass-card hover:shadow-glow-lime transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-signaledge-card p-4 rounded-full mb-4">
                    <MapPin className="h-6 w-6 text-signaledge-lime" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Visit Us</h3>
                  <p className="text-signaledge-gray-light mb-4">Our headquarters location</p>
                  <address className="text-signaledge-gray-light not-italic">
                    123 Trading Plaza, Suite 500<br />
                    New York, NY 10001
                  </address>
                </CardContent>
              </Card>
            </div>
            
            <Card className="glass-card p-8 max-w-4xl mx-auto">
              <CardContent className="p-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Send Us a Message</h2>
                <p className="text-signaledge-gray-light mb-8">
                  Have a question about our trading signals or need assistance? 
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-white">Your Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-md bg-signaledge-card border border-signaledge-gray-dark focus:border-signaledge-lime focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-white">Your Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-md bg-signaledge-card border border-signaledge-gray-dark focus:border-signaledge-lime focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-white">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-md bg-signaledge-card border border-signaledge-gray-dark focus:border-signaledge-lime focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-white">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full p-3 rounded-md bg-signaledge-card border border-signaledge-gray-dark focus:border-signaledge-lime focus:outline-none transition-colors"
                    ></textarea>
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      loading={isSubmitting}
                      className="w-full md:w-auto"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
