import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Sigma } from 'lucide-react';
import { APP_VERSION } from '../config/version';
import { useLanguage } from '../hooks/useLanguage';
import { buildShapes } from '../config/shapesList';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const [isFormulasOpen, setIsFormulasOpen] = React.useState(false);
  const location = useLocation();
  const { t, language, languages, changeLanguage } = useLanguage();
  const safeT = t || { nav: { home: 'Home', about: 'About' } };

  const shapeLinks = useMemo(() => buildShapes(safeT).map(s => ({ id: s.id, name: s.title })), [safeT]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl hover:text-blue-100 transition-colors">
            <span className="text-2xl">✨</span>
            <div className="flex flex-col">
              <span>FABUS 2D Şekil Üreteci</span>
              <span className="text-xs text-blue-200 font-normal">v{APP_VERSION}</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`transition-colors ${
                isActive('/') ? 'text-white font-semibold border-b-2 border-white' : 'hover:text-blue-100'
              }`}
            >
              {safeT.nav.home}
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                isActive('/about') ? 'text-white font-semibold border-b-2 border-white' : 'hover:text-blue-100'
              }`}
            >
              {safeT.nav.about}
            </Link>

            {/* Formulas Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFormulasOpen(!isFormulasOpen)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-white/20 rounded transition-colors"
              >
                <Sigma size={18} />
                <span>Şekiller</span>
              </button>
              {isFormulasOpen && (
                <div className="absolute right-0 mt-2 bg-blue-800 rounded-lg shadow-lg overflow-hidden z-50 w-64">
                  <div className="max-h-[40vh] overflow-y-auto">
                    {shapeLinks.map((s) => (
                      <Link
                        key={s.id}
                        to={`/#${s.id}`}
                        onClick={() => setIsFormulasOpen(false)}
                        className="block px-4 py-2 hover:bg-blue-700 transition-colors text-sm"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 px-3 py-2 hover:bg-white/20 rounded transition-colors"
              >
                <Globe size={18} />
                <span>{languages[language].flag}</span>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 bg-blue-800 rounded-lg shadow-lg overflow-hidden z-50">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      onClick={() => {
                        changeLanguage(code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-blue-700 transition-colors flex items-center gap-2 ${
                        language === code ? 'bg-blue-900 font-semibold' : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/20 rounded transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in">
            <Link
              to="/"
              className={`block px-4 py-2 rounded transition-colors ${
                isActive('/') ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {safeT.nav.home}
            </Link>
            <Link
              to="/about"
              className={`block px-4 py-2 rounded transition-colors ${
                isActive('/about') ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {safeT.nav.about}
            </Link>
            <div className="border-t border-white/20 pt-2 mt-2">
              <div className="px-4 py-2 text-sm font-semibold text-blue-200">Dil / Language / Sprache</div>
              {Object.entries(languages).map(([code, lang]) => (
                <button
                  key={code}
                  onClick={() => {
                    changeLanguage(code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded transition-colors flex items-center gap-2 ${
                    language === code ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
              <div className="px-4 py-2 text-sm font-semibold text-blue-200 mt-2">Şekiller</div>
              <div className="max-h-[40vh] overflow-y-auto">
                {shapeLinks.map((s) => (
                  <Link
                    key={s.id}
                    to={`/#${s.id}`}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 rounded transition-colors hover:bg-white/10 text-sm"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
