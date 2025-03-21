
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Briefcase, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Navigation links
  const navLinks = [
    { title: 'Home', path: '/', icon: <User className="h-4 w-4 mr-2" /> },
    { title: 'Profiles', path: '/profiles', icon: <User className="h-4 w-4 mr-2" /> },
    { title: 'Projects', path: '/projects', icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { title: 'Search', path: '/search', icon: <Search className="h-4 w-4 mr-2" /> },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6',
        isScrolled ? 
          'bg-white/80 dark:bg-card/80 backdrop-blur-lg shadow-sm' : 
          'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl font-semibold flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span className="text-primary font-mono">&lt;/&gt;</span>
          <span className="font-sans">DevFolio</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-2 rounded-md transition-colors duration-200 flex items-center',
                location.pathname === link.path
                  ? 'text-primary font-medium bg-primary/5'
                  : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
              )}
            >
              {link.icon}
              {link.title}
            </Link>
          ))}
        </nav>
        
        {/* Auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" className="px-4 hover-scale">
            Sign In
          </Button>
          <Button size="sm" className="px-4 hover-scale">
            Sign Up
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground p-2 rounded-md hover:bg-secondary"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 animate-fade-in">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-md transition-colors duration-200 flex items-center',
                  location.pathname === link.path
                    ? 'text-primary font-medium bg-primary/5'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
                )}
              >
                {link.icon}
                {link.title}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2 border-t border-border">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Sign In
              </Button>
              <Button size="sm" className="w-full justify-start">
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavigationBar;
