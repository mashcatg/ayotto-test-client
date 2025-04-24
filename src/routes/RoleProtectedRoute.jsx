/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const RoleProtectedRoute = ({ role: currentRole, children }) => {
  const { user, loading } = useAuth();
  const role = useRole();
  const navigate = useNavigate();

  if (loading || !role) {
    return <Loading></Loading>;
  }

  if (user && role === currentRole) {
    return children;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <div className="text-center mb-6">
          {/* Lock Icon */}
          <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Unauthorized Access</h1>
          <p className="text-gray-600 mb-6">You don&apos;t have permission to view this page</p>

          <div className="border-t flex flex-col sm:flex-row items-center justify-center gap-4 border-gray-200 pt-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded-xl transition duration-200" onClick={() => navigate(-1)}>
              Go Back
            </button>
            <button
              className="bg-white hover:bg-gray-100 text-gray-700 font-medium py-2 px-5 rounded-xl border border-gray-300 transition duration-200"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default RoleProtectedRoute;
