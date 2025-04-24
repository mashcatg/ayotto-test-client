import { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { VscChromeClose } from "react-icons/vsc";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { LogOut, Settings, UserRound } from "lucide-react";

const Nav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [sidebar, setSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser, loading } = useAuth();
  const cardRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle clicking outside to close dropdown and sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardRef.current && 
        !cardRef.current.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
        setSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (loading) {
    return <Loading />;
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-2xl border-b-gray-100 transform transition-transform duration-700 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between px-3 max-w-7xl mx-auto py-3">
        <Link to="/">
          <img src={logo} alt="logo" className="w-20" />
        </Link>
        
        <ul className="items-center space-x-8 text-lg nav hidden md:flex">
          <ScrollLink
            to="home"
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="features"
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer"
          >
            Features
          </ScrollLink>
          <ScrollLink
            to="pricing"
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer"
          >
            Pricing
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer"
          >
            Contact
          </ScrollLink>
        </ul>

        {user ? (
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[1] max-w-11 max-h-11 rounded-full overflow-hidden focus:outline-none cursor-pointer"
            >
              <img src={user.avatar} className="size-full object-cover bg-gray-200" alt="user" />
            </button>

            <div
              className={`absolute z-10 bg-white rounded-2xl w-fit px-4 py-4 duration-300
              ${isOpen ? "opacity-100 top-14 right-0 scale-3d" : "scale-0 opacity-0 -top-10 -right-10"}
              `}
              style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
              ref={cardRef}
            >
              <ul className="flex flex-col gap-4">
                <li>
                  <Link to="/dashboard" className="flex items-center gap-2 hover:text-blue-600 duration-300">
                    <UserRound className="w-6" />
                    <span>Dashboard</span>
                  </Link>
                </li>

                

                <li>
                  <button onClick={handleLogout} className="flex items-center gap-2 hover:text-blue-600 duration-300">
                    <LogOut />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn hidden md:inline-block">
              Login
            </Link>
            <div
              onClick={() => setSidebar(!sidebar)}
              className="text-2xl border cursor-pointer border-gray-200 p-1 md:hidden"
            >
              {sidebar ? <VscChromeClose /> : <CiMenuBurger />}
            </div>
          </>
        )}
      </div>

      {/* nav links for small screens - only show when not logged in */}
      {!user && (
        <ul
          className={`flex flex-col text-lg nav md:hidden bg-white absolute top-15 duration-500 p-10 pr-32 h-screen space-y-5 ${
            sidebar ? "right-0 opacity-100" : "-right-56 opacity-0"
          }`}
        >
          <ScrollLink
            to="home"
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer"
            onClick={() => setSidebar(false)}
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="features"
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer"
            onClick={() => setSidebar(false)}
          >
            Features
          </ScrollLink>
          <ScrollLink
            to="pricing"
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer"
            onClick={() => setSidebar(false)}
          >
            Pricing
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            offset={-70}
            duration={500}
            className="cursor-pointer"
            onClick={() => setSidebar(false)}
          >
            Contact
          </ScrollLink>
          <Link
            to="/login"
            className="cursor-pointer"
            onClick={() => setSidebar(false)}
          >
            Login
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Nav;