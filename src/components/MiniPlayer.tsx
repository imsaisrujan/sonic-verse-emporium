
import React from 'react';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

const MiniPlayer: React.FC = () => {
  const { 
    isPlaying, 
    currentTrack,
    togglePlayPause,
    progress,
    duration,
    seekTo
  } = useAudioPlayer();

  if (!currentTrack) {
    return null;
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newPosition = (offsetX / rect.width) * duration;
    seekTo(newPosition);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-40">
      <div 
        className="audio-player-progress" 
        onClick={handleProgressClick}
      >
        <div 
          className="audio-player-progress-bar" 
          style={{ width: `${(progress / duration) * 100}%` }}
        />
      </div>

      <div className="container mx-auto audio-player-container px-4 py-3">
        <div className="flex items-center">
          <img 
            src={currentTrack.albumCover} 
            alt={`${currentTrack.title} album cover`} 
            className="h-12 w-12 object-cover mr-3"
          />
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentTrack.title}</p>
            <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <span className="text-xs text-gray-400 hidden sm:inline">
              {formatTime(progress)} / {formatTime(duration)}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-music-gray p-0"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
