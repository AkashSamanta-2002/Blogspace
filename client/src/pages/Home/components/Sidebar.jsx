// import React, { useEffect } from "react";
// import { GoDot } from "react-icons/go";
// import { NavLink } from "react-router-dom";
// import { IoHomeOutline } from "react-icons/io5";
// import { LuAlignJustify } from "react-icons/lu";
// import { GrBlog } from "react-icons/gr";
// import { FaRegComments } from "react-icons/fa";
// import { FiChevronRight } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllCategoriesThunk } from "../../../store/features/category/category.thunk";

// const Button = ({ name, icon, destination }) => {
//   return (
//     <NavLink
//       to={destination}
//       className={({ isActive }) =>
//         `group flex items-center gap-3 w-full px-4 py-2.5 rounded-lg
//         transition-all duration-200
//         ${
//           isActive
//             ? "bg-primary text-primary-content shadow-sm"
//             : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
//         }`
//       }
//     >
//       <span className="text-lg">{icon}</span>

//       <span className="font-medium text-sm">
//         {name}
//       </span>

//       <FiChevronRight
//         className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
//         size={15}
//       />
//     </NavLink>
//   );
// };

// const Sidebar = () => {
//   const dispatch = useDispatch();

//   const { userProfile } = useSelector((state) => state.user);
//   const { allCategoryData } = useSelector((state) => state.category);

//   useEffect(() => {
//     dispatch(getAllCategoriesThunk());
//   }, [dispatch]);

//   return (
//     <aside className="w-64 min-h-screen bg-base-100 border-r border-base-300">
//       <div className="flex flex-col h-full px-3 py-5">

//         {/* Logo / Brand */}
//         <div className="px-3 mb-7">
//           <h2 className="text-xl font-bold text-base-content">
//             BlogSpace
//           </h2>

//           <p className="text-xs text-base-content/50 mt-1">
//             Manage your content
//           </p>
//         </div>

//         {/* Main Navigation */}
//         <div>
//           <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
//             Navigation
//           </p>

//           <div className="flex flex-col gap-1">
//             <Button
//               name="Home"
//               icon={<IoHomeOutline />}
//               destination="/"
//             />

//             {userProfile?.role?.includes("admin") && (
//               <Button
//                 name="Categories"
//                 icon={<LuAlignJustify />}
//                 destination="/category"
//               />
//             )}

//             <Button
//               name="Blogs"
//               icon={<GrBlog />}
//               destination="/blog"
//             />

//             <Button
//               name="Comments"
//               icon={<FaRegComments />}
//               destination={`/comments/${userProfile?._id}`}
//             />
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="mt-8">
//           <div className="flex items-center justify-between px-3 mb-3">
//             <p className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
//               Categories
//             </p>

//             <span className="text-xs text-base-content/40">
//               {allCategoryData?.length || 0}
//             </span>
//           </div>

//           <div className="flex flex-col gap-1">
//             {allCategoryData?.map((category) => (
//               <NavLink
//                 key={category?._id}
//                 to={`/category/${category?._id}`}
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-base-content/65 hover:bg-base-200 hover:text-base-content transition-colors"
//               >
//                 <GoDot className="text-base-content/40" size={14} />

//                 <span className="truncate">
//                   {category?.name}
//                 </span>
//               </NavLink>
//             ))}
//           </div>
//         </div>

//         {/* Bottom section */}
//         <div className="mt-auto px-3 pt-5">
//           <div className="p-3 rounded-xl bg-base-200">
//             <p className="text-xs font-medium text-base-content/70">
//               Explore
//             </p>

//             <p className="text-xs text-base-content/40 mt-1">
//               Discover articles by category.
//             </p>
//           </div>
//         </div>

//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

import React, { useEffect, useState } from "react";
import { GoDot } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { LuAlignJustify, LuMenu, LuX } from "react-icons/lu";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesThunk } from "../../../store/features/category/category.thunk";

