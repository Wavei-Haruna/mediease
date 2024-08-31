// components/UserDashboard.tsx
import { FC } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

const UserDashboard: FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-4 bg-gray-100">
          <Outlet /> {/* Renders nested routes */}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;