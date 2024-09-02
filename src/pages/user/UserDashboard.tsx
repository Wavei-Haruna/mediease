// components/UserDashboard.tsx
import { FC, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';
import { FaX } from 'react-icons/fa6'; // Import the close icon
import { Menu } from 'lucide-react'; // Import the menu icon

const UserDashboard: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen relative">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Topbar />
        <button 
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-full"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaX size={24} /> : <Menu size={24} />}
        </button>
        <main className="flex-1 p-4 bg-gray-100">
          <Outlet /> {/* Renders nested routes */}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
