
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import AlbumGrid from '@/components/AlbumGrid';
import { Button } from '@/components/ui/button';

// Mock new releases data - In a real app this would come from an API
const mockNewReleases = [
  {
    id: '4',
    title: 'Utopia',
    artist: 'Travis Scott',
    coverImage: 'https://images.unsplash.com/photo-1504509546545-e000b4a62425?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 12.99,
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
    previewTrack: {
      id: 'track4',
      title: 'Me Porto Bonito',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
  },
  // Additional new releases
  {
    id: '12',
    title: 'Happier Than Ever',
    artist: 'Billie Eilish',
    coverImage: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 13.49,
    previewTrack: {
      id: 'track9',
      title: 'Happier Than Ever',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    },
  },
  {
    id: '13',
    title: 'Planet Her',
    artist: 'Doja Cat',
    coverImage: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 12.99,
    previewTrack: {
      id: 'track10',
      title: 'Kiss Me More',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    },
  },
  {
    id: '14',
    title: 'Sour',
    artist: 'Olivia Rodrigo',
    coverImage: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 11.99,
    previewTrack: {
      id: 'track11',
      title: 'drivers license',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    },
  },
  {
    id: '15',
    title: '30',
    artist: 'Adele',
    coverImage: 'https://images.unsplash.com/photo-1453738773917-9c3eff1db985?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 14.99,
    previewTrack: {
      id: 'track12',
      title: 'Easy On Me',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    },
  },
];

const NewReleasesPage: React.FC = () => {
  const { toast } = useToast();
  
  const handleAddToCart = (albumId: string) => {
    console.log(`Adding album ${albumId} to cart`);
    toast({
      title: "Added to cart",
      description: "Album has been added to your cart",
    });
  };

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
        albums={mockNewReleases} 
        onAddToCart={handleAddToCart}
        emptyMessage="No new releases available at this time"
      />
    </div>
  );
};

export default NewReleasesPage;
