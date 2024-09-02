import { Home, Calendar, Users, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ${isOpen ? 'w-64' : 'w-0 md:w-64'} overflow-hidden md:relative md:w-64`}>
      <div className={`p-4 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/admin-dashboard" className="flex items-center p-4 hover:bg-gray-700">
              <Home className="w-6 h-6 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/appointments" className="flex items-center p-4 hover:bg-gray-700">
              <Calendar className="w-6 h-6 mr-3" />
              Appointments
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/users" className="flex items-center p-4 hover:bg-gray-700">
              <Users className="w-6 h-6 mr-3" />
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/settings" className="flex items-center p-4 hover:bg-gray-700">
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
