
import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  albumCover: string;
}

interface AudioPlayerContextType {
  isPlaying: boolean;
  currentTrack: Track | null;
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  progress: number;
  duration: number;
  seekTo: (value: number) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      if (audio) {
        setProgress(audio.currentTime);
      }
    };
    
    const handleLoadedMetadata = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  const playTrack = (track: Track) => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    if (currentTrack && currentTrack.id === track.id) {
      // Toggle play/pause for the same track
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      // Play a different track
      audio.pause();
      audio.src = track.audioUrl;
      audio.load();
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setCurrentTrack(track);
        })
        .catch(error => {
          console.error("Error playing audio:", error);
        });
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentTrack) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  const seekTo = (value: number) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const value = {
    isPlaying,
    currentTrack,
    playTrack,
    togglePlayPause,
    progress,
    duration,
    seekTo,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  
  return context;
};
