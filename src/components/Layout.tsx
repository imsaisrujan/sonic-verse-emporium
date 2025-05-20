
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MiniPlayer from './MiniPlayer';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-music-dark text-gray-800 dark:text-white">
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
