import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Menu, X, LogIn, UserPlus, Sun, Moon, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthModal } from './AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Youtube className="h-8 w-8 text-red-600" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl font-bold dark:text-white"
                whileHover={{ color: "#ff0000" }}
              >Scriptify</motion.span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </motion.button>

            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-900 dark:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <User className="h-5 w-5" />
                  <span>{user.email}</span>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5"
                    >
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => {
                    setAuthType('login');
                    setShowAuthModal(true);
                  }}
                  className="flex items-center space-x-2 text-gray-900 dark:text-white hover:text-red-500 dark:hover:text-red-500"
                  whileHover={{ scale: 1.05 }}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </motion.button>
                <motion.button
                  onClick={() => {
                    setAuthType('signup');
                    setShowAuthModal(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        type={authType}
        onSuccess={() => {
          setShowAuthModal(false);
          if (authType === 'signup') {
            setAuthType('login');
            setShowAuthModal(true);
          }
        }}
      />
    </nav>
  );
};
