
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MiniPlayer from './MiniPlayer';
import { useTheme } from '@/context/ThemeContext';

const Layout: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-music-dark text-white' : 'bg-white text-gray-800'}`}>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <MiniPlayer />
      <Footer />
    </div>
  );
};

export default Layout;
