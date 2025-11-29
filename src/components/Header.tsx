import { Menu, Search, Globe, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { PageType } from '../App';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({ currentPage, onNavigate, theme, onToggleTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (page: PageType) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-white dark:bg-slate-950 shadow-sm sticky top-0 z-50 transition-colors">
      {/* Top bar */}
      <div className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm">Ministry of Jal Shakti, Government of India</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm hover:text-blue-200 transition-colors">
              <Globe className="w-4 h-4" />
              <span>हिंदी</span>
            </button>
            <div className="h-4 w-px bg-blue-700" />
            <button
              type="button"
              onClick={onToggleTheme}
              className="flex items-center gap-1 text-sm hover:text-blue-200 transition-colors"
              aria-pressed={theme === 'dark'}
              aria-label="Toggle color scheme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => handleNavigation('home')}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="Government of India Emblem"
              className="h-16 w-16"
            />
            <div>
              <h1 className="text-blue-900 dark:text-white transition-colors">Central Water Commission</h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">केंद्रीय जल आयोग</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleNavigation('home')}
              className={`transition-colors ${currentPage === 'home' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('about')}
              className={`transition-colors ${currentPage === 'about' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300'}`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigation('projects')}
              className={`transition-colors ${currentPage === 'projects' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300'}`}
            >
              Projects
            </button>
            <button
              onClick={() => handleNavigation('data-reports')}
              className={`transition-colors ${currentPage === 'data-reports' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300'}`}
            >
              Data & Reports
            </button>
            <button
              onClick={() => handleNavigation('tenders')}
              className={`transition-colors ${currentPage === 'tenders' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300'}`}
            >
              Tenders
            </button>
            <button
              onClick={() => handleNavigation('contact')}
              className={`transition-colors ${currentPage === 'contact' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300'}`}
            >
              Contact
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-slate-700 pt-4 flex flex-col gap-3">
            <button
              onClick={() => handleNavigation('about')}
              className="text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigation('projects')}
              className="text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => handleNavigation('data-reports')}
              className="text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              Data & Reports
            </button>
            <button
              onClick={() => handleNavigation('tenders')}
              className="text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              Tenders
            </button>
            <button
              onClick={() => handleNavigation('contact')}
              className="text-left text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              Contact
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}