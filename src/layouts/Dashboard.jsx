import { BookOpenCheck, CirclePlus, House, Logs, NotebookText, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { BsDatabaseGear } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { TbLogs } from "react-icons/tb";
import { TiUserAddOutline } from "react-icons/ti";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import AdminSidebar from "../components/AdminSidebar";
import DashboardNav from "../components/DashboardNav";
import Sidebar from "../components/Sidebar";
import SidebarBottom from "../components/SidebarBottom";
import useRole from "../hooks/useRole";
import { PiExamThin } from "react-icons/pi";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = useRole();
  const [sidebar, setSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      if (role === "admin") {
        navigate("/dashboard/admin-dashboard");
      } else if (role === "user") {
        navigate("/dashboard/student-dashboard");
      }
    }
  }, [role, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Custom NavLink wrapper with active styles
  const SidebarNavLink = ({ to, children }) => {
    return (
      <NavLink
        to={to}
        onClick={() => setSidebar(false)}
        className={({ isActive }) =>
          `p-4 rounded-xl duration-300 flex  items-center gap-2 ${isActive ? "bg-primary/10 text-primary font-medium" : "text-[#14213d] hover:text-primary hover:bg-primary/5"
          }`
        }
      >
        {children}
      </NavLink>
    );
  };

  return (
    <div>
      <div className="flex bg-[#FAFAFC] min-h-screen">
        <div className={`hidden lg:block ${role === "admin" ? "min-w-[250px]" : "min-w-[150px]"}`}></div>

        {/* Sidebar for larger screens */}
        <div className={`hidden fixed lg:block bg-white ${role === "admin" ? "min-w-[250px]" : "min-w-[150px]"}`}>
          {role === "admin" && <AdminSidebar />}
          {role === "user" && <Sidebar />}
        </div>

        {/* Main content area */}
        <div className="flex-grow max-w-[1320px] mx-auto">
          <div className="bg-[#FAFAFC] px-6 sm:px-14 sticky z-20 top-0 left-0 right-0 min-h-[100px]">
            <DashboardNav sidebar={sidebar} setSidebar={setSidebar} />
          </div>
          <div className={`px-6 sm:px-14 ${role === "user" ? "min-h-dvh" : ""}`}>
            <Outlet />
          </div>
          {role === "user" && (
            <div className="lg:hidden sticky z-10 bottom-0 left-0 right-0 bg-white shadow-lg">
              <SidebarBottom />
            </div>
          )}
        </div>
      </div>

      {/* Sidebar for small screens */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-screen w-64 bg-white overflow-y-scroll shadow-lg z-30 transform transition-transform duration-500 ease-in-out ${sidebar ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}
      >
        <div className="p-6">
          <Link to="/" className="block mb-8" onClick={() => setSidebar(false)}>
            <img src={logo} className="w-24 h-auto" alt="Logo" />
          </Link>

          <ul className="space-y-4">
            {role === "admin" && (
              <>
                <SidebarNavLink to="">
                  <House className="size-5" />
                  <span className="text-xs">Dashboard</span>
                </SidebarNavLink>
                <SidebarNavLink to="create-questions">
                  <CirclePlus className="size-5" />
                  <span className="text-xs">Create Questions</span>
                </SidebarNavLink>
                <SidebarNavLink to="manage-questions">
                  <BsDatabaseGear className="size-5" />
                  <span className="text-xs">Manage Questions</span>
                </SidebarNavLink>
                <SidebarNavLink to="ManageStudents">
                  <User className="size-5" />
                  <span className="text-xs">Manage Student</span>
                </SidebarNavLink>
                <SidebarNavLink to="quizzes">
                  <NotebookText className="size-5" />
                  <span className="text-xs">Quizzes</span>
                </SidebarNavLink>
                <SidebarNavLink to="admins-logs">
                  <Logs className="size-5" />
                  <span className="text-xs">Admins Logs</span>
                </SidebarNavLink>
                <SidebarNavLink to="create-admin">
                  <TiUserAddOutline className="size-5" />
                  <span className="text-xs">Create Admin</span>
                </SidebarNavLink>
                <SidebarNavLink to="allAdmins">
                  <RiAdminFill className="size-5" />
                  <span className="text-xs">All Admins</span>
                </SidebarNavLink>
                <SidebarNavLink to="logs">
                  <TbLogs className="size-5" />
                  <span className="text-xs">Logs</span>
                </SidebarNavLink>
                <SidebarNavLink to="transactions">
                  <AiOutlineDollar className="size-5" />
                  <span className="text-xs">Transactions</span>
                </SidebarNavLink>
                <SidebarNavLink to="category">
                  <MdOutlineCategory className="size-5" />
                  <span className="text-xs">Category</span>
                </SidebarNavLink>
                <SidebarNavLink to="configs">
                  <Settings className="size-5" />
                  <span className="text-xs">Configs</span>
                </SidebarNavLink>
              </>
            )}
            {role === "user" && (
              <>
                <SidebarNavLink to="student-dashboard">
                  <House className="size-5" />
                  <span className="text-xs">Home</span>
                </SidebarNavLink>
                <SidebarNavLink to="rapidRead">
                  <BookOpenCheck className="size-5" />
                  <span className="text-xs">Rapid Read</span>
                </SidebarNavLink>
                <SidebarNavLink to="tasks">
                  <NotebookText className="size-5" />
                  <span className="text-xs">Tasks</span>
                </SidebarNavLink>
                <SidebarNavLink to="leaderboard">
                  <RiAdminFill className="size-5" />
                  <span className="text-xs">Leaderboard</span>
                </SidebarNavLink>
                <SidebarNavLink to="settings">
                  <Settings className="size-5" />
                  <span className="text-xs">Settings</span>
                </SidebarNavLink>
                <SidebarNavLink to="mock-test">
                  <PiExamThin className="size-5" />
                  <span className="text-xs">Mock Test</span>
                </SidebarNavLink>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Overlay for small screens */}
      {sidebar && <div className="fixed inset-0 bg-primary/10 bg-opacity-50 z-20 md:hidden" onClick={() => setSidebar(false)}></div>}
    </div>
  );
};

export default Dashboard;
