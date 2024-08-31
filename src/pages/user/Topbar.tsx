// components/Topbar.tsx
import { FC } from 'react';
import { User, Bell, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Topbar: FC = () => {
  return (
    <div className="bg-gray-800 text-white flex justify-between items-center p-4 shadow-md">
      <h1 className="text-xl font-bold"> Dashboard</h1>
      <div className="flex items-center">
        <button className="relative mr-4">
          <Bell className="w-6 h-6" />
          {/* Add notification badge if needed */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">3</span>
        </button>
        <div className="flex items-center mr-4">
          <User className="w-6 h-6 mr-2" />
          <Link to="/profile" className="mr-4">Profile</Link>
        </div>
        <Link to="/logout" className="flex items-center">
          <LogOut className="w-6 h-6" />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
