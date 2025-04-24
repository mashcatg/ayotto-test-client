import useRole from "../../hooks/useRole";
import AdminDashHome from "./AdminDashHome";
import UserDashHome from "./UserDashHome";

const DashHome = () => {
  const role = useRole();
  return (
    <>
      {role === "admin" && <AdminDashHome></AdminDashHome>}

      {role === "user" && <UserDashHome></UserDashHome>}
    </>
  );
};

export default DashHome;