// =====================================================
// NAVIGATION BUTTON
// =====================================================

const Button = ({ name, icon, destination, collapsed, closeMobileSidebar }) => {
  return (
    <NavLink
      to={destination}
      onClick={closeMobileSidebar}
      title={collapsed ? name : ""}
      className={({ isActive }) =>
        `group flex items-center gap-3 w-full
        px-4 py-2.5 rounded-lg
        transition-all duration-200
        ${
          isActive
            ? "bg-primary text-primary-content shadow-sm"
            : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
        }
        ${collapsed ? "justify-center px-2" : ""}
        `
      }
    >
      {/* Icon */}
      <span className="text-lg shrink-0">{icon}</span>

      {/* Name */}
      {!collapsed && (
        <span className="font-medium text-sm whitespace-nowrap">{name}</span>
      )}

      {/* Arrow */}
      {!collapsed && (
        <FiChevronRight
          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
          size={15}
        />
      )}
    </NavLink>
  );
};

// =====================================================
// SIDEBAR
// =====================================================

const Sidebar = () => {
  const dispatch = useDispatch();

  // Sidebar states
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Redux
  const { userProfile } = useSelector((state) => state.user);

  const { allCategoryData } = useSelector((state) => state.category);

  // =====================================================
  // GET CATEGORIES
  // =====================================================

  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  // =====================================================
  // CLOSE MOBILE SIDEBAR WHEN SCREEN BECOMES DESKTOP
  // =====================================================

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =====================================================
  // CLOSE MOBILE SIDEBAR
  // =====================================================

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* ================================================= */}
      {/* MOBILE MENU BUTTON */}
      {/* ================================================= */}

      <button
        onClick={() => setMobileOpen(true)}
        className="
    lg:hidden
    fixed
    top-17
    left-2
    z-40
    p-2.5
    rounded-lg
    bg-base-100
    border
    border-base-300
    shadow-sm
    hover:bg-base-200
    transition
  "
      >
        <LuMenu size={12} />
      </button>

      {/* ================================================= */}
      {/* MOBILE OVERLAY */}
      {/* ================================================= */}

      {mobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="
            lg:hidden
            fixed
            inset-0
            bg-black/40
            z-40
          "
        />
      )}

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside
        className={`
          fixed
          lg:sticky
          top-0
          left-0
          z-50

          h-screen

          bg-base-100
          border-r
          border-base-300

          transition-all
          duration-300
          ease-in-out

          ${collapsed ? "lg:w-20" : "lg:w-64"}

          w-64

          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* ================================================= */}
        {/* SIDEBAR CONTAINER */}
        {/* ================================================= */}

        <div className="flex flex-col h-full">
          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="shrink-0 px-3 py-5">
            <div
              className={`
                flex
                items-center

                ${collapsed ? "justify-center" : "justify-between px-3"}
              `}
            >
              {/* Logo */}
              {!collapsed && (
                <div>
                  <h2 className="text-xl font-bold text-base-content">
                    BlogSpace
                  </h2>

                  <p className="text-xs text-base-content/50 mt-1">
                    Manage your content
                  </p>
                </div>
              )}

              {/* Desktop Collapse Button */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="
                  hidden
                  lg:flex
                  items-center
                  justify-center
                  p-2
                  rounded-lg
                  hover:bg-base-200
                  transition
                "
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? (
                  <FiChevronRight size={18} />
                ) : (
                  <FiChevronLeft size={18} />
                )}
              </button>

              {/* Mobile Close Button */}
              <button
                onClick={closeMobileSidebar}
                className="
                  lg:hidden
                  p-2
                  rounded-lg
                  hover:bg-base-200
                "
              >
                <LuX size={20} />
              </button>
            </div>
          </div>

          {/* ================================================= */}
          {/* SCROLLABLE MIDDLE SECTION */}
          {/* ================================================= */}

          <div
            className="
              flex-1
              overflow-y-auto
              px-3
              pb-4

              scrollbar-thin
            "
          >
            {/* ================================================= */}
            {/* NAVIGATION */}
            {/* ================================================= */}

            <div>
              {!collapsed && (
                <p
                  className="
                    px-3
                    mb-2
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-base-content/40
                  "
                >
                  Navigation
                </p>
              )}

              <div className="flex flex-col gap-1">
                {/* Home */}

                <Button
                  name="Home"
                  icon={<IoHomeOutline />}
                  destination="/"
                  collapsed={collapsed}
                  closeMobileSidebar={closeMobileSidebar}
                />

                {/* Categories */}

                {userProfile?.role?.includes("admin") && (
                  <Button
                    name="Categories"
                    icon={<LuAlignJustify />}
                    destination="/category"
                    collapsed={collapsed}
                    closeMobileSidebar={closeMobileSidebar}
                  />
                )}

                {/* Blogs */}

                <Button
                  name="Blogs"
                  icon={<GrBlog />}
                  destination="/blog"
                  collapsed={collapsed}
                  closeMobileSidebar={closeMobileSidebar}
                />

                {/* Comments */}

                <Button
                  name="Comments"
                  icon={<FaRegComments />}
                  destination={`/comments/${userProfile?._id}`}
                  collapsed={collapsed}
                  closeMobileSidebar={closeMobileSidebar}
                />
              </div>
            </div>

            {/* ================================================= */}
            {/* CATEGORIES */}
            {/* ================================================= */}

            <div className="mt-8">
              {/* Expanded */}
              {!collapsed && (
                <>
                  {/* Category Header */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      px-3
                      mb-3
                    "
                  >
                    <p
                      className="
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-base-content/40
                      "
                    >
                      Categories
                    </p>

                    <span
                      className="
                        text-xs
                        text-base-content/40
                      "
                    >
                      {allCategoryData?.length || 0}
                    </span>
                  </div>

                  {/* Category List */}

                  <div className="flex flex-col gap-1">
                    {allCategoryData?.map((category) => (
                      <NavLink
                        key={category?._id}
                        to={`/category/${category?._id}`}
                        onClick={closeMobileSidebar}
                        className="
                            flex
                            items-center
                            gap-2
                            px-3
                            py-2
                            rounded-lg
                            text-sm
                            text-base-content/65
                            hover:bg-base-200
                            hover:text-base-content
                            transition-colors
                          "
                      >
                        <GoDot
                          className="
                              text-base-content/40
                              shrink-0
                            "
                          size={14}
                        />

                        <span className="truncate">{category?.name}</span>
                      </NavLink>
                    ))}
                  </div>
                </>
              )}

              {/* ================================================= */}
              {/* COLLAPSED CATEGORIES */}
              {/* ================================================= */}

              {collapsed && (
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    gap-2
                  "
                >
                  {allCategoryData?.map((category) => (
                    <NavLink
                      key={category?._id}
                      to={`/category/${category?._id}`}
                      onClick={closeMobileSidebar}
                      title={category?.name}
                      className="
                          flex
                          items-center
                          justify-center
                          w-10
                          h-10
                          rounded-lg
                          text-base-content/60
                          hover:bg-base-200
                          hover:text-base-content
                          transition-colors
                        "
                    >
                      <GoDot size={14} />
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================================================= */}
          {/* FIXED BOTTOM EXPLORE SECTION */}
          {/* ================================================= */}

          {!collapsed && (
            <div
              className="
                shrink-0
                px-3
                pb-5
                pt-3
                bg-base-100
              "
            >
              <div
                className="
                  p-3
                  rounded-xl
                  bg-base-200
                "
              >
                <p
                  className="
                    text-xs
                    font-medium
                    text-base-content/70
                  "
                >
                  Explore
                </p>

                <p
                  className="
                    text-xs
                    text-base-content/40
                    mt-1
                  "
                >
                  Discover articles by category.
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
