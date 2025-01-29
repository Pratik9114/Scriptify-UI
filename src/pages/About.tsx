import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Award, Users, Globe, Zap, Brain, Shield } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">About Scriptify</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transforming the way you consume video content through AI-powered summaries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-red-500" />,
                title: "AI-Powered",
                description: "Advanced machine learning algorithms for accurate summaries"
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-500" />,
                title: "Lightning Fast",
                description: "Get summaries in seconds, not minutes"
              },
              {
                icon: <Shield className="h-8 w-8 text-green-500" />,
                title: "Secure & Private",
                description: "Your data is always protected and private"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-neutral-800 p-6 rounded-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're on a mission to make knowledge more accessible by transforming long-form video content into concise, actionable insights.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
