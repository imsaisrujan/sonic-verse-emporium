
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import AlbumGrid from '@/components/AlbumGrid';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { albumService } from '@/services/api';
import { useCart } from '@/context/CartContext';

const NewReleasesPage: React.FC = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  // Fetch new releases from API
  const { data: newReleases = [], isLoading } = useQuery({
    queryKey: ['newReleases'],
    queryFn: async () => {
      const response = await albumService.getNewReleases();
      return response.data;
    }
  });
  
  const handleAddToCart = (albumId: string) => {
    const album = newReleases.find(a => a.id === albumId);
    
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">New Releases</h1>
            <p className="text-gray-400">Check out our latest albums and singles</p>
          </div>
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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">New Releases</h1>
          <p className="text-gray-400">Check out our latest albums and singles</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-sm">
            Sort by Latest
          </Button>
          <Button variant="outline" className="text-sm">
            Filter
          </Button>
        </div>
      </div>

      {/* New Releases Grid */}
      <AlbumGrid 
        albums={newReleases} 
        onAddToCart={handleAddToCart}
        emptyMessage="No new releases available at this time"
      />
    </div>
  );
};

export default NewReleasesPage;
