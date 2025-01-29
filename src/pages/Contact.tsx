import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export const Contact = () => {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Get in Touch</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions? We're here to help you get started with Scriptify
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mail className="h-8 w-8 text-red-500" />,
                title: "Email Us",
                info: "jagdalepratik444@gmail.com",
                description: "We'll respond within 24 hours"
              },
              {
                icon: <Phone className="h-8 w-8 text-yellow-500" />,
                title: "Call Us",
                info: "+91 9892203400",
                description: "Mon-Fri, 9am-5pm EST"
              },
              {
                icon: <MessageCircle className="h-8 w-8 text-green-500" />,
                title: "Live Chat",
                info: "Available 24/7",
                description: "Get instant support"
              }
            ].map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-neutral-800 p-6 rounded-lg text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex justify-center mb-4"
                >
                  {method.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-white">{method.title}</h3>
                <p className="text-red-400 font-medium mb-2">{method.info}</p>
                <p className="text-gray-400">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <MapPin className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Visit Our Office</h2>
            <p className="text-gray-300">
              C-80, Balu Niwas Chawl, Rajendra Nagar, Dattapada Road, Borivali East, Mumbai, Maharashtra 400066.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
