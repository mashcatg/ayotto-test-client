import { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
// import UpdateBatchGroup from "./UpdateBatchGroup";

const Login = () => {
	const [eye, setEye] = useState(false);
	// const axiosPublic = useAxios();

	const { loginUser, user } = useAuth()
	const navigate = useNavigate();

	console.log(user);
	useEffect(() => {
		if (user) {
			navigate('/dashboard')
		}
	}, [user])

	const handleLogin = async (e) => {
		e.preventDefault();
		
		try {
		  const formData = {
			phone: e.target.number.value,
			password: e.target.password.value
		  };
		  
		  await loginUser(formData);
		} catch (error) {
		  // Component level error handling if needed
		  console.error("Login error:", error);
		}
	  };
	return (
		<div className="py-16">
			<div className="bg-slate-50 max-w-xl mx-auto p-10 border border-slate-100 rounded-lg">
				<div className="text-center space-y-3 pt-4">
					<h3 className="text-4xl font-semibold">Login</h3>
					<p className="font-light">
						Access your account below by providing correct email and password
					</p>
				</div>
				<form onSubmit={handleLogin} className="pt-10 pb-4 space-y-6">
					<div>
						<p className="pl-1 pb-1">Phone :</p>
						<div className="flex items-center space-x-3 bg-slate-100 grow px-3 rounded-full border-slate-300 border">
							<span className="font-semibold">+880</span>
							<input
								type="text"
								name="number"
								placeholder="Your Number"
								className="p-2.5 bg-none outline-none"
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between pb-1">
							<p className="pl-1">Password :</p>
							<Link
								to="/forgotPassword"
								className="text-blue-600 hover:underline"
							>
								Forgot password?
							</Link>
						</div>
						<div className="flex items-center space-x-3 bg-slate-100 grow px-3 rounded-full border-slate-300 border">
							<input
								type={eye ? "text" : "password"}
								name="password"
								placeholder="Your Password"
								className="p-2.5 bg-none outline-none grow"
							/>
							<div
								onClick={() => setEye(!eye)}
								className="text-2xl cursor-pointer"
							>
								{eye ? <IoEyeOutline /> : <IoEyeOffOutline />}
							</div>
						</div>
					</div>

					<div className="text-center">
						<input
							type="submit"
							value="Log In"
							className="bg-[#5271FF] text-white font-semibold py-2.5 px-12 rounded-full cursor-pointer hover:bg-[#5258ff]"
						/>
					</div>
				</form>
				<div className="flex items-center justify-between">
					<hr className="grow text-gray-300" />
					<span className="px-3">or</span>
					<hr className="grow text-gray-300" />
				</div>

				<p className="text-center pt-4">
					Don’t have any account ?{" "}
					<Link to="/register" className="text-primary hover:underline">
						Create new one
					</Link>
				</p>
			</div>

			{/* modal */}

			
		</div>
	);
};

export default Login;
