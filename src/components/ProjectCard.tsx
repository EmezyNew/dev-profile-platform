
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    userId: string;
    userName: string;
    userAvatar: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover-scale",
        isHovered ? "shadow-lg" : "subtle-shadow"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project image */}
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Project content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="font-normal">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="secondary" className="font-normal">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
        
        {/* Project links */}
        <div className="flex items-center mt-auto pt-2">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mr-3 p-1.5 rounded-full hover:bg-secondary transition-colors"
              aria-label="View repository on GitHub"
            >
              <Github className="h-4 w-4 text-muted-foreground" />
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mr-3 p-1.5 rounded-full hover:bg-secondary transition-colors"
              aria-label="View live project"
            >
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          )}
          
          <div className="ml-auto">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className="gap-1 text-primary hover:text-primary hover:bg-primary/5"
            >
              <Link to={`/project/${project.id}`}>
                Details
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Developer info */}
      <div className="px-6 py-3 border-t border-border flex items-center gap-2">
        <Link to={`/profile/${project.userId}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img 
              src={project.userAvatar || "https://github.com/shadcn.png"}
              alt={project.userName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">{project.userName}</span>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
