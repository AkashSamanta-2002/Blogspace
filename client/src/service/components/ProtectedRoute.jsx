import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuthenticated, screenLoading } = useSelector(
    (state) => state.user
  );

  if (screenLoading) {
    return(
      <div className="w-full h-full flex justify-center items-center">
         <span className="loading loading-spinner w-40 m-auto"></span>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;