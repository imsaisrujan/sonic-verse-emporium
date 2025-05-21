
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Toggle
      pressed={theme === 'dark'}
      onPressedChange={toggleTheme}
      aria-label="Toggle theme"
      className={`hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md transition-colors ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
      }`}
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-600" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
