
import React from 'react';
import AlbumCard from './AlbumCard';

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

interface AlbumGridProps {
  albums: Album[];
  onAddToCart: (albumId: string) => void;
  emptyMessage?: string;
}

const AlbumGrid: React.FC<AlbumGridProps> = ({ 
  albums, 
  onAddToCart, 
  emptyMessage = "No albums found" 
}) => {
  if (albums.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="album-grid">
      {albums.map(album => (
        <AlbumCard 
          key={album.id} 
          album={album} 
          onAddToCart={onAddToCart} 
        />
      ))}
    </div>
  );
};

export default AlbumGrid;
