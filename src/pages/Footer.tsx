import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b mx-0 relative from-primary to-secondary  w-screen via-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
            <p className="text-lg mb-1">Location: Kumasi AAMUSTED, GHANA</p>
            <p className="text-lg mb-4">Phone: +233 24 870 4114</p>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <a href="https://facebook.com" className="text-white hover:text-gray-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-gray-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-gray-300">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-gray-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <p className="text-lg mb-2">
              <a href="/policy" className="hover:underline">Privacy Policy</a>
            </p>
            <p className="text-lg">
              &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
