
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Clock, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';

// Mock data for album details
const mockAlbumDetails = {
  '1': {
    id: '1',
    title: 'Dawn FM',
    artist: 'The Weeknd',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 12.99,
    genre: 'R&B/Soul',
    releaseDate: '2022-01-07',
    rating: 4.5,
    description: 'Experience a journey of electrifying beats and soulful melodies that push the boundaries of contemporary R&B and pop music. The Weeknd delivers a conceptual masterpiece with "Dawn FM," taking listeners through a simulated radio program that guides the soul to the afterlife.',
    inStock: true,
    tracks: [
      { id: 't1', title: 'Dawn FM', duration: '1:37', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 't2', title: 'Gasoline', duration: '3:33', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { id: 't3', title: 'How Do I Make You Love Me?', duration: '3:34', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
      { id: 't4', title: 'Take My Breath', duration: '3:49', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
      { id: 't5', title: 'Sacrifice', duration: '3:09', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    ]
  },
  '2': {
    id: '2',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 11.99,
    genre: 'Pop',
    releaseDate: '2020-03-27',
    rating: 4.8,
    description: 'A masterful blend of retro disco and modern pop that creates an irresistible sonic landscape for dance and reflection. "Future Nostalgia" is Dua Lipa\'s second studio album that pays homage to classic pop while pushing the genre forward with its sleek production and infectious hooks.',
    inStock: true,
    tracks: [
      { id: 't6', title: 'Future Nostalgia', duration: '3:04', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
      { id: 't7', title: 'Don\'t Start Now', duration: '3:03', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
      { id: 't8', title: 'Cool', duration: '3:29', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
      { id: 't9', title: 'Physical', duration: '3:42', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
      { id: 't10', title: 'Levitating', duration: '3:23', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
    ]
  },
  '3': {
    id: '3',
    title: 'Blonde',
    artist: 'Frank Ocean',
    coverImage: 'https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 13.99,
    genre: 'R&B/Soul',
    releaseDate: '2016-08-20',
    rating: 5.0,
    description: 'An introspective masterpiece that blends experimental R&B with poetic storytelling, creating a deeply personal musical experience. "Blonde" is Frank Ocean\'s critically acclaimed second studio album that explores themes of love, identity, and nostalgia through innovative production and vulnerable lyricism.',
    inStock: true,
    tracks: [
      { id: 't11', title: 'Nikes', duration: '5:14', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 't12', title: 'Ivy', duration: '4:09', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { id: 't13', title: 'Pink + White', duration: '3:04', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
      { id: 't14', title: 'Solo', duration: '4:17', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
      { id: 't15', title: 'Self Control', duration: '4:09', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    ]
  },
  '4': {
    id: '4',
    title: 'Utopia',
    artist: 'Travis Scott',
    coverImage: 'https://images.unsplash.com/photo-1504509546545-e000b4a62425?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 12.99,
    genre: 'Hip-Hop',
    releaseDate: '2023-07-28',
    rating: 4.2,
    description: 'A psychedelic journey through Travis Scott\'s musical vision of utopia, featuring innovative production and star-studded collaborations. This long-awaited album pushes the boundaries of hip-hop with its futuristic soundscapes and immersive atmosphere.',
    inStock: true,
    tracks: [
      { id: 't16', title: 'HYAENA', duration: '3:47', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
      { id: 't17', title: 'THANK GOD', duration: '2:56', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
      { id: 't18', title: 'MODERN JAM', duration: '3:29', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
      { id: 't19', title: 'MY EYES', duration: '4:18', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
      { id: 't20', title: 'FE!N', duration: '3:35', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
    ]
  },
};

// Mock data for similar albums
const mockSimilarAlbums = [
  {
    id: '5',
    title: 'Midnights',
    artist: 'Taylor Swift',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 14.99,
  },
  {
    id: '6',
    title: 'Renaissance',
    artist: 'Beyoncé',
    coverImage: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 13.99,
  },
  {
    id: '7',
    title: 'Un Verano Sin Ti',
    artist: 'Bad Bunny',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 11.99,
  },
];

const AlbumDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playTrack } = useAudioPlayer();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  // In a real app, this would fetch the album data from an API
  const album = id ? mockAlbumDetails[id as keyof typeof mockAlbumDetails] : null;
  
  if (!album) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl font-bold mb-4">Album not found</h1>
        <p className="text-gray-400 mb-8">The album you're looking for doesn't exist or has been removed.</p>
        <Link to="/browse">
          <Button>Browse Albums</Button>
        </Link>
      </div>
    );
  }
  
  const handlePlayPreview = (track: any) => {
    playTrack({
      id: track.id,
      title: track.title,
      artist: album.artist,
      audioUrl: track.previewUrl,
      albumCover: album.coverImage,
    });
  };
  
  const handleAddToCart = () => {
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
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="pb-16">
      {/* Album Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Album Cover */}
        <div className="w-full md:w-80 lg:w-96 flex-shrink-0">
          <img 
            src={album.coverImage} 
            alt={`${album.title} by ${album.artist}`}
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
          />
        </div>
        
        {/* Album Info */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-music-dark/50">
                {album.genre}
              </Badge>
              <div className="flex items-center text-yellow-400">
                <Star className="h-4 w-4 mr-1 fill-current" />
                <span className="text-sm">{album.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-2">{album.title}</h1>
            <h2 className="text-xl text-gray-300 mb-6">{album.artist}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{formatDate(album.releaseDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <User className="h-4 w-4" />
                <span className="text-sm">{album.artist}</span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-2xl">
              {album.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <span className="text-3xl font-bold">${album.price.toFixed(2)}</span>
            
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                className="bg-music-primary hover:bg-music-primary/90 text-white"
                disabled={!album.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                className="border-music-primary text-music-primary hover:bg-music-primary hover:text-white"
              >
                Add to Wishlist
              </Button>
            </div>
            
            {!album.inStock && (
              <span className="text-red-500 text-sm">Out of stock</span>
            )}
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Tracks</h2>
        <div className="bg-music-gray rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-black/30 text-left">
              <tr>
                <th className="py-3 px-4 font-medium">#</th>
                <th className="py-3 px-4 font-medium">Title</th>
                <th className="py-3 px-4 font-medium hidden sm:table-cell">
                  <Clock className="h-4 w-4" />
                </th>
                <th className="py-3 px-4 font-medium text-right">Preview</th>
              </tr>
            </thead>
            <tbody>
              {album.tracks.map((track, index) => (
                <tr 
                  key={track.id} 
                  className="border-t border-gray-700 hover:bg-black/20 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-400">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{track.title}</td>
                  <td className="py-3 px-4 text-gray-400 hidden sm:table-cell">{track.duration}</td>
                  <td className="py-3 px-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePlayPreview(track)}
                      className="text-music-primary hover:text-white hover:bg-music-primary/20"
                    >
                      Preview
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* You May Also Like */}
      <div>
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {mockSimilarAlbums.map(similarAlbum => (
            <Link 
              key={similarAlbum.id} 
              to={`/album/${similarAlbum.id}`}
              className="group"
            >
              <div className="bg-music-gray rounded-lg overflow-hidden transition-transform duration-200 group-hover:translate-y-[-8px]">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={similarAlbum.coverImage} 
                    alt={`${similarAlbum.title} by ${similarAlbum.artist}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium truncate group-hover:text-music-primary transition-colors">
                    {similarAlbum.title}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">{similarAlbum.artist}</p>
                  <p className="text-sm font-bold mt-2">${similarAlbum.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailPage;
