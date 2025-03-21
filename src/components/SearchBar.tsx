
import { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface SearchBarProps {
  onSearch: (query: string, filters: string[]) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search developers, projects, or technologies..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Available filters - in a real app these could come from the backend
  const availableFilters = [
    { id: 'dev-frontend', label: 'Frontend Developer' },
    { id: 'dev-backend', label: 'Backend Developer' },
    { id: 'dev-fullstack', label: 'Full Stack Developer' },
    { id: 'dev-mobile', label: 'Mobile Developer' },
    { id: 'dev-devops', label: 'DevOps Engineer' },
    { id: 'tech-react', label: 'React' },
    { id: 'tech-vue', label: 'Vue' },
    { id: 'tech-angular', label: 'Angular' },
    { id: 'tech-node', label: 'Node.js' },
    { id: 'tech-go', label: 'Go' },
    { id: 'tech-python', label: 'Python' },
  ];
  
  const handleSearch = () => {
    onSearch(query, activeFilters);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    );
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
  };
  
  const clearSearch = () => {
    setQuery('');
    onSearch('', activeFilters);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-10 py-6 text-base shadow-none border bg-secondary/50 focus-visible:bg-background"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className={`ml-2 h-10 w-10 ${activeFilters.length > 0 ? 'bg-primary/10 text-primary border-primary/20' : ''}`}
              aria-label="Filter search results"
            >
              <Filter className="h-4 w-4" />
              {activeFilters.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filters</h4>
                {activeFilters.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium mb-2">Developer Type</h5>
                  <div className="space-y-2">
                    {availableFilters
                      .filter(f => f.id.startsWith('dev-'))
                      .map(filter => (
                        <div key={filter.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={filter.id} 
                            checked={activeFilters.includes(filter.id)}
                            onCheckedChange={() => toggleFilter(filter.id)}
                          />
                          <Label 
                            htmlFor={filter.id} 
                            className="text-sm font-normal cursor-pointer"
                          >
                            {filter.label}
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-2">Technologies</h5>
                  <div className="space-y-2">
                    {availableFilters
                      .filter(f => f.id.startsWith('tech-'))
                      .map(filter => (
                        <div key={filter.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={filter.id} 
                            checked={activeFilters.includes(filter.id)}
                            onCheckedChange={() => toggleFilter(filter.id)}
                          />
                          <Label 
                            htmlFor={filter.id} 
                            className="text-sm font-normal cursor-pointer"
                          >
                            {filter.label}
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <Button 
                  onClick={() => {
                    handleSearch();
                  }}
                  className="w-full"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button onClick={handleSearch} className="ml-2 hidden sm:flex">
          Search
        </Button>
      </div>
      
      {/* Active filters display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {activeFilters.map(filterId => {
            const filter = availableFilters.find(f => f.id === filterId);
            return (
              <Badge 
                key={filterId} 
                variant="secondary"
                className="px-2 py-1 gap-1"
              >
                {filter?.label}
                <button 
                  onClick={() => toggleFilter(filterId)}
                  className="ml-1 hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          {activeFilters.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
