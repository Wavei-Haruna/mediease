// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/home/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminDashboard from './pages/admin/AdminDashboard'; // Path adjusted to match your structure
import Appointments from './pages/admin/Appointments';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import { AuthProvider } from './context/AuthContext';
import UserDashboard from './pages/user/UserDashboard';
import UserAppointments from './pages/user/Appointments';
import UserSettings from './pages/user/Settings';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-background text-text min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/*User Dashboard Routes */}
              <Route path="/customer-dashboard" element={<UserDashboard />}>
                <Route path="appointments" element={<UserAppointments />} />

                <Route path="settings" element={<UserSettings />} />
                <Route index element={<div>Welcome to the your Dashboard</div>} />
              </Route>
              
              {/*  Admin Dashboard Routes */}
              <Route path="/admin-dashboard" element={<AdminDashboard />}>
                <Route path="appointments" element={<Appointments />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                <Route index element={<div>Welcome to the Admin Dashboard</div>} />
              </Route>
              
              <Route path="*" element={<div>404 Not Found</div>} /> {/* Handle unknown routes */}
            </Routes>
          </main>
          <footer className="bg-secondary text-white py-4">
            <div className="container mx-auto text-center">
              <p className="text-body-s">&copy; 2024 My Application. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
