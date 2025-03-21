
import { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import SearchBar from '@/components/SearchBar';
import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Sample projects data
const projectsData = [
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
  {
    id: '5',
    title: 'AI Content Generator',
    description: 'An application that uses machine learning to generate blog posts, product descriptions, and social media content.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Vercel'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    userId: '5',
    userName: 'James Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  },
  {
    id: '6',
    title: 'Fitness Tracking App',
    description: 'A mobile application for tracking workouts, nutrition, and fitness progress with personalized recommendations.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    technologies: ['React Native', 'GraphQL', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com',
    userId: '6',
    userName: 'Emma Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  },
];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('latest');
  
  // Handle search submission
  const handleSearch = (query: string, filters: string[]) => {
    setSearchQuery(query);
    setSearchFilters(filters);
    console.log('Searching for:', query, 'with filters:', filters);
    // In a real app, this would trigger an API call to search for projects
  };
  
  // Filtered and sorted projects
  // In a real app, this would come from an API based on search and filter criteria
  const filteredProjects = projectsData;
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      
      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 animate-fade-up">
            <h1 className="text-4xl font-bold mb-4">Discover Projects</h1>
            <p className="text-muted-foreground max-w-3xl">
              Explore innovative projects built by talented developers. Find inspiration, learn new technologies, and connect with creators.
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="mb-10 animate-fade-up [animation-delay:100ms]">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search for projects, technologies, or developers..."
            />
          </div>
          
          {/* Results header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 animate-fade-up [animation-delay:200ms]">
            <div>
              <p className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredProjects.length}</span> projects
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <Select defaultValue={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                Share Results
              </Button>
            </div>
          </div>
          
          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-fade-up [animation-delay:300ms]">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {/* Load more button */}
          <div className="flex justify-center mb-16 animate-fade-up [animation-delay:400ms]">
            <Button variant="outline" size="lg" className="px-8">
              Load More Projects
            </Button>
          </div>
          
          {/* Popular technologies section */}
          <div className="mb-16 animate-fade-up [animation-delay:500ms]">
            <h2 className="text-xl font-semibold mb-6">Popular Technologies</h2>
            <div className="flex flex-wrap gap-3">
              <Badge className="px-3 py-1">React</Badge>
              <Badge className="px-3 py-1">Node.js</Badge>
              <Badge className="px-3 py-1">Vue</Badge>
              <Badge className="px-3 py-1">Python</Badge>
              <Badge className="px-3 py-1">TypeScript</Badge>
              <Badge className="px-3 py-1">MongoDB</Badge>
              <Badge className="px-3 py-1">GraphQL</Badge>
              <Badge className="px-3 py-1">Django</Badge>
              <Badge className="px-3 py-1">Go</Badge>
              <Badge className="px-3 py-1">AWS</Badge>
              <Badge className="px-3 py-1">Docker</Badge>
              <Badge className="px-3 py-1">Kubernetes</Badge>
              <Badge className="px-3 py-1">TailwindCSS</Badge>
              <Badge className="px-3 py-1">Angular</Badge>
              <Badge className="px-3 py-1">Flutter</Badge>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
