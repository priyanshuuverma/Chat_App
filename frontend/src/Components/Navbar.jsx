import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  // Handle logout and redirect
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <header className="text-white border-b border-base-300 w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo & Home Link */}
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-white text-lg font-semibold">Chatify</h1>
          </Link>

          {/* Profile & Logout */}
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="btn btn-sm flex gap-2 items-center transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            {/* Conditionally render logout button if authUser exists */}
            {authUser && (
              <button
                className="btn btn-sm flex gap-2 items-center transition-all bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
