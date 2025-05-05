import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import { AuthContext } from "../context/AuthContext";
import Switch from "./Switch";

const Navbar = () => {
  const { currentUser, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle dropdown
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <nav className="flex w-full flex-wrap items-center justify-between bg-neutral-100 dark:bg-gray-900 py-3 px-6 shadow-lg fixed top-0 z-20 dark:text-neutral-200">
        <Link className="text-2xl font-semibold" to="/">
          Movie App
        </Link>

        <div className="relative flex items-center gap-3" ref={menuRef}>
          {currentUser && (
            <h5 className="mr-2 capitalize">
              Hello, {currentUser.displayName}
            </h5>
          )}
          <Switch />

          <div className="relative">
            <img
              src={currentUser?.photoURL || avatar}
              className="rounded-full cursor-pointer"
              style={{ height: 32, width: 32 }}
              alt="User avatar"
              onClick={toggleMenu}
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            {menuOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-700 border rounded-lg shadow-lg z-50">
                {currentUser ? (
                  <li
                    onClick={() => {
                      logOut();
                      setMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/30 cursor-pointer"
                  >
                    Logout
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/register"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/30"
                      >
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/30"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </nav>
      <div className="h-[60px]"></div>
    </div>
  );
};

export default Navbar;
