
import { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import SearchBar from '@/components/SearchBar';
import ProfileCard from '@/components/ProfileCard';
import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Sample data
const profiles = [
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
  },
  {
    id: '4',
    name: 'Maria Rodriguez',
    title: 'UI/UX Developer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.9,
    skills: ['React', 'Figma', 'UI Design', 'CSS', 'Animation'],
    bio: 'UI/UX developer focused on creating beautiful and intuitive user interfaces. Specialized in translating design concepts into functional code.',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      website: 'https://example.com'
    }
  },
  {
    id: '5',
    name: 'James Wilson',
    title: 'Mobile Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.6,
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    bio: 'Mobile developer specializing in cross-platform and native app development. Creating responsive and performant applications for iOS and Android.',
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: '6',
    name: 'Emma Thompson',
    title: 'DevOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    rating: 4.8,
    skills: ['AWS', 'Terraform', 'CI/CD', 'Docker', 'Kubernetes'],
    bio: 'DevOps engineer with experience in cloud infrastructure, automation, and CI/CD pipelines. Passionate about improving development workflows and system reliability.',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
];

const projects = [
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
  },
  {
    id: '4',
    title: 'Social Media Analytics',
    description: 'A platform for analyzing social media metrics, engagement, and audience demographics across multiple platforms.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'D3.js', 'Python', 'Flask', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    userId: '4',
    userName: 'Maria Rodriguez',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  
  // Handle search submission
  const handleSearch = (query: string, filters: string[]) => {
    setSearchQuery(query);
    setSearchFilters(filters);
    console.log('Searching for:', query, 'with filters:', filters);
    // In a real app, this would trigger an API call to search
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      
      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 animate-fade-up">
            <h1 className="text-4xl font-bold mb-4">Search</h1>
            <p className="text-muted-foreground max-w-3xl">
              Find talented developers, inspiring projects, and cutting-edge technologies. Discover new collaborators or get inspiration for your next project.
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="mb-10 animate-fade-up [animation-delay:100ms]">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search for developers, projects, or technologies..."
            />
          </div>
          
          {/* Results tabs */}
          <Tabs 
            defaultValue="all" 
            className="mb-8 animate-fade-up [animation-delay:200ms]"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="all">All Results</TabsTrigger>
              <TabsTrigger value="developers">Developers</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            
            {/* All results */}
            <TabsContent value="all" className="space-y-12">
              {/* Developers section */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Developers</h2>
                  <Button variant="ghost" size="sm" className="text-primary" onClick={() => setActiveTab('developers')}>
                    View All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profiles.slice(0, 3).map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                  ))}
                </div>
              </div>
              
              {/* Projects section */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Projects</h2>
                  <Button variant="ghost" size="sm" className="text-primary" onClick={() => setActiveTab('projects')}>
                    View All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.slice(0, 3).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Developers results */}
            <TabsContent value="developers">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
              
              <div className="flex justify-center mt-12">
                <Button variant="outline" size="lg" className="px-8">
                  Load More
                </Button>
              </div>
            </TabsContent>
            
            {/* Projects results */}
            <TabsContent value="projects">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              
              <div className="flex justify-center mt-12">
                <Button variant="outline" size="lg" className="px-8">
                  Load More
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
