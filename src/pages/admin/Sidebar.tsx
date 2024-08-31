// components/Sidebar.tsx
import { Home, Calendar, Users, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full flex-shrink-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
            <Link to="/dashboard/appointments" className="flex items-center p-4 hover:bg-gray-700">
              <Calendar className="w-6 h-6 mr-3" />
              Appointments
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users" className="flex items-center p-4 hover:bg-gray-700">
              <Users className="w-6 h-6 mr-3" />
              Users
            </Link>
          </li>
          <li>
            <Link to="/dashboard/settings" className="flex items-center p-4 hover:bg-gray-700">
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
