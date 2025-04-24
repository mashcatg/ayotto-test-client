import useAuth from "../../hooks/useAuth";
import Banner from "./Banner";
import Faq from "./Faq";
import GetStarted from "./GetStarted";
import Partners from "./Partners";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import WhyWe from "./WhyWe";


const Home = () => {

   const {user, token} = useAuth();

   // console.log(user, token)

   return (
      <div>
         <Banner />
         <Partners />
         <WhyWe></WhyWe>
         <Pricing></Pricing>
         <Testimonials></Testimonials>
         <Faq></Faq>
         <GetStarted></GetStarted>
      </div>
   );
};

export default Home;