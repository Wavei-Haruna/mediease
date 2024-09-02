import React from 'react';
import Hero from './sections/Hero';
import AboutUS from './sections/AboutUS';
import OurImpact from './sections/OurImpact';

const Home: React.FC = () => {
  return (
    <main className='container mx-auto'>
   <Hero/>
   <AboutUS/>
   <OurImpact/> 
    </main>
  );
};

export default Home;
