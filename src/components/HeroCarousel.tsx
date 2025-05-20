
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedAlbum {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  description: string;
}

interface HeroCarouselProps {
  featuredAlbums: FeaturedAlbum[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ featuredAlbums }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredAlbums.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredAlbums.length]);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredAlbums.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredAlbums.length) % featuredAlbums.length);
  };

  if (featuredAlbums.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-xl bg-music-gray">
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {featuredAlbums.map((album) => (
          <div 
            key={album.id}
            className="min-w-full h-[400px] md:h-[500px] relative"
          >
            <div className="absolute inset-0">
              <img
                src={album.coverImage}
                alt={`${album.title} by ${album.artist}`}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
            </div>
            
            <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-2xl">
              <h2 className="text-4xl font-bold mb-2">{album.title}</h2>
              <p className="text-xl text-gray-300 mb-4">{album.artist}</p>
              <p className="text-gray-300 mb-6 line-clamp-3">{album.description}</p>
              <div className="flex space-x-4">
                <Link to={`/album/${album.id}`}>
                  <Button className="bg-music-primary hover:bg-music-primary/90 text-white">
                    Explore Album
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredAlbums.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-music-primary w-6' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
