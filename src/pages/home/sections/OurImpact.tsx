import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const impactData = [
  { label: 'Appointments', count: 12345 },
  { label: 'Users', count: 6789 },
  { label: 'Donations', count: 2345 },
  { label: 'Volunteer Hours', count: 4567 },
];

const OurImpact: React.FC = () => {
  return (
    <div className="p-6 font-helvetica-light h-[120vh] md:h-[50vh]">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Our Impact</h1>
        <p className="text-lg text-gray-700">Here’s how we’re making a difference.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {impactData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <CountUp
                start={item.count - 1000} // Starting value close to current value
                end={item.count} // End value
                duration={8} // Duration of the count-up
                separator=","
                delay={2}
                useEasing // Smooth animation
                startOnMount={true}
                className='text-3xl font-semibold text-primary'
                // Start counting when the component mounts
              />
            </motion.div>
            <h3 className="text-xl font-semibold mt-4">{item.label}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurImpact;
