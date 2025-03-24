
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-signaledge-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">SignalEdge Trading</h3>
            <p className="text-signaledge-gray-light">
              Advanced trading signals for stocks, forex, and commodities using proprietary algorithms and AI-driven analysis.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-signaledge-gray-light hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-signaledge-gray-light hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-signaledge-gray-light hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#" className="text-signaledge-gray-light hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-signaledge-gray-light hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-signaledge-gray-light hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-signaledge-gray-light hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-signaledge-gray-light hover:text-white transition-colors">API Reference</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-signaledge-gray-light">support@signaledge.com</li>
              <li className="text-signaledge-gray-light">+1 (555) 123-4567</li>
              <li className="text-signaledge-gray-light">123 Trading St, New York, NY</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-signaledge-card text-center md:flex md:items-center md:justify-between">
          <p className="text-signaledge-gray-light">
            &copy; {new Date().getFullYear()} SignalEdge Trading. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href="#" className="text-signaledge-gray-light hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-signaledge-gray-light hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-signaledge-gray-light hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
