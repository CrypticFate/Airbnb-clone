import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchModal from './SearchModal';
// Removed AirbnbLogoIcon from this import
import { GlobeIcon, MenuIcon, UserIcon, SearchIcon } from './icons/CoreIcons';
import { useLocalization } from '../hooks/useLocalization';
import type { FilterOptions } from '../types';

interface HeaderProps {
  onFilterChange?: (filters: Partial<FilterOptions>) => void;
}

const Header: React.FC<HeaderProps> = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const { t, language, setLanguage } = useLocalization();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const handleFilterChange = (filters: Partial<FilterOptions>) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left: Logo */}
            <div className="flex-1 lg:flex">
              <button onClick={handleLogoClick} className="flex items-center hover:opacity-80 transition">
                {/* Use an img tag for your PNG logo */}
                <img 
                  src="public/images/pngwing.com.png" // <-- Change this to the path of your PNG file
                  alt="Logo"
                  className="h-8 lg:h-10 w-auto"
                />
              </button>
            </div>

            {/* Middle: Search trigger */}
            <div className="flex-1 lg:flex-none">
                <div onClick={() => setIsSearchModalOpen(true)} className="w-full lg:w-[380px] border rounded-full py-2 px-2 sm:px-4 shadow-sm hover:shadow-md transition cursor-pointer flex justify-between items-center">
                    <div className="text-sm font-semibold px-2 truncate">{t('anywhere')}</div>
                    <div className="hidden sm:block text-sm font-semibold px-3 lg:px-4 border-x">{t('any_week')}</div>
                    <div className="text-sm text-gray-500 pl-2 hidden sm:block truncate">{t('add_guests')}</div>
                    <div className="p-2 bg-[#FF385C] rounded-full text-white flex-shrink-0">
                        <SearchIcon className="h-4 w-4" />
                    </div>
                </div>
            </div>

            {/* Right: Host, Lang, Profile */}
            <div className="flex-1 flex justify-end items-center space-x-2 sm:space-x-4">
              <a href="#" className="hidden lg:block font-semibold px-4 py-2 rounded-full hover:bg-gray-100 text-sm">{t('airbnb_your_home')}</a>
              <button onClick={toggleLanguage} className="flex items-center p-2 sm:p-3 rounded-full hover:bg-gray-100 border border-gray-300 transition-colors">
                <GlobeIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                <span className="text-xs sm:text-sm font-medium">{language.toUpperCase()}</span>
              </button>
              <div className="relative" ref={profileMenuRef}>
                <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="flex items-center border rounded-full p-2 space-x-2 hover:shadow-md transition">
                  <MenuIcon className="h-5 w-5 text-gray-500" />
                  <UserIcon className="h-8 w-8 text-gray-500 bg-gray-200 rounded-full p-1" />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border py-2 text-sm z-50">
                    <a href="#" className="block px-4 py-2 font-semibold hover:bg-gray-100">Sign up</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Log in</a>
                    <div className="border-t my-2"></div>
                    <button onClick={toggleLanguage} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between">
                      <span>{t('language')} ({language === 'en' ? t('english') : t('bangla')})</span>
                      <GlobeIcon className="h-4 w-4" />
                    </button>
                    <div className="border-t my-2"></div>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">{t('airbnb_your_home')}</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">{t('help_center')}</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} onSearch={handleFilterChange} />}
    </>
  );
};

export default Header;