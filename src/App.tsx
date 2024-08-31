import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/home/Home';
import Login from './components/Login';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './components/SignUp';

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

              {/* <Route path="/dashboard" element={
                <PrivateRoute>
                
                </PrivateRoute>
              } /> */}
              {/* Add other routes here */}
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
