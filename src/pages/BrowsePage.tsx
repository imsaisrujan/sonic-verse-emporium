
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

// Mock data
const mockAlbums = [
  {
    id: '4',
    title: 'Utopia',
    artist: 'Travis Scott',
    coverImage: 'https://images.unsplash.com/photo-1504509546545-e000b4a62425?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 12.99,
    genre: 'Hip-Hop',
    releaseDate: '2023-07-28',
    rating: 4.2,
    previewTrack: {
      id: 'track1',
      title: 'FE!N',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
  },
  {
    id: '5',
    title: 'Midnights',
    artist: 'Taylor Swift',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 14.99,
    genre: 'Pop',
    releaseDate: '2022-10-21',
    rating: 4.7,
    previewTrack: {
      id: 'track2',
      title: 'Anti-Hero',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
  },
  {
    id: '6',
    title: 'Renaissance',
    artist: 'Beyoncé',
    coverImage: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 13.99,
    genre: 'Pop',
    releaseDate: '2022-07-29',
    rating: 4.8,
    previewTrack: {
      id: 'track3',
      title: 'BREAK MY SOUL',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
  },
  {
    id: '7',
    title: 'Un Verano Sin Ti',
    artist: 'Bad Bunny',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 11.99,
    genre: 'Latin',
    releaseDate: '2022-05-06',
    rating: 4.5,
    previewTrack: {
      id: 'track4',
      title: 'Me Porto Bonito',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
  },
  {
    id: '8',
    title: 'Back in Black',
    artist: 'AC/DC',
    coverImage: 'https://images.unsplash.com/photo-1461784180009-21121b2f204c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 9.99,
    genre: 'Rock',
    releaseDate: '1980-07-25',
    rating: 4.9,
    previewTrack: {
      id: 'track5',
      title: 'Back in Black',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    },
  },
  {
    id: '9',
    title: 'Thriller',
    artist: 'Michael Jackson',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 10.99,
    genre: 'Pop',
    releaseDate: '1982-11-30',
    rating: 5.0,
    previewTrack: {
      id: 'track6',
      title: 'Billie Jean',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
  },
  {
    id: '10',
    title: 'Rumours',
    artist: 'Fleetwood Mac',
    coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 9.99,
    genre: 'Rock',
    releaseDate: '1977-02-04',
    rating: 4.9,
    previewTrack: {
      id: 'track7',
      title: 'The Chain',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    },
  },
  {
    id: '11',
    title: 'Abbey Road',
    artist: 'The Beatles',
    coverImage: 'https://images.unsplash.com/photo-1482443462050-8b342880a623?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 11.99,
    genre: 'Rock',
    releaseDate: '1969-09-26',
    rating: 5.0,
    previewTrack: {
      id: 'track8',
      title: 'Come Together',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    },
  },
  {
    id: '12',
    title: 'To Pimp a Butterfly',
    artist: 'Kendrick Lamar',
    coverImage: 'https://images.unsplash.com/photo-1508973379184-7517410fb0bc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 12.99,
    genre: 'Hip-Hop',
    releaseDate: '2015-03-15',
    rating: 4.8,
    previewTrack: {
      id: 'track9',
      title: 'King Kunta',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    },
  },
  {
    id: '13',
    title: 'Kind of Blue',
    artist: 'Miles Davis',
    coverImage: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 10.99,
    genre: 'Jazz',
    releaseDate: '1959-08-17',
    rating: 5.0,
    previewTrack: {
      id: 'track10',
      title: 'So What',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    },
  },
];

const genres = ["Rock", "Pop", "Hip-Hop", "Jazz", "Latin", "Electronic", "Classical", "R&B"];

const BrowsePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);
  const [sortOrder, setSortOrder] = useState('relevance');
  const [filteredAlbums, setFilteredAlbums] = useState(mockAlbums);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  
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

    updateFilter();
  }, [searchParams]);

  const updateFilter = () => {
    let result = [...mockAlbums];
    
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
  }, [searchQuery, selectedGenres, priceRange, sortOrder]);
  
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
    // In a real app, this would dispatch an action to add to cart
    toast({
      title: "Added to cart",
      description: "Album has been added to your cart",
    });
  };

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
