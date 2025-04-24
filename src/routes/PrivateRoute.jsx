import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
 
    return <Loading></Loading>;
  }

  if (user && !loading) {
    // console.log({user, loading })
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
