
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Globe, 
  Mail, 
  MapPin, 
  Calendar, 
  Star, 
  MessageSquare,
  ThumbsUp,
  Share2
} from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';
import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('projects');
  
  // In a real app, this data would be fetched from the API based on the ID
  const profile = {
    id: id || '1',
    name: 'Alex Morgan',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    joinDate: 'January 2021',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550645612-83f5d594b671?auto=format&fit=crop&w=1920&q=80',
    rating: 4.9,
    reviewCount: 28,
    skills: [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'GraphQL', 
      'TailwindCSS', 'Next.js', 'Redux', 'MongoDB', 'AWS'
    ],
    bio: `I'm a frontend developer with 7 years of experience building responsive and accessible web applications. My focus is on creating intuitive user interfaces that provide exceptional user experiences.

I specialize in React, TypeScript, and modern JavaScript frameworks, with a passion for clean code and performance optimization. I'm also experienced in working with backend technologies like Node.js and GraphQL.

Currently looking for interesting projects to collaborate on and new opportunities to grow my skills.`,
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      website: 'https://example.com',
      email: 'alex@example.com'
    }
  };
  
  // Sample projects data
  const projects = [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A fully-featured e-commerce platform with inventory management, payment processing, and customer accounts. Built with a focus on performance and user experience.',
      image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      userId: id || '1',
      userName: profile.name,
      userAvatar: profile.avatar
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A productivity app for managing tasks, projects, and team collaboration. Features include drag-and-drop organization, calendar integration, and real-time updates.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'Redux', 'Firebase', 'Material UI'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      userId: id || '1',
      userName: profile.name,
      userAvatar: profile.avatar
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      description: 'A weather forecasting application that displays current conditions and forecasts for locations worldwide. Includes interactive maps and historical data visualization.',
      image: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&w=800&q=80',
      technologies: ['JavaScript', 'Chart.js', 'OpenWeather API'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      userId: id || '1',
      userName: profile.name,
      userAvatar: profile.avatar
    }
  ];
  
  // Sample reviews data
  const reviews = [
    {
      id: '1',
      author: {
        name: 'Emily Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        title: 'Product Manager'
      },
      rating: 5,
      date: '2 months ago',
      content: 'Alex is an exceptional developer who delivered our project ahead of schedule. His attention to detail and problem-solving skills were invaluable. The code is clean, well-documented, and easy to maintain.'
    },
    {
      id: '2',
      author: {
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        title: 'Tech Lead'
      },
      rating: 4.5,
      date: '3 months ago',
      content: 'Working with Alex was a pleasure. He quickly understood our requirements and implemented complex features with excellent code quality. Very responsive to feedback and dedicated to delivering the best possible product.'
    },
    {
      id: '3',
      author: {
        name: 'Sophia Martinez',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        title: 'UX Designer'
      },
      rating: 5,
      date: '5 months ago',
      content: 'Alex did an amazing job implementing our designs with pixel-perfect accuracy. He also suggested several UX improvements that made the final product even better. His technical skills and eye for design make him an incredibly valuable developer.'
    }
  ];
  
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-primary text-primary" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-4 w-4 text-muted" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="h-4 w-4 fill-primary text-primary" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-muted" />
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      
      <main className="flex-grow pt-16">
        {/* Cover image */}
        <div className="h-64 md:h-80 w-full relative overflow-hidden">
          <img 
            src={profile.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover animate-scale-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          {/* Profile header */}
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden shadow-lg animate-fade-in">
                <Avatar className="w-full h-full">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1">
                <div className="flex items-center gap-0.5 bg-primary/10 text-primary rounded-full px-2 py-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-xs font-medium">{profile.rating}</span>
                </div>
              </div>
            </div>
            
            {/* Profile info */}
            <div className="flex-1 animate-fade-up">
              <h1 className="text-3xl font-bold mb-1">{profile.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{profile.title}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.joinDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {profile.joinDate}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{profile.reviewCount} reviews</span>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-3 self-start md:self-auto mt-4 md:mt-0 animate-fade-in">
              <Button className="gap-2">
                <Mail className="h-4 w-4" />
                Contact
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10" aria-label="Share profile">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Social links */}
          <div className="flex flex-wrap gap-4 mb-8 animate-fade-up">
            {profile.social.github && (
              <a 
                href={profile.social.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            )}
            {profile.social.twitter && (
              <a 
                href={profile.social.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span>Twitter</span>
              </a>
            )}
            {profile.social.linkedin && (
              <a 
                href={profile.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            )}
            {profile.social.website && (
              <a 
                href={profile.social.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>Website</span>
              </a>
            )}
            {profile.social.email && (
              <a 
                href={`mailto:${profile.social.email}`} 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
            )}
          </div>
          
          {/* Main content tabs */}
          <Tabs defaultValue="projects" className="animate-fade-up [animation-delay:200ms]">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
              <TabsTrigger value="projects" onClick={() => setActiveTab('projects')}>
                Projects
              </TabsTrigger>
              <TabsTrigger value="about" onClick={() => setActiveTab('about')}>
                About
              </TabsTrigger>
              <TabsTrigger value="reviews" onClick={() => setActiveTab('reviews')}>
                Reviews
              </TabsTrigger>
            </TabsList>
            
            {/* Projects tab */}
            <TabsContent value="projects" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </TabsContent>
            
            {/* About tab */}
            <TabsContent value="about" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">About Me</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    {profile.bio.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1 font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Reviews tab */}
            <TabsContent value="reviews" className="space-y-6">
              <div className="bg-card rounded-lg border p-6 mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="text-4xl font-bold text-foreground">
                    {profile.rating}
                  </div>
                  <div>
                    <div className="flex mb-1">
                      {renderStars(profile.rating)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {profile.reviewCount} reviews
                    </p>
                  </div>
                </div>
                <Button className="mt-4 w-full sm:w-auto">Write a Review</Button>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-card rounded-lg border p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.author.avatar} alt={review.author.name} />
                          <AvatarFallback>
                            {review.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.author.name}</div>
                          <div className="text-xs text-muted-foreground">{review.author.title}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {review.date}
                      </div>
                    </div>
                    
                    <div className="flex mb-3">
                      {renderStars(review.rating)}
                    </div>
                    
                    <p className="text-sm mb-4">{review.content}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful</span>
                      </button>
                      <Separator orientation="vertical" className="h-4" />
                      <button className="hover:text-foreground transition-colors">
                        Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
