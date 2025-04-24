import { BookOpenCheck, ClipboardList, House, NotebookText, Settings } from "lucide-react";
import { PiRanking } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const SidebarBottom = () => {
  return (
    <div className="dashboard-side-nav">
      <ul className="flex xs:gap-4 justify-evenly p-5 xs:p-9">
        <li>
          <NavLink to="/dashboard/student-dashboard" className="block p-4 rounded-xl text-[#14213d] hover:text-primary duration-300">
            <House className="size-6 xs:size-8" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/rapidRead" className="block p-4 rounded-xl text-[#14213d] hover:text-primary duration-300">
            <BookOpenCheck className="size-6 xs:size-8" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/" className="block p-4 rounded-xl text-[#14213d] hover:text-primary duration-300">
            <ClipboardList className="size-6 xs:size-8" />
          </NavLink>
        </li>

        <li>
          <NavLink to="leaderboard" className="block p-4 rounded-xl text-[#14213d] hover:text-primary duration-300">
            <PiRanking className="size-6 xs:size-8" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/" className="block p-4 rounded-xl text-[#14213d] hover:text-primary duration-300">
            <Settings className="size-6 xs:size-8" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarBottom;
