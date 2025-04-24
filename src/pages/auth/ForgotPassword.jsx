import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';

const ForgotPassword = () => {
   const handleLogin = async e => {
      e.preventDefault();
      const form = e.target;
      try {
         const email = form.email.value;
         console.log(email)
         toast.success("Login Successful!")
      } catch (error) {
         console.log(error);
         toast.error(error.message || 'Something went wrong!')
      }
   }
   return (
      <div className='py-16'>
         <div className='bg-slate-50 max-w-xl mx-auto p-10 border border-slate-100 rounded-lg'>
            <div className='text-center space-y-3 pt-4'>
               <h3 className='text-4xl font-semibold'>Forgot Password</h3>
               <p className='font-light'>Access your account below by providing correct email and password</p>
            </div>
            <form onSubmit={handleLogin} className='pt-10 pb-4 space-y-6'>
               
               <div>
                  <div className='flex items-center justify-between pb-1'>
                     <p className='pl-1'>Password :</p>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-100 grow px-3 rounded-full border-slate-300 border">
                     <input type="email" name="email" placeholder="Your Email" className="p-2.5 bg-none outline-none grow" /> 
                  </div>
               </div>

               <div className='text-center'>
                  <input type="submit" value="Send OTP" className='bg-[#5271FF] text-white font-semibold py-2.5 px-12 rounded-full cursor-pointer hover:bg-[#5258ff]' />
               </div>
            </form>
            
            <p className='text-center pt-4'>Don’t have any account ? <Link to='/register' className='text-primary hover:underline'>Create new one</Link></p>
         </div >
      </div >
   );
};

export default ForgotPassword;