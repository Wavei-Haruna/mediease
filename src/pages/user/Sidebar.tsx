// components/Sidebar.tsx
import { FC } from 'react';
import { Home, Calendar, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen z-50 bg-gray-800 text-white transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-[185px]`}
    >
      <div className="p-4">
        {/* Add logo or title here if needed */}
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard" className="flex items-center p-4 hover:bg-gray-700">
              <Home className="w-6 h-6 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/customer-dashboard/appointments" className="flex items-center p-4 hover:bg-gray-700">
              <Calendar className="w-6 h-6 mr-3" />
              Appointments
            </Link>
          </li>
          <li>
            <Link to="/customer-dashboard/settings" className="flex items-center p-4 hover:bg-gray-700">
              <Settings className="w-6 h-6 mr-3" />
              Settings
            </Link>
          </li>
          <li>
            <Link to="/logout" className="flex items-center p-4 hover:bg-gray-700">
              <LogOut className="w-6 h-6 mr-3" />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
