import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Slider
} from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import AlbumGrid from '@/components/AlbumGrid';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { albumService } from '@/services/api';
import { useCart } from '@/context/CartContext';

const genres = ["Rock", "Pop", "Hip-Hop", "Jazz", "Latin", "Electronic", "Classical", "R&B"];

const BrowsePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);
  const [sortOrder, setSortOrder] = useState('relevance');
  const [filteredAlbums, setFilteredAlbums] = useState<any[]>([]);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  
  // Fetch all albums
  const { data: albums = [], isLoading } = useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      const response = await albumService.getAlbums();
      return response.data;
    }
  });
  
  // Initialize filters from URL params
  useEffect(() => {
    const genreParam = searchParams.get('genre');
    if (genreParam) {
      setSelectedGenres([genreParam]);
    }
    
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
    
    const newParam = searchParams.get('new');
    if (newParam === 'true') {
      setSortOrder('newest');
    }
    
    const topParam = searchParams.get('top');
    if (topParam === 'true') {
      setSortOrder('rating');
    }
  }, [searchParams]);

  const updateFilter = () => {
    if (!albums || albums.length === 0) return;
    
    let result = [...albums];
    
    // Apply search query filter
    if (searchQuery) {
      result = result.filter(album => 
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply genre filter
    if (selectedGenres.length > 0) {
      result = result.filter(album => selectedGenres.includes(album.genre));
    }
    
    // Apply price range filter
    result = result.filter(album => 
      album.price >= priceRange[0] && album.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOrder) {
      case 'newest':
        result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'a-z':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'z-a':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      // Relevance is default sorting (no sort)
      default:
        break;
    }
    
    setFilteredAlbums(result);
  };

  useEffect(() => {
    updateFilter();
  }, [searchQuery, selectedGenres, priceRange, sortOrder, albums]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter();
    setSearchParams(params => {
      if (searchQuery) {
        params.set('q', searchQuery);
      } else {
        params.delete('q');
      }
      return params;
    });
  };

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev => {
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre);
      } else {
        return [...prev, genre];
      }
    });
  };
  
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setPriceRange([0, 20]);
    setSortOrder('relevance');
    setSearchParams({});
  };
  
  const handleAddToCart = (albumId: string) => {
    const album = albums.find(a => a.id === albumId);
    
    if (album) {
      addToCart({
        id: album.id,
        title: album.title,
        artist: album.artist,
        coverImage: album.coverImage,
        price: album.price
      });
      
      toast({
        title: "Added to cart",
        description: `${album.title} has been added to your cart`,
      });
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Browse Albums</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="aspect-square bg-music-gray/50 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Browse Albums</h1>
        <Button 
          variant="outline" 
          className="md:hidden"
          onClick={() => setIsMobileFilterVisible(!isMobileFilterVisible)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="w-full md:w-64 space-y-6 hidden md:block">
          <div className="bg-music-gray rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button 
                onClick={handleClearFilters}
                className="text-sm text-music-primary hover:underline"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              {/* Search */}
              <div>
                <h3 className="text-sm font-medium mb-2">Search</h3>
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Albums, artists..."
                    className="pl-8 bg-black border-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>

              {/* Genre Filter */}
              <Accordion type="single" collapsible defaultValue="genres">
                <AccordionItem value="genres" className="border-none">
                  <AccordionTrigger className="py-0 text-sm font-medium">
                    Genre
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-0">
                    <div className="space-y-2">
                      {genres.map(genre => (
                        <div key={genre} className="flex items-center">
                          <Checkbox 
                            id={`genre-${genre}`}
                            checked={selectedGenres.includes(genre)}
                            onCheckedChange={() => handleGenreToggle(genre)}
                            className="border-gray-500"
                          />
                          <label 
                            htmlFor={`genre-${genre}`}
                            className="ml-2 text-sm"
                          >
                            {genre}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Price Range Filter */}
              <Accordion type="single" collapsible defaultValue="price">
                <AccordionItem value="price" className="border-none">
                  <AccordionTrigger className="py-0 text-sm font-medium">
                    Price Range
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-0">
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[0, 20]}
                        min={0}
                        max={20}
                        step={1}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                      />
                      <div className="flex justify-between">
                        <span className="text-sm">${priceRange[0]}</span>
                        <span className="text-sm">${priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        {isMobileFilterVisible && (
          <div className="fixed inset-0 z-50 flex items-end bg-black/80 md:hidden">
            <div className="bg-music-gray w-full rounded-t-xl p-6 h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleClearFilters}
                    className="text-sm text-music-primary"
                  >
                    Clear All
                  </button>
                  <button onClick={() => setIsMobileFilterVisible(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Search</h3>
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Albums, artists..."
                      className="pl-8 bg-black border-gray-700"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>

                {/* Genre Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Genre</h3>
                  <div className="space-y-2">
                    {genres.map(genre => (
                      <div key={genre} className="flex items-center">
                        <Checkbox 
                          id={`mobile-genre-${genre}`}
                          checked={selectedGenres.includes(genre)}
                          onCheckedChange={() => handleGenreToggle(genre)}
                          className="border-gray-500"
                        />
                        <label 
                          htmlFor={`mobile-genre-${genre}`}
                          className="ml-2 text-sm"
                        >
                          {genre}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[0, 20]}
                      min={0}
                      max={20}
                      step={1}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                    />
                    <div className="flex justify-between">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-music-primary hover:bg-music-primary/90" 
                  onClick={() => setIsMobileFilterVisible(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Albums Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-400">{filteredAlbums.length} albums found</p>
            <div className="flex items-center">
              <span className="text-sm mr-2 hidden md:inline">Sort by:</span>
              <Select
                value={sortOrder}
                onValueChange={(value) => setSortOrder(value)}
              >
                <SelectTrigger className="w-36 md:w-40 bg-music-gray border-gray-700">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-music-gray">
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedGenres.length > 0 || searchQuery || priceRange[0] > 0 || priceRange[1] < 20) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedGenres.map(genre => (
                <div 
                  key={genre} 
                  className="bg-music-gray rounded-full px-3 py-1 text-sm flex items-center"
                >
                  {genre}
                  <button 
                    onClick={() => handleGenreToggle(genre)} 
                    className="ml-2"
                    aria-label={`Remove ${genre} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {searchQuery && (
                <div className="bg-music-gray rounded-full px-3 py-1 text-sm flex items-center">
                  Search: {searchQuery}
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSearchParams(params => {
                        params.delete('q');
                        return params;
                      });
                    }} 
                    className="ml-2"
                    aria-label="Clear search"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {(priceRange[0] > 0 || priceRange[1] < 20) && (
                <div className="bg-music-gray rounded-full px-3 py-1 text-sm flex items-center">
                  ${priceRange[0]} - ${priceRange[1]}
                  <button 
                    onClick={() => setPriceRange([0, 20])} 
                    className="ml-2"
                    aria-label="Clear price range"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}

          <AlbumGrid 
            albums={filteredAlbums} 
            onAddToCart={handleAddToCart}
            emptyMessage="No albums found matching your criteria. Try adjusting your filters."
          />
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
