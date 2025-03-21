
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, User, Star } from 'lucide-react';

// Import the correct briefcase icon
import { Briefcase } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-gradient min-h-[90vh] pt-32 pb-20 relative overflow-hidden">
      <div className="content-container h-full flex flex-col justify-center relative z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        
        {/* Small chip above title */}
        <div className="mb-6 animate-fade-in">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            <Code className="h-3.5 w-3.5 mr-1.5" />
            Developer Portfolio Platform
          </span>
        </div>
        
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance max-w-4xl mb-6 animate-fade-up">
          Showcase your skills with a <span className="text-primary">beautiful portfolio</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-up [animation-delay:100ms]">
          Create an elegant, professional portfolio to highlight your projects and skills. Connect with other developers and build your personal brand.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 mb-16 animate-fade-up [animation-delay:200ms]">
          <Button size="lg" className="px-6 gap-2 hover-scale group">
            Create Your Portfolio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" className="px-6 hover-scale">
            Explore Portfolios
          </Button>
        </div>
        
        {/* Stats section */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 py-8 border-t border-border animate-fade-up [animation-delay:300ms]">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">2,500+</p>
              <p className="text-sm text-muted-foreground">Developers</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">10,000+</p>
              <p className="text-sm text-muted-foreground">Projects</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">4.9/5</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute right-[-5%] top-[20%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute left-[-10%] bottom-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
