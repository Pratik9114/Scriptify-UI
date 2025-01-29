import React, { useEffect } from 'react';
import { ArrowRight, Youtube, Zap, History, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';

const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
    >
      {children}
    </motion.div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }}
    className="p-6 bg-white dark:bg-neutral-800 rounded-lg transition-colors duration-200"
  >
    <motion.div
      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
            >
              Transform YouTube Videos into
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-red-600"
              > Concise Summaries</motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Get instant AI-powered summaries of any YouTube video. Save time and extract key insights in seconds.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-lg text-white"
              >
                Try It Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Key Features</h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInSection>
              <FeatureCard
                icon={<Zap className="h-12 w-12 text-red-600" />}
                title="Instant Summaries"
                description="Get quick summaries of any YouTube video in seconds using advanced AI technology."
              />
            </FadeInSection>
            <FadeInSection>
              <FeatureCard
                icon={<History className="h-12 w-12 text-red-600" />}
                title="History Tracking"
                description="Access your previously generated summaries anytime from your dashboard."
              />
            </FadeInSection>
            <FadeInSection>
              <FeatureCard
                icon={<Brain className="h-12 w-12 text-red-600" />}
                title="Smart Analysis"
                description="Our AI extracts key points and insights while maintaining context and accuracy."
              />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">How It Works</h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <FadeInSection>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="flex justify-center mb-4"
                >
                  <Youtube className="h-16 w-16 text-red-600" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">1. Paste YouTube URL</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Simply copy and paste the URL of any YouTube video you want to summarize.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center mb-4"
                >
                  <Zap className="h-16 w-16 text-red-600" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">2. Generate Summary</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Click generate and our AI will process the video's content.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center mb-4"
                >
                  <Brain className="h-16 w-16 text-red-600" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">3. Get Insights</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive a concise summary with key points and main takeaways.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </div>
  );
};
