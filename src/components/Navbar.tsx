
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, User, Search, Music, Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { totalQuantity } = useCart();
  
  // Mock authentication state (replace with actual auth state)
  const isAuthenticated = false;
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-black py-4 px-6 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Music className="h-6 w-6 text-indigo-600 mr-2" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">Melody</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 dark:text-gray-200">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link to="/browse" className="hover:text-indigo-600 transition-colors">
              Browse
            </Link>
            <Link to="/new-releases" className="hover:text-indigo-600 transition-colors">
              New Releases
            </Link>
          </div>

          {/* Search - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search albums, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-gray-100 dark:bg-music-gray border-none focus:ring-indigo-600 focus-visible:ring-indigo-600"
              />
            </div>
            <Button type="submit" variant="ghost" className="ml-2">
              Search
            </Button>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            <ThemeToggle />
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-white hover:text-indigo-600 transition-colors" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <Link to="/profile">
                <User className="h-6 w-6 text-gray-700 dark:text-white hover:text-indigo-600 transition-colors" />
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-800">
                  Login
                </Button>
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700 dark:text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-gray-100 dark:bg-music-gray rounded-lg">
            <form onSubmit={handleSearch} className="px-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search albums, artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white dark:bg-black border-none"
                />
              </div>
            </form>
            <div className="flex flex-col space-y-3 px-4 text-gray-700 dark:text-gray-200">
              <Link 
                to="/" 
                className="py-2 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/browse" 
                className="py-2 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>
              <Link 
                to="/new-releases" 
                className="py-2 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                New Releases
              </Link>
              {!isAuthenticated && (
                <Link 
                  to="/register" 
                  className="py-2 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
