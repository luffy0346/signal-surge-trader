
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

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
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'How it works', href: '/#how-it-works' },
    { name: 'Performance', href: '/#performance' },
    { name: 'Trading Strategies', href: '/trading-strategies' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { name: string, href: string }) => {
    // Only handle internal navigation logic for hash links
    if (link.href.includes('#')) {
      // If we're not on the home page and link has a hash, navigate to home first
      if (location.pathname !== '/' && link.href.startsWith('/#')) {
        // Don't prevent default - let the browser handle navigation to home page
        return;
      }
      
      // If we're already on the home page
      if (location.pathname === '/') {
        e.preventDefault();
        const targetId = link.href.split('#')[1];
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu if open
          setMobileMenuOpen(false);
        }
      }
    } else {
      // For non-hash links, just close the mobile menu
      setMobileMenuOpen(false);
    }
  };

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
          {/* Logo - Updated with new image and styling */}
          <Link to="/" className="text-white relative z-20">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/f383936b-4347-43db-86b1-98aa873010c1.png" 
                alt="SignalEdge Logo" 
                className="h-10 sm:h-12 md:h-14 transition-all duration-300 hover:opacity-90" 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link.name}
                </Link>
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
              <Link
                key={link.name}
                to={link.href}
                className="nav-link text-lg"
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.name}
              </Link>
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
