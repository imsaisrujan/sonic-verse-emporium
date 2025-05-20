
import React from 'react';
import { Link } from 'react-router-dom';
import { Album, Headphones, Music, Radio } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import AlbumGrid from '@/components/AlbumGrid';
import GenreButton from '@/components/GenreButton';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockFeaturedAlbums = [
  {
    id: '1',
    title: 'Dawn FM',
    artist: 'The Weeknd',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Experience a journey of electrifying beats and soulful melodies that push the boundaries of contemporary R&B and pop music.',
  },
  {
    id: '2',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A masterful blend of retro disco and modern pop that creates an irresistible sonic landscape for dance and reflection.',
  },
  {
    id: '3',
    title: 'Blonde',
    artist: 'Frank Ocean',
    coverImage: 'https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'An introspective masterpiece that blends experimental R&B with poetic storytelling, creating a deeply personal musical experience.',
  },
];

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
];

const mockTopSellers = [
  {
    id: '8',
    title: 'Back in Black',
    artist: 'AC/DC',
    coverImage: 'https://images.unsplash.com/photo-1461784180009-21121b2f204c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 9.99,
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
    previewTrack: {
      id: 'track8',
      title: 'Come Together',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    },
  },
];

const genres = [
  { name: 'Rock', icon: <Music className="h-8 w-8" /> },
  { name: 'Pop', icon: <Headphones className="h-8 w-8" /> },
  { name: 'Hip-Hop', icon: <Radio className="h-8 w-8" /> },
  { name: 'Jazz', icon: <Album className="h-8 w-8" /> },
];

const HomePage: React.FC = () => {
  const { toast } = useToast();
  
  const handleAddToCart = (albumId: string) => {
    // In a real app, this would dispatch an action to add to cart
    console.log(`Adding album ${albumId} to cart`);
    toast({
      title: "Added to cart",
      description: "Album has been added to your cart",
    });
  };

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section>
        <HeroCarousel featuredAlbums={mockFeaturedAlbums} />
      </section>

      {/* New Releases Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Releases</h2>
          <Link to="/browse?new=true" className="text-music-primary hover:underline">
            View all
          </Link>
        </div>
        <AlbumGrid albums={mockNewReleases} onAddToCart={handleAddToCart} />
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
            View all
          </Link>
        </div>
        <AlbumGrid albums={mockTopSellers} onAddToCart={handleAddToCart} />
      </section>

      {/* Call to action */}
      <section className="bg-gradient-to-r from-music-primary to-music-secondary rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Sign up to get personalized recommendations, track your favorite artists, and save your music preferences.
        </p>
        <Link to="/register">
          <button className="bg-white text-music-primary px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
            Create Account
          </button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
