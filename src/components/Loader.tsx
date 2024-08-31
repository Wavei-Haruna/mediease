import React from 'react';

interface LoaderProps {
  size?: string; // Size of the loader (e.g., 'small', 'medium', 'large')
  color?: string; // Color of the loader
  className?: string; // Additional class names for customization
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', color = 'text-primary', className = '' }) => {
  // Define size classes based on the size prop
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-6',
  };

  return (
    <div
      className={`inline-block ${sizeClasses[size]} border-t-2 border-transparent border-${color} border-solid rounded-full animate-spin ${className}`}
      role="status"
    >
      {/* Optional text for screen readers */}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
