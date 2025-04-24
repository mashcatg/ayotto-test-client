// import { Check } from "lucide-react";
import vector from "../../assets/vector.png";

const Pricing = () => {
  return (
    <div id="pricing" className="max-w-7xl mx-auto px-4 py-16">
      {/* Pricing Header */}
      <div className="text-center mb-20">
        <h2 className="relative text-4xl font-bold text-[#1a1a1a] w-fit mx-auto">
          Pricing
          <img
            src={vector}
            className="size-9 absolute -top-4 -right-8"
            alt="Vector"
          />
        </h2>
        <p className="md:text-lg md:w-3xl mx-auto text-center text-[#5F5981] pt-3 ">
          Quickly Build, Customize, and Launch Your Own Learning Platform—No
          Coding, No Hassle.
        </p>
      </div>
      <div className="bg-[#5271FF] transition-colors duration-500 group-hover:border group-hover:border-white group mx-auto hover:bg-[#EDF1FF]  sm:max-w-sm rounded-[25px] p-8 ">
        <div className="text-center mb-5 sm:mb-8 space-y-[2px]">
          <h3 className="text-2xl font-bold text-white transition-colors duration-500 group-hover:text-[#5271FF]">
            Plan Ayotto
          </h3>
          <span className=" text-white transition-colors duration-500 group-hover:text-[#5271FF]  px-4 py-1 rounded-xl text-[17px]">
            এবার সব আয়ত্ত আসবেই!
          </span>
        </div>
        <div className="mb-5 sm:mb-8 flex justify-center items-center gap-x-2">
          <p className="text-3xl sm:text-5xl font-bold transition-colors duration-500  text-white group-hover:text-[#5271FF]">
            100%
          </p>
          <div>
            <button className="bg-white group-hover:bg-[#5271FF] text-[14px] sm:text-[16px] py-1 text-[#5271FF] group-hover:text-white  rounded-sm px-3  transition-colors duration-500 cursor-pointer">
              Lifetime Free
            </button>
          </div>
        </div>
        <button className="w-full font-bold bg-white group-hover:bg-[#5271FF] text-[#5271FF] group-hover:text-white py-3 rounded-full  transition-colors duration-500 cursor-pointer">
        Get Started Now!
        </button>
      </div>

      {/* Pricing Cards Container */}
      {/* <div className="grid grid-cols-1 gap-5 lg:gap-0 lg:grid-cols-3 max-w-6xl mx-auto items-center *:duration-300"> */}
      {/* Duronnto Plan */}
      {/* <div className="bg-[#EDF1FF] group hover:bg-[#5271FF] rounded-[25px] lg:rounded-r-[0px] p-8">
          <h3 className="text-xl font-semibold text-[#1a1a1a] group-hover:text-white mb-4">Duronnto Plan</h3>
          <div className="mb-6 text-[#5271FF] group-hover:text-white">
            <span className="text-5xl font-bold">399</span>
            <span className="text-3xl font-bold">TK</span>
            <p className="text-gray-600 group-hover:text-[#d8fff5] mt-1">Per 3 months</p>
          </div>
          <p className="text-gray-700 group-hover:text-gray-200 mb-6">Best for exam er age pora students</p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#5271FF] group-hover:text-white" />
              <span className="text-gray-700 group-hover:text-gray-200">ALL FEATURES</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#5271FF] group-hover:text-white" />
              <span className="text-gray-700 group-hover:text-gray-200">EXTRA Mentorship (Optional)</span>
            </div>
          </div>
          <button className="w-full font-bold bg-[#5271FF] group-hover:bg-white text-white group-hover:text-[#5271FF] py-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            Get Started
          </button>
        </div> */}

      {/* Prottoye Plan */}
      {/* <div className="bg-[#EDF1FF] border border-white group hover:bg-[#5271FF] rounded-[25px] p-8 transform lg:scale-105">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold group-hover:text-white">Prottoye Plan</h3>
            <span className="text-white bg-[#5271FF] group-hover:bg-white group-hover:text-[#5271FF] px-4 py-1 rounded-xl text-sm">Reccomanded</span>
          </div>
          <div className="mb-6 text-5xl font-bold text-[#5271FF] group-hover:text-white">
            <span>640</span>
            <span className="text-3xl">TK</span>
            <p className="mt-1 text-base font-normal text-gray-600 group-hover:text-[#d8fff5]">Per 6 months</p>
          </div>
          <p className="text-gray-700 group-hover:text-gray-200 mb-6">Best for regular valo hoi jaoa students</p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#5271FF] group-hover:text-white" />
              <span className="text-gray-700 group-hover:text-gray-200">ALL FEATURES</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#5271FF] group-hover:text-white" />
              <span className="text-gray-700 group-hover:text-gray-200">EXTRA Mentorship (Optional)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#5271FF] group-hover:text-white" />
              <span className="text-gray-700 group-hover:text-gray-200">AI Analysis & Suggestions for progress</span>
            </div>
          </div>
          <button className="w-full font-bold bg-[#5271FF] group-hover:bg-white text-white group-hover:text-[#5271FF] py-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            Get Started
          </button>
        </div> */}

      {/* Joddha Plan */}
      {/* <div className="bg-[#EDF1FF] group hover:bg-[#5271FF] rounded-[25px] lg:rounded-l-[0px] p-8">
          <h3 className="text-xl font-semibold text-[#1a1a1a] group-hover:text-white mb-4">Joddha Plan</h3>
          <div className="mb-6 text-[#5271FF] group-hover:text-white">
            <span className="text-5xl font-bold">899</span>
            <span className="text-3xl font-bold">TK</span>
            <p className="text-gray-600 mt-1">Per 3 months</p>
          </div>
          <p className="text-gray-600 group-hover:text-[#d8fff5] mb-6">Best for shara bochor pora students</p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#5271FF] group-hover:text-white" />
              <span className="text-gray-700 group-hover:text-gray-200">ALL FEATURES</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#5271FF] group-hover:text-white" />
              <span className="text-gray-700 group-hover:text-gray-200">EXTRA Mentorship (Optional)</span>
            </div>
          </div>
          <button className="w-full font-bold bg-[#5271FF] group-hover:bg-white text-white group-hover:text-[#5271FF] py-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            Get Started
          </button>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default Pricing;
