import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth, db } from "../firebase";
import Swal from "sweetalert2";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Define the AuthContextProps interface
interface AuthContextProps {
  currentUser: User | null;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    username: string,
    location: string,
    phoneNumber: string,
    role: string
  ) => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Define the AuthProviderProps interface
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null); // Manage user role
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user role from Firestore
        const userDoc = doc(db, "users", user.uid); // Assume "users" is your collection
        const docSnap = await getDoc(userDoc);
        setRole(docSnap.data()?.role || null); // Assuming "role" field in user document
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Signup function
  const signup = async (
    email: string,
    password: string,
    username: string,
    location: string,
    phoneNumber: string,
    role: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: username,
        // phoneNumber: phoneNumber
      });

      // Save additional user info in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        username,
        email,
        location,
        phoneNumber,
        role,
      });

      Swal.fire({
        icon: "success",
        title: "Account created successfully!",
        timer: 1500,
      });
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Signup failed!",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Signup failed!",
          text: "An unknown error occurred.",
        });
      }
    }
  };

  // Reset Password function
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: "success",
        title: "Password reset email sent!",
        timer: 1500,
      });
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Reset failed!",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Reset failed!",
          text: "An unknown error occurred.",
        });
      }
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Fetch user role from Firestore
      const userDoc = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDoc);
      setRole(docSnap.data()?.role || null); // Assuming "role" field in user document
      setCurrentUser(user);
      Swal.fire({
        icon: "success",
        title: "Logged in successfully!",
        timer: 1500,
      });
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Login failed!",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login failed!",
          text: "An unknown error occurred.",
        });
      }
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setRole(null); // Clear role on logout
      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        timer: 1500,
      });
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Logout failed!",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Logout failed!",
          text: "An unknown error occurred.",
        });
      }
    }
  };

  // The context value passed to the provider
  const value: AuthContextProps = {
    currentUser,
    role, // Provide role in context
    login,
    logout,
    resetPassword,
    signup, // Add signup here
  };

  // Return the provider with the context value and loading state handled
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
