import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Home/layout/Layout";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import Profile from "./pages/components/Profile";
import ProtectedRoute from "./service/components/ProtectedRoute";
import Category from "./pages/admin/Category";
import AddCategory from "./pages/admin/AddCategory";
import EditCategory from "./pages/admin/EditCategory";
import Blogs from "./pages/blog/Blogs";
import AddBlog from "./pages/blog/AddBlog";
import EditBlog from "./pages/blog/EditBlog";
import BlogDetail from "./pages/blog/BlogDetail";
import Index from "./pages/Home/Index";
import BlogByCategory from "./pages/blog/BlogByCategory";
import UserComment from "./pages/blog/UserComment";
import SearchResult from "./pages/blog/SearchResult";

function App() {
  const user = useSelector((state) => state.user);
  const category = useSelector((state) => state.category);

  if (user.screenLoading || category.screenLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl shadow-lg bg-white">
          <span className="loading loading-spinner loading-lg text-info"></span>
          <p className="text-gray-600 font-medium animate-pulse">
            Loading blog...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />}></Route>
              <Route path="category/:id" element={<BlogByCategory />} />

            <Route element={<ProtectedRoute />}>
              {/* User Profile Route */}
              <Route path="profile" element={<Profile />} />

              {/* Category Routes */}
              <Route path="category" element={<Category />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="edit-category/:id" element={<EditCategory />} />

              {/* Blog Routes */}
              <Route path="/blog" element={<Blogs />} />
              <Route path="/blog/add" element={<AddBlog />} />
              <Route path="/blog/edit/:id" element={<EditBlog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/blog/search" element={<SearchResult />} />

              {/* Comment Route */}
              <Route path="/comments/:id" element={<UserComment />} />
            </Route>
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
