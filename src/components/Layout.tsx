import React from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
