import { FC } from 'react';
import { motion } from 'framer-motion';
import AboutImage from '@/assets/images/Nurse.webp';

const AboutUS: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center font-helvetica-light  p-4">
      <motion.div
        className="md:flex  justify-between items-center bg-white p-8 rounded-lg "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="md:w-1/2">
        <h1 className="text-3xl  font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-700">
          We are dedicated to improving healthcare accessibility for the Sakin community. Our team of
          professionals works tirelessly to ensure that you receive the best care and support. Our
          mission is to provide quality healthcare services and enhance the well-being of our
          community through innovative solutions and compassionate care.
        </p>
        </div>
        <motion.img
          src={AboutImage}
          alt="Nurse"
          className="h-96 rounded-lg mb-4 my-6"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
      </motion.div>
    </div>
  );
};

export default AboutUS;
