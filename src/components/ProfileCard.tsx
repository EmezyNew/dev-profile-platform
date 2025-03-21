
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  ExternalLink, 
  Star, 
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    rating: number;
    skills: string[];
    bio: string;
    social: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
  };
  featured?: boolean;
}

const ProfileCard = ({ profile, featured = false }: ProfileCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border transition-all duration-300 hover-scale",
        featured ? "border-primary/20 bg-primary/[0.03]" : "border-border bg-card",
        isHovered ? "shadow-lg" : "subtle-shadow"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="default" className="bg-primary/90 hover:bg-primary">
            Featured
          </Badge>
        </div>
      )}
      
      <div className="flex flex-col h-full">
        {/* Profile header */}
        <div className="p-6 pb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-background shadow-sm">
              <img 
                src={profile.avatar || "https://github.com/shadcn.png"} 
                alt={profile.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
              <div className="flex items-center gap-0.5 bg-primary/10 text-primary rounded-full px-1.5 py-0.5">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="text-xs font-medium">{profile.rating}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">{profile.title}</p>
          </div>
        </div>
        
        {/* Skills */}
        <div className="px-6 py-2">
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
            {profile.skills.length > 4 && (
              <Badge variant="secondary" className="font-normal">
                +{profile.skills.length - 4}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Bio */}
        <div className="px-6 py-3 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">{profile.bio}</p>
        </div>
        
        {/* Social links */}
        <div className="px-6 py-3 flex items-center gap-2 border-t border-border mt-auto">
          {profile.social.github && (
            <a 
              href={profile.social.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1.5 rounded-full hover:bg-secondary transition-colors"
              aria-label="GitHub profile"
            >
              <Github className="h-4 w-4 text-muted-foreground" />
            </a>
          )}
          {profile.social.twitter && (
            <a 
              href={profile.social.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1.5 rounded-full hover:bg-secondary transition-colors"
              aria-label="Twitter profile"
            >
              <Twitter className="h-4 w-4 text-muted-foreground" />
            </a>
          )}
          {profile.social.linkedin && (
            <a 
              href={profile.social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1.5 rounded-full hover:bg-secondary transition-colors"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-4 w-4 text-muted-foreground" />
            </a>
          )}
          {profile.social.website && (
            <a 
              href={profile.social.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1.5 rounded-full hover:bg-secondary transition-colors"
              aria-label="Personal website"
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
              <Link to={`/profile/${profile.id}`}>
                View Profile
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
