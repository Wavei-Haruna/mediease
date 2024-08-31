// HeroHeading.tsx
import React from 'react';

interface HeroHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const HeroHeading: React.FC<HeroHeadingProps> = ({ children, className = '' }) => {
  return (
    <h1
      className={`text-[128px] opacity-90 text-left font-helvetica-light bg-gradient-to-r from-primary via-secondary to-secondary bg-clip-text text-transparent tracking-tighter ${className}`}
    >
      {children}
    </h1>
  );
};

export default HeroHeading;
