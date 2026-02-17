import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/skills', label: 'Skills' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-white/20 dark:border-slate-700/30 shadow-sm">
      <div className="container-custom flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-bold text-primary tracking-tight">
          MyPortfolio
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive
                    ? 'text-primary'
                    : 'text-slate-600 dark:text-slate-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun className="text-yellow-400" />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-600 dark:text-slate-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-white/20 dark:border-slate-700/30 shadow-lg animate-slide-in">
          <div className="container-custom py-4 flex flex-col space-y-3">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-base transition-colors hover:text-primary ${
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-slate-600 dark:text-slate-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 py-2 text-slate-600 dark:text-slate-300"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
              <span>Toggle theme</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;