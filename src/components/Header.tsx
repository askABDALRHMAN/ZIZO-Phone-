import React, { useState } from 'react';
import { Button } from './ui/button';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useStore } from '../contexts/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { cart, favorites, isAdmin, logout } = useStore();

  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <header className="glass-effect sticky top-0 z-50  transition-smooth" style={{  border:"none" } }>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          <div className="flex items-center space-x-3">
            {/* <div className="w-10 h-10 rounded-full button-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div> */}
            <h1 className="text-xl font-display font-semibold text-foreground">
              {t('hero.title')}
            </h1>
          </div>

          {/* Navigation (desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('hero')} className=" hover-for-links ml-10 nav-link">
              {t('nav.home')}
            </button>
            <button onClick={() => scrollToSection('products')} className="nav-link hover-for-links">
              {t('nav.products')}
            </button>
            <button onClick={() => scrollToSection('about')} className="nav-link hover-for-links">
              {t('nav.about')}
            </button>
            <button onClick={() => scrollToSection('faq')} className="nav-link hover-for-links">
              {t('nav.FAQ')}
            </button>
            <button onClick={() => scrollToSection('reviews')} className="nav-link hover-for-links">
              {t('nav.reviews')}
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link hover-for-links">
              {t('nav.contact')}
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover-for-button">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="hover-for-button"
            >
              <Globe className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover-for-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 flex flex-col space-y-4 p-6 rounded-2xl bg-gradient-to-br from-primary/90 to-primary/70 shadow-lg backdrop-blur-lg"
            >
              <button onClick={() => scrollToSection('hero')} className="nav-link text-lg text-white">
                {t('nav.home')}
              </button>
              <button onClick={() => scrollToSection('products')} className="nav-link text-lg text-white">
                {t('nav.products')}
              </button>
              <button onClick={() => scrollToSection('about')} className="nav-link text-lg text-white">
                {t('nav.about')}
              </button>
              <button onClick={() => scrollToSection('faq')} className="nav-link text-lg text-white">
              {t('nav.FAQ')}
              </button>
              <button onClick={() => scrollToSection('reviews')} className="nav-link text-lg text-white">
              {t('nav.reviews')}
              </button>
              <button onClick={() => scrollToSection('contact')} className="nav-link text-lg text-white">
                {t('nav.contact')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
