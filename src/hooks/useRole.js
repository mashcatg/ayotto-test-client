import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  // console.log(user);
  const [userRole, setUserRole] = useState("");
// console.log(user);
  useEffect(() => {
    if (user) {

      setUserRole(user.role);
    }
  }, [user]);

  return userRole;
};

export default useRole;
