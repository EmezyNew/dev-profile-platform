
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand and description */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <span className="text-primary font-mono text-xl">&lt;/&gt;</span>
                <span className="font-sans text-xl font-semibold">DevFolio</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs mb-6">
                A beautiful, minimal portfolio platform for developers to showcase their skills and projects.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            {/* Navigation links */}
            <div>
              <h3 className="font-medium mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/profiles" 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Developer Profiles
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/projects" 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/search" 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Search
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/pricing" 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/help" 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/privacy" 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms" 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} DevFolio. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link 
              to="/privacy" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link 
              to="/cookies" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
