import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const user = Cookies.get("user");
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
