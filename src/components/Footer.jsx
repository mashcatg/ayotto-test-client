import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { VscChevronRight } from "react-icons/vsc";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-slate-50">
      <div className="max-w-7xl mx-auto mt-12 pt-12 pb-6 px-4">
        <div className="grid gap-8 md:gap-x-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-12">
          {/* Logo and Description */}
          <div className="col-span-2 lg:col-span-5 flex flex-col items-center md:items-start gap-4">
            <img className="max-w-[90px]" src={logo} alt="logo" />
            <p className="text-[15px] mt-2 text-gray-700 text-center md:text-left">
              Quickly Build, Customize, and Launch Your Own Learning Platform—No
              Coding, No Hassle. Create Courses, Manage Students, and Grow Your
              Online Education Business in a Few Clicks!
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 text-center md:text-left">
              Quick Links
            </h2>
            <div className="mt-4 md:space-y-2 flex flex-col md:block text-center md:text-left">
              {["Home", "Features", "About Us", "Pricing", "FAQs"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-[16px] font-medium text-gray-600 hover:text-gray-800 hover:underline transition"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Subscription and Social Links */}
          <div className="col-span-2 lg:col-span-5">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 text-center md:text-left">
              Join Us Now
            </h2>
            <p className="text-lg mt-2 text-gray-700 text-center md:text-left">
              Start making your progress with Quizzzify.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 mt-5 w-full">
              <div className="flex bg-gray-200 rounded-full py-2 px-4 w-full md:max-w-[220px]">
                <span className="text-[16px] font-semibold">+880</span>
                <input
                  className="ml-2 flex-1 bg-transparent outline-none text-[15px] placeholder-gray-500"
                  type="text"
                  name="number"
                  placeholder="Your number"
                />
              </div>
              <Link to={"#"}>
                <div className="bg-[#5271FF] text-white rounded-full py-2 px-4 flex items-center gap-x-2">
                  <span className="text-[16px] font-semibold">Continue</span>
                  <VscChevronRight size={24} />
                </div>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex flex-col md:flex-row items-center gap-5 mt-5">
              <h2 className="text-lg font-semibold text-gray-900">Get in Touch:</h2>
              <div className="flex gap-3">
                {[FaFacebookF, FaInstagram, FaLinkedinIn, BsTwitterX].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-[#5271FF] hover:bg-[#5271FF] hover:text-white w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center transition"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="mt-6 border-gray-300" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between py-4">
          <p className="text-gray-600 flex items-center flex-wrap gap-x-1 text-center md:text-left">
            <span className="text-2xl text-gray-800 font-bold">©</span> {new Date().getFullYear()}{" "}
            <span>All rights reserved by The Good Boys</span>
          </p>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            {["Privacy Policy", "Terms & Conditions"].map((text) => (
              <a key={text} href="#" className="text-gray-600 hover:text-gray-800">
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
