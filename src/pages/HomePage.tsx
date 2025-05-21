
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Album, Headphones, Music, Radio } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import AlbumGrid from '@/components/AlbumGrid';
import GenreButton from '@/components/GenreButton';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { albumService } from '@/services/api';
import { useCart } from '@/context/CartContext';

const genres = [
  { name: 'Rock', icon: <Music className="h-8 w-8" /> },
  { name: 'Pop', icon: <Headphones className="h-8 w-8" /> },
  { name: 'Hip-Hop', icon: <Radio className="h-8 w-8" /> },
  { name: 'Jazz', icon: <Album className="h-8 w-8" /> },
];

const HomePage: React.FC = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  // Fetch featured albums
  const { data: featuredAlbums = [], isLoading: isLoadingFeatured } = useQuery({
    queryKey: ['featuredAlbums'],
    queryFn: async () => {
      const response = await albumService.getFeaturedAlbums();
      return response.data;
    }
  });
  
  // Fetch new releases
  const { data: newReleases = [], isLoading: isLoadingNew } = useQuery({
    queryKey: ['newReleases'],
    queryFn: async () => {
      const response = await albumService.getNewReleases();
      return response.data;
    }
  });
  
  // Fetch top sellers
  const { data: topSellers = [], isLoading: isLoadingTop } = useQuery({
    queryKey: ['topSellers'],
    queryFn: async () => {
      const response = await albumService.getTopSellers();
      return response.data;
    }
  });

  const handleAddToCart = (albumId: string) => {
    const album = [...newReleases, ...topSellers].find(a => a.id === albumId);
    
    if (album) {
      addToCart({
        id: album.id,
        title: album.title,
        artist: album.artist,
        coverImage: album.coverImage,
        price: album.price
      });
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section>
        {isLoadingFeatured ? (
          <div className="h-[400px] md:h-[500px] bg-music-gray/50 animate-pulse rounded-xl"></div>
        ) : (
          <HeroCarousel featuredAlbums={featuredAlbums} />
        )}
      </section>

      {/* New Releases Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Releases</h2>
          <Link to="/new-releases" className="text-music-primary hover:underline">
            <Button variant="link">View all</Button>
          </Link>
        </div>
        {isLoadingNew ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-music-gray/50 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : (
          <AlbumGrid albums={newReleases} onAddToCart={handleAddToCart} />
        )}
      </section>

      {/* Genres Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Browse Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <GenreButton key={genre.name} genre={genre.name} icon={genre.icon} />
          ))}
        </div>
      </section>

      {/* Top Sellers Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Top Sellers</h2>
          <Link to="/browse?top=true" className="text-music-primary hover:underline">
            <Button variant="link">View all</Button>
          </Link>
        </div>
        {isLoadingTop ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-music-gray/50 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : (
          <AlbumGrid albums={topSellers} onAddToCart={handleAddToCart} />
        )}
      </section>

      {/* Call to action */}
      <section className="bg-gradient-to-r from-music-primary to-music-secondary rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Sign up to get personalized recommendations, track your favorite artists, and save your music preferences.
        </p>
        <Link to="/register">
          <Button variant="outline" className="bg-white text-music-primary hover:bg-opacity-90">
            Create Account
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
