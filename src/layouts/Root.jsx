import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav';
import Footer from '../components/Footer';
const Root = () => {
   return (
      <div>
         <Nav />
         <div className='mt-16 px-3'>
            <Outlet />
         </div>
         <Footer />
      </div>
   );
};

export default Root;