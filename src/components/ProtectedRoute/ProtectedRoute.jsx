import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // If user isnt logged in , return a Navigate comp that sends user to / (main page)
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
