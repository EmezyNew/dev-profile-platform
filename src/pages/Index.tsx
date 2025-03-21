
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Code, Briefcase, Users } from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';
import Hero from '@/components/Hero';
import ProfileCard from '@/components/ProfileCard';
import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

// Sample data for featured developers
const featuredProfiles = [
  {
    id: '1',
    name: 'Alex Morgan',
    title: 'Senior Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.9,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'TailwindCSS'],
    bio: 'Frontend developer with 7 years of experience building responsive and accessible web applications. Specializing in React and modern JavaScript.',
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      website: 'https://example.com'
    }
  },
  {
    id: '2',
    name: 'Sara Chen',
    title: 'Full Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.8,
    skills: ['Vue', 'JavaScript', 'Python', 'Django', 'AWS'],
    bio: 'Full stack developer passionate about creating elegant solutions to complex problems. Experience with both front-end and back-end technologies.',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      website: 'https://example.com'
    }
  },
  {
    id: '3',
    name: 'David Kim',
    title: 'Backend Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.7,
    skills: ['Go', 'Kubernetes', 'MongoDB', 'Docker', 'Microservices'],
    bio: 'Backend developer specializing in building scalable and efficient APIs and services. Experienced with microservices architecture and cloud infrastructure.',
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  }
];

// Sample data for featured projects
const featuredProjects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A fully-featured e-commerce platform with inventory management, payment processing, and customer accounts.',
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    userId: '1',
    userName: 'Alex Morgan',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  },
  {
    id: '2',
    title: 'Smart Home Dashboard',
    description: 'A dashboard for monitoring and controlling smart home devices, with real-time updates and automation features.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
    technologies: ['Vue', 'Express', 'Socket.IO', 'Chart.js'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    userId: '2',
    userName: 'Sara Chen',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  },
  {
    id: '3',
    title: 'Microservices API Gateway',
    description: 'A high-performance API gateway that routes requests to the appropriate microservices and handles authentication.',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
    technologies: ['Go', 'gRPC', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com',
    userId: '3',
    userName: 'David Kim',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <Hero />
        
        {/* Features section */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose DevFolio?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The perfect platform to showcase your skills and connect with other developers and potential employers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Beautiful Portfolios</h3>
                <p className="text-muted-foreground mb-4">
                  Create a stunning portfolio that showcases your skills and projects in an elegant and professional way.
                </p>
                <Link to="/features" className="text-primary inline-flex items-center text-sm hover:underline">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {/* Feature 2 */}
              <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Project Showcase</h3>
                <p className="text-muted-foreground mb-4">
                  Highlight your best work with beautiful project cards, detailed descriptions, and direct links to live demos.
                </p>
                <Link to="/features" className="text-primary inline-flex items-center text-sm hover:underline">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {/* Feature 3 */}
              <div className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Developer Network</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with other developers, receive feedback on your work, and discover opportunities for collaboration.
                </p>
                <Link to="/features" className="text-primary inline-flex items-center text-sm hover:underline">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured developers section */}
        <section className="py-24 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Featured Developers</h2>
                <p className="text-muted-foreground max-w-2xl">
                  Discover talented developers from our community showcasing their skills and projects.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/profiles">View All Developers</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} featured={profile.id === '1'} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured projects section */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
                <p className="text-muted-foreground max-w-2xl">
                  Explore impressive projects built by developers in our community.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-24 px-4 bg-primary/5 border-y border-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to showcase your work?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers who use DevFolio to showcase their skills, share their projects, and connect with other professionals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="px-8">Create Your Portfolio</Button>
              <Button size="lg" variant="outline" className="px-8">Learn More</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
