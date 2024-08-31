import React from 'react';
import { Link } from 'react-router-dom'; // If you're using react-router for navigation

interface NavItemProps {
  id: string;
  title: string;
  link: string;
  onClick?: () => void; // Optional onClick handler
}

interface NavItemsProps {
  items: NavItemProps[];
  className?: string; // Optional className prop
}

const NavItems: React.FC<NavItemsProps> = ({ items, className = '' }) => {
  // Define ids that should have the special border styling
  const specialIds = new Set(['1', '2', '3', '4']); // Use strings to match the id type

  return (
    <nav className={className}>
      <ul className="flex flex-col md:flex-row gap-x-8 gap-y-10 md:gap-x-16 z-50 bg-white">
        {items.map(({ id, title, link, onClick }) => (
          <li key={id}>
            <Link
              to={link}
              onClick={onClick}
              className={`text-lg text-green-700 hover:text-primary transition-colors tracking-wider duration-300 ease-in-out ${
                specialIds.has(id)
                  ? 'border-2 border-primary rounded-full px-4 py-2 '
                  : ''
              }`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavItems;
