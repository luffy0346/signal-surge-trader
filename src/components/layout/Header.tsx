
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#' },
    { name: 'How it works', href: '#' },
    { name: 'Performance', href: '#' },
    { name: 'Trading Strategies', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "py-3 bg-black bg-opacity-80 backdrop-blur-sm shadow-md" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-white relative z-20">
            <span className="block leading-tight text-xl font-semibold">SignalEdge</span>
            <span className="text-sm text-signaledge-gray-light ml-1">Trading</span>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="nav-link">
                  {link.name}
                </a>
              ))}
              <div className="flex items-center ml-4">
                <a href="#" className="text-sm text-signaledge-gray-light hover:text-white transition-colors mr-4">
                  Log In
                </a>
                <Button variant="primary" size="sm">
                  Join Us
                </Button>
              </div>
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white focus:outline-none z-20"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 bg-black bg-opacity-95 z-10 transition-all duration-300 ease-in-out flex flex-col justify-center",
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col items-center space-y-6 text-base">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-signaledge-gray-dark w-1/2">
              <a 
                href="#" 
                className="text-signaledge-gray-light hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </a>
              <Button 
                variant="primary" 
                size="md" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Us
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
