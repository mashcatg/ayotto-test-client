import { BookOpenCheck, CirclePlus, House, Logs, NotebookText, Settings, User } from "lucide-react";
import { AiOutlineDollar } from "react-icons/ai";
import { TiUserAddOutline } from "react-icons/ti";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { RiAdminFill } from "react-icons/ri";
import { CiShuffle } from "react-icons/ci";
import { TbLogs } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { BsDatabaseGear } from "react-icons/bs";

const AdminSidebar = () => {
  return (
    <>
      <div className="dashboard-side-nav overflow-y-scroll h-screen pt-5 min-h-screen flex flex-col items-center justify-between">
        <Link to="/">
          <img src={logo} className="max-w-26 mx-auto" alt="Logo" />
        </Link>

        <ul>
          <li>
            <NavLink to="admin-dashboard" className="p-4 rounded-xl text-[#14213d] hover:text-primary duration-300 flex items-center gap-2">
              <House className="size-5" />

              <span className="text-xs">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="create-questions" className="p-4 rounded-xl text-[#14213d] hover:text-primary duration-300 flex items-center gap-2">
              <CirclePlus className="size-5" />

              <span className="text-xs">Create Questions</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="manage-questions" className="p-4 rounded-xl text-[#14213d] hover:text-primary duration-300 flex items-center gap-2">
              <BsDatabaseGear className="size-5" />

              <span className="text-xs">Manage Questions</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="ManageStudents" className="p-4 rounded-xl text-[#14213d] hover:text-primary duration-300 flex items-center gap-2">
              <User className="size-5" />

              <span className="text-xs">Manage Student</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="quizzes" className="p-4 rounded-xl text-[#14213d] hover:text-primary duration-300 flex items-center gap-2">
              <NotebookText className="size-5" />

              <span className="text-xs">Quizzes</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="admins-logs" className="p-4 rounded-xl text-[#14213d] hover:text-primary duration-300 flex items-center gap-2">
              <Logs className="size-5" />

              <span className="text-xs">Admins Logs</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="create-admin" className="p-4 rounded-xl text-[#14213d] hover:text-primary duration-300 flex items-center gap-2">
              <TiUserAddOutline className="size-5" />

              <span className="text-xs">Create Admin</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="allAdmins" className="p-4 rounded-xl text-[#14213d] hover:text-primary duration-300 flex items-center gap-2">
              <RiAdminFill className="size-5" />

              <span className="text-xs">All Admins</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="logs" className="p-4 rounded-xl text-[#14213d] hover:text-primary duration-300 flex items-center gap-2">
              <TbLogs className="size-5" />

              <span className="text-xs">Logs</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="transactions" className="p-4 rounded-xl text-[#14213d] hover:text-primary duration-300 flex items-center gap-2">
              <AiOutlineDollar className="size-5" />

              <span className="text-xs">Transactions</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="category" className="p-4 rounded-xl text-[#14213d] hover:text-primary duration-300 flex items-center gap-2">
              <MdOutlineCategory className="size-5" />

              <span className="text-xs">Category</span>
            </NavLink>
          </li>
        </ul>

        <div className="pb-8">
          <NavLink to="configs" className="p-4 rounded-xl text-[#14213d] hover:text-primary duration-300 flex items-center gap-2">
            <Settings className="size-5" />

            <span className="text-xs">Configs</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
