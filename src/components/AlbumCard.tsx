
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface Album {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  price: number;
  previewTrack?: {
    id: string;
    title: string;
    audioUrl: string;
  };
}

interface AlbumCardProps {
  album: Album;
  onAddToCart?: (albumId: string) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onAddToCart }) => {
  const { playTrack } = useAudioPlayer();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handlePlayPreview = () => {
    if (album.previewTrack) {
      playTrack({
        id: album.previewTrack.id,
        title: album.previewTrack.title,
        artist: album.artist,
        audioUrl: album.previewTrack.audioUrl,
        albumCover: album.coverImage,
      });
    }
  };
  
  const handleAddToCart = () => {
    // Use the onAddToCart prop if provided (for compatibility with existing code)
    if (onAddToCart) {
      onAddToCart(album.id);
    }
    
    // Always use the cart context
    addToCart({
      id: album.id,
      title: album.title,
      artist: album.artist,
      coverImage: album.coverImage,
      price: album.price,
    });
    
    toast({
      title: "Added to cart",
      description: `${album.title} has been added to your cart`,
    });
  };

  return (
    <div className="bg-music-gray rounded-lg overflow-hidden flex flex-col transition-transform duration-200 hover:translate-y-[-8px]">
      <Link to={`/album/${album.id}`} className="block">
        <div className="relative group">
          <img 
            src={album.coverImage} 
            alt={`${album.title} by ${album.artist}`}
            className="w-full aspect-square object-cover"
          />
          {album.previewTrack && (
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handlePlayPreview();
              }}
            >
              <span className="text-white text-sm font-medium bg-music-primary px-4 py-2 rounded-full">
                Preview
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/album/${album.id}`} className="block">
          <h3 className="font-medium text-lg truncate hover:text-music-primary transition-colors">
            {album.title}
          </h3>
          <p className="text-gray-400 text-sm mb-3">{album.artist}</p>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-lg">${album.price.toFixed(2)}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleAddToCart}
            className="text-music-primary border-music-primary hover:bg-music-primary hover:text-white transition-colors"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only md:inline-block">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
