// src/pages/Login.tsx
import { useAuth } from "../context/AuthContext";
import PrimaryButton from "../components/PrimaryButton";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"; // Ensure you have the Loader component imported

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loader state
  const { login, resetPassword, role } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      await login(email, password);
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "customer") {
        navigate("/customer-dashboard");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Role not found!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed!",
        text: "An error occurred during login.",
      });
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const handleResetPassword = () => {
    if (email) {
      resetPassword(email);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Enter your email first",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-primary">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-text mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition duration-300"
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-text mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition duration-300"
              required
            />
          </div>
          <PrimaryButton className="w-full py-3 text-lg font-semibold">
            Login
          </PrimaryButton>
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
              onClick={handleResetPassword}
            >
              Forgot Password?
            </button>
          </div>
        </form>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
