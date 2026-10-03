import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../../../store/features/user/user.thunk";
import { IoLogIn, IoSearchOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const { isAuthenticated, userProfile } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  const handleSearch = (e) => {
    navigate(`/blog/search?q=${e.target.value}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-base-100 border-b border-base-300">
      <div className="navbar min-h-16 px-4 lg:px-6">

        {/* Logo */}
        <div className="flex-1">
          <NavLink
            to="/"
            className="flex items-center gap-2 w-fit group"
          >
            {/* Logo Icon */}
            <div
              className="
                flex items-center justify-center
                h-9 w-9
                rounded-lg
                bg-primary
                text-primary-content
                font-black
                text-xl
                shadow-sm
                group-hover:scale-105
                transition-transform
              "
            >
              B
            </div>

            {/* Logo Text */}
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight">
                BlogSpace
              </span>

              <span className="text-[9px] uppercase tracking-[0.2em] text-base-content/40">
                Write. Share. Discover.
              </span>
            </div>
          </NavLink>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">

            {/* Search */}
            <div className="hidden sm:flex items-center">
              <label
                className="
                  input input-sm
                  w-48 md:w-64
                  bg-base-200
                  border-none
                  focus-within:outline-none
                  focus-within:ring-1
                  focus-within:ring-primary/30
                "
              >
                <IoSearchOutline
                  size={18}
                  className="text-base-content/40"
                />

                <input
                  type="text"
                  placeholder="Search blogs..."
                  onChange={handleSearch}
                />
              </label>
            </div>

            {/* Create Blog */}
            <NavLink
              to="/blog/add"
              className="
                hidden md:flex
                items-center gap-2
                btn btn-primary btn-sm
                rounded-lg
              "
            >
              <FaPlus size={12} />
              Create Blog
            </NavLink>

            {/* User Dropdown */}
            <div className="dropdown dropdown-end">

              <div
                tabIndex={0}
                role="button"
                className="
                  flex items-center gap-2
                  cursor-pointer
                  rounded-lg
                  px-2 py-1.5
                  hover:bg-base-200
                  transition-colors
                "
              >
                {/* Avatar */}
                <div className="avatar">
                  <div className="w-9 rounded-full ring-1 ring-base-300">
                    <img
                      src={
                        userProfile?.avatar ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt={userProfile?.name || "User"}
                    />
                  </div>
                </div>

                {/* User Name */}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold leading-tight">
                    {userProfile?.name || "User"}
                  </p>

                  <p className="text-[11px] text-base-content/50 capitalize">
                    {userProfile?.role || "Member"}
                  </p>
                </div>

                {/* Arrow */}
                <span className="text-xs text-base-content/40">
                  ▾
                </span>
              </div>

              {/* Dropdown */}
              <ul
                tabIndex="-1"
                className="
                  menu menu-sm
                  dropdown-content
                  bg-base-100
                  rounded-xl
                  z-50
                  mt-3
                  w-56
                  p-2
                  shadow-xl
                  border border-base-200
                "
              >

                {/* User Info */}
                <li className="mb-1 pointer-events-none">
                  <div className="flex flex-col items-start px-3 py-2">
                    <span className="font-semibold text-sm">
                      {userProfile?.name}
                    </span>

                    <span className="text-xs text-base-content/50">
                      {userProfile?.email}
                    </span>
                  </div>
                </li>

                <div className="divider my-0"></div>

                {/* Profile */}
                <li>
                  <NavLink
                    to="/profile"
                    className="flex items-center gap-2"
                  >
                    <CiUser size={18} />
                    <span>Profile</span>
                  </NavLink>
                </li>

                {/* Create Blog */}
                <li>
                  <NavLink
                    to="/blog/add"
                    className="flex items-center gap-2"
                  >
                    <FaPlus size={14} />
                    <span>Create Blog</span>
                  </NavLink>
                </li>

                <div className="divider my-0"></div>

                {/* Logout */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-error"
                  >
                    <CiLogout size={18} />
                    <span>Logout</span>
                  </button>
                </li>

              </ul>
            </div>
          </div>
        ) : (
          /* Sign In */
          <button
            className="btn btn-primary btn-sm rounded-lg"
            onClick={() => navigate("/login")}
          >
            Sign In
            <IoLogIn size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;