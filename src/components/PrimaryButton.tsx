import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Updated type to accept event argument
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className = '', onClick }) => {
  return (
    <button
      className={`flex items-center font-normal text-lg justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white transition-transform duration-300 ease-in-out transform hover:scale-x-110 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
