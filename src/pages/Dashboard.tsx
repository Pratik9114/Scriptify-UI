import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, History, Link as LinkIcon, Loader2 } from 'lucide-react';

export const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulated API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold mb-6 text-white">Video Summary Dashboard</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enter a YouTube URL to get started
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* History Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:col-span-1 bg-neutral-800 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-4">
                <History className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold text-white">History</h2>
              </div>
              <div className="space-y-4">
                {/* Placeholder history items */}
                {[1, 2, 3].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded bg-neutral-700 hover:bg-neutral-600 cursor-pointer"
                  >
                    <h3 className="font-medium text-white truncate">
                      Example Video {index + 1}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {new Date().toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="md:col-span-3 space-y-6">
              {/* URL Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-800 p-6 rounded-lg"
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      YouTube Video URL
                    </label>
                    <div className="flex space-x-4">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="flex-1 px-3 py-2 bg-neutral-700 rounded border border-neutral-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white"
                        required
                      />
                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin h-5 w-5 mr-2" />
                            Processing...
                          </>
                        ) : (
                          'Generate Summary'
                        )}
                      </motion.button>
                    </div>
                  </div>
                </form>
              </motion.div>

              {/* Summary Display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-800 p-6 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    Recent Summary
                  </h2>
                  <motion.a
                    href="#"
                    className="flex items-center text-red-500 hover:text-red-400"
                    whileHover={{ scale: 1.05 }}
                  >
                    <LinkIcon className="h-4 w-4 mr-1" />
                    View Original
                  </motion.a>
                </div>
                <p className="text-gray-300">
                  Enter a YouTube URL above to generate a summary.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};