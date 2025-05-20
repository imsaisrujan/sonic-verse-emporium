
import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Music className="h-6 w-6 text-music-primary mr-2" />
              <span className="text-xl font-bold">Melody</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your premier destination for discovering and purchasing the best music albums.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-gray-400 hover:text-white transition-colors">
                  Browse Albums
                </Link>
              </li>
              <li>
                <Link to="/browse?new=true" className="text-gray-400 hover:text-white transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/browse?featured=true" className="text-gray-400 hover:text-white transition-colors">
                  Featured Albums
                </Link>
              </li>
              <li>
                <Link to="/browse?sale=true" className="text-gray-400 hover:text-white transition-colors">
                  On Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on new releases and exclusive offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-music-gray border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-music-primary"
              />
              <button
                type="submit"
                className="w-full bg-music-primary hover:bg-music-primary/90 text-white py-2 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Melody Music Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
