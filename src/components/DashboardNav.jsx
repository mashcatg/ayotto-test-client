import { BellDot, LogOut, Settings, UserRound } from "lucide-react";
import { PiNewspaperLight } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CiMenuBurger } from "react-icons/ci";
import { HiSearch } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import NotificationModal from "./NotificationModal";


const DashboardNav = ({ sidebar, setSidebar }) => {
  const { user, logoutUser } = useAuth();
  const role = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const cardRef = useRef(null);

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      console.log("reached handler", res);
      console.log("reached handler", user);
      if (!user) {
        console.log("Logged out");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const location = useLocation();
  return (
    <div className="py-8">
      <div className="flex items-center justify-between">
        <div
          onClick={() => setSidebar(!sidebar)}
          className="text-2xl border cursor-pointer border-gray-200 p-1 lg:hidden"
        >
          {sidebar ? <VscChromeClose /> : <CiMenuBurger />}
        </div>

        <div className="sm:hidden bg-[#F0F1F5] p-3 rounded-full flex items-center gap-2">
          <button className="text-[#434E55] hover:text-black text-3xl duration-300 cursor-pointer">
            <HiSearch />
          </button>
        </div>

        <div className="hidden bg-[#F0F1F5] py-2 px-6 rounded-full sm:flex items-center gap-2 max-w-[400px]">
          <input
            type="text"
            className="grow outline-0 placeholder-[#CBCED3]"
            placeholder="Search..."
          />

          <button className="text-[#434E55] hover:text-black text-xl duration-300 cursor-pointer">
            <HiSearch />
          </button>
        </div>

        <div className="flex items-center gap-5">
          {role !== "admin" && (
            <Link
              to="/dashboard/news-feed"
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold border-2 hover:bg-gray-200 border-[#211951] text-[#4C4673] duration-300 cursor-pointer ${location.pathname === '/dashboard/news-feed' && 'border-primary text-primary'}`}
            >
              <span>News feed</span>

              <PiNewspaperLight className="text-2xl" />
            </Link>
          )}
          <div className="">
            <Link
              to={`/dashboard/public-profile/${user?._id}`}
              className="flex items-center gap-2 hover:text-blue-600 duration-300"
            >
              <UserRound className="w-6" />
            </Link>
            <div className="absolute top-0 left-0 z-50">
              <NotificationModal
                isNotificationOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
              ></NotificationModal>
            </div>
          </div>
          <div className="">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative z-[1] max-w-11 max-h-11 rounded-full overflow-hidden focus:outline-none cursor-pointer"
            >
              <BellDot />
            </button>
            <div className="absolute top-0 left-0 z-50">
              <NotificationModal
                isNotificationOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
              ></NotificationModal>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[1] max-w-11 max-h-11 rounded-full overflow-hidden focus:outline-none cursor-pointer"
            >
              <img
                src={user?.avatar}
                className="size-full object-cover bg-gray-200"
                alt="user"
              />
            </button>

            <div
              className={`absolute z-10 bg-white rounded-2xl w-fit px-4 py-4 duration-300
              ${
                isOpen
                  ? "opacity-100 top-14 right-0 scale-3d"
                  : "scale-0 opacity-0 -top-10 -right-10"
              }
              `}
              style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
              ref={cardRef}
            >
              <ul className="flex flex-col gap-4">
                {/* user */}
                <li>
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center gap-2 hover:text-blue-600 duration-300"
                  >
                    <UserRound className="w-6" />

                    <span>Profile</span>
                  </Link>
                </li>

                {/* settings */}
                <li>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 hover:text-blue-600 duration-300"
                  >
                    <Settings />

                    <span>Settings</span>
                  </Link>
                </li>

                {/* logout */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 hover:text-blue-600 duration-300"
                  >
                    <LogOut />

                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
