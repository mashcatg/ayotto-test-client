import { MdArrowForwardIos } from "react-icons/md";
import shape from '../../assets/vector.png';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";

const Banner = () => {
   
   const {user, token} = useAuth();
   const axios = useAxios();

   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get("/quiz/67c41a3ef4fdf4365c7e53f8");
         console.log("Data:", response.data); // ✅ Should print the actual quiz results
       } catch (error) {
         console.error("Error fetching data", error);
       }
     };
   
     fetchData();
   }, []);
   

   // console.log(user, token)
   return (
      <div id="home" className="text-center py-16">
         <div className=" text-center space-y-6 flex items-center flex-col justify-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-primary font-semibold flex items-center flex-col gap-y-4"><span><span className="text-[#5271FF]">Create</span> Your Own</span><span>LMS Website, in<span  className="text-[#5271FF] relative"> Clicks <img src={shape} className="absolute -right-6 md:-right-10 -top-3 md:-top-5 md:w-12 w-8"/></span></span></h1>
            <p className="font-primary text-[#828080] leading-7 text-[15px] sm:text-[16px]">Quickly Build, Customize, and Launch Your Own Learning Platform—No Coding, No Hassle. Create Courses, Manage Students, and Grow Your Online Education Business in Few Clicks!</p>
            
            <div className="w-full max-w-lg flex  items-center sm:space-x-5 px-3 flex-col gap-y-5 sm:flex-row">
               <div className="flex items-center sm:space-x-3 bg-slate-100 grow px-3 rounded-full w-full">
                  <span className="font-semibold">+880</span>
                  <input type="text" name="number" placeholder="Your Number" className="p-2.5 bg-none outline-none w-full" />
               </div>
               <Link to={'/login'} type="submit" className="btn flex items-center space-x-2 cursor-pointer justify-center"><span>Continue</span> <MdArrowForwardIos className="-mb-1" /></Link>
            </div>
            <div className="p-4">
            <p className="font-primary text-[#828080] leading-7 text-[15px] sm:text-[16px] text-center">Our Trusted Partners</p>
            <div className="flex items-center justify-center">
               <img src="https://edskool.com/assets/images/branding/edskool-logo.png" alt="partners" className="w-[150px]" />
               <img src="https://edskool.com/assets/images/branding/edskool-logo.png" alt="partners" className="ml-4 w-[150px]" />

            </div>
         </div>
         </div>

      </div>
   );
};

export default Banner;