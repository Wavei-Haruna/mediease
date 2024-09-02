// src/components/NavBar.tsx
import React, { useState } from 'react';
import NavItems from '../utils/NavItems'; // Adjust the import path as necessary
import Logo from '../assets/images/logo.png';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, role, logout } = useAuth(); // Access role from context
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const authItems = currentUser
    ? [
        { id: '1', title: 'Dashboard', link: role === 'admin' ? '/admin-dashboard' : '/customer-dashboard' },
        { id: '2', title: 'Sign Out', link: '#', onClick: handleSignOut },
      ]
    : [
        { id: '3', title: 'Login', link: '/login' },
        { id: '4', title: 'Sign Up', link: '/signup' },
      ];

  const generalItems = [
    { id: '5', title: 'Welcome Sakin community ', link: '/' },
    // { id: '6', title: 'Impact', link: '/impact' },
  ];

  return (
    <div className="w-full fixed z-50 h-16 flex items-center font-semibold text-lg justify-between px-6 md:px-24 py-4 bg-white mb-6 shadow-md">
      <img src={Logo} alt="Logo" className="h-10" />
      <div className="hidden md:flex justify-between w-1/2">
        <NavItems items={generalItems} className='text-xl  font-helvetica-light '/>
        <NavItems items={authItems} className="" />
      </div>
      <div className="md:hidden flex items-center">
        <Menu className="text-black cursor-pointer" size={24} onClick={() => setMenuOpen(!menuOpen)} />
      </div>
      <div className={`nav-menu md:hidden block z-50 ${menuOpen ? 'active open' : ''}`}>
        <NavItems items={generalItems}  />
        <NavItems items={authItems} className="my-6" />
      </div>
    </div>
  );
};

export default Navbar;
