import React from 'react';
import { Youtube, Github, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <motion.div 
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Youtube className="h-8 w-8 text-red-600" />
              <span className="text-xl font-bold text-white">Scriptify</span>
            </motion.div>
            <p className="text-gray-400">
              Transform YouTube videos into concise, readable summaries with our AI-powered tool.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Dashboard', path: '/dashboard' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: <Github />, url: 'https://github.com/Pratik9114' },
                { icon: <Twitter />, url: 'https://x.com/PratikJagd84408' },
                { icon: <Linkedin />, url: 'https://www.linkedin.com/in/pratik-jagdale-62a482297' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  whileHover={{ scale: 1.2, rotate: 5, color: "#ff0000" }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <motion.p 
            className="text-gray-400"
            whileHover={{ scale: 1.05 }}
          >
            © {new Date().getFullYear()} Scriptify. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};
