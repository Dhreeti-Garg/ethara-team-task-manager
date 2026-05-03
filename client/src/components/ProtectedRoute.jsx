// src/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;