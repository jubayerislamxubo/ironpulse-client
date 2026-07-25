import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-emerald-400 font-semibold" : "hover:text-emerald-400"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-classes"
          className={({ isActive }) =>
            isActive ? "text-emerald-400 font-semibold" : "hover:text-emerald-400"
          }
        >
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/forum"
          className={({ isActive }) =>
            isActive ? "text-emerald-400 font-semibold" : "hover:text-emerald-400"
          }
        >
          Community Forum
        </NavLink>
      </li>
      
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-emerald-400 font-semibold" : "hover:text-emerald-400"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-slate-950 text-white px-6 py-4 flex justify-between items-center border-b border-slate-800 sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-emerald-400">
        IronPulse
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 text-sm font-medium">
        {navOptions}
      </ul>

      {/* User / Auth Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* Clickable Profile Picture & Name */}
            <Link
              to="/profile"
              className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-slate-800 transition-all duration-200"
              title="View Profile"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-emerald-400"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                  {user?.displayName?.charAt(0) || "U"}
                </div>
              )}
              <span className="text-xs font-semibold hover:text-emerald-400">
                {user?.displayName || "User"}
              </span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogOut}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded transition duration-200 font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-4 py-2 rounded font-semibold transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;