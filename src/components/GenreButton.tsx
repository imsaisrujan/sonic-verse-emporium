
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface GenreButtonProps {
  genre: string;
  icon?: React.ReactNode;
  className?: string;
}

const GenreButton: React.FC<GenreButtonProps> = ({ genre, icon, className }) => {
  return (
    <Link 
      to={`/browse?genre=${encodeURIComponent(genre)}`}
      className={cn(
        "flex flex-col items-center justify-center bg-music-gray hover:bg-music-gray/80 p-5 rounded-lg transition-all",
        "hover:shadow-lg hover:shadow-indigo-600/20 hover:scale-105",
        "focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-music-dark",
        className
      )}
    >
      {icon && <div className="mb-3 text-indigo-600">{icon}</div>}
      <span className="font-medium">{genre}</span>
    </Link>
  );
};

export default GenreButton;
