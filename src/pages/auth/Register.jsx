import { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const Register = () => {
    const [eye, setEye] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const axiosPublic = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        
        try {
            const name = form.name.value;
            const number = form.number.value;
            const password = form.password.value;
            
            // Validate inputs
            if (!name || !number || !password) {
                toast.error("Please fill all required fields");
                setLoading(false);
                return;
            }
            
            // Validate phone number format
            const isValidPhone = (number) => {
                const regex = /^1[3-9]\d{8}$/;
                return regex.test(number);
            };
            
            if (!isValidPhone(number.toString())) {
                toast.error("Invalid Phone Number! Must start with 1 and be 10 digits.");
                setLoading(false);
                return;
            }
            
            if (password.length < 8) {
                toast.error("Password must be at least 8 characters long!");
                setLoading(false);
                return;
            }
            
            const data = { name, phone: number, password };
            
            // Request OTP
            const res = await axiosPublic.post("/auth/register", data);
            
            if (res.data.success) {
                toast.success("OTP Sent! Please verify.");
                navigate("/verifyOTP", { state: { phone: number, name } });
            }
        } catch (error) {
            console.error("Registration error:", error);
            // Display the specific error message from the backend if available
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong during registration!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-16">
            <div className="bg-slate-50 max-w-xl mx-auto p-10 border border-slate-100 rounded-lg">
                <div className="text-center space-y-3 pt-4">
                    <h3 className="text-4xl font-semibold">Create an Account</h3>
                    <p className="font-light">
                        Create your account by providing your name, phone number, and password
                    </p>
                </div>
                <form onSubmit={handleRegister} className="pt-10 pb-4 space-y-6">
                    <div>
                        <p className="pl-1 pb-1">Name :</p>
                        <div className="flex items-center space-x-3 bg-slate-100 grow px-3 rounded-full border-slate-300 border">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="p-2.5 bg-none outline-none w-full"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <p className="pl-1 pb-1">Phone :</p>
                        <div className="flex items-center space-x-3 bg-slate-100 grow px-3 rounded-full border-slate-300 border">
                            <span className="font-semibold">+880</span>
                            <input
                                type="text"
                                name="number"
                                placeholder="Your Number"
                                className="p-2.5 bg-none outline-none w-full"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div className="pb-1">
                            <p className="pl-1">Password :</p>
                        </div>
                        <div className="flex items-center space-x-3 bg-slate-100 grow px-3 rounded-full border-slate-300 border">
                            <input
                                type={eye ? "text" : "password"}
                                name="password"
                                placeholder="Your Password"
                                className="p-2.5 bg-none outline-none grow"
                                required
                                minLength={8}
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
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#5271FF] text-white font-semibold py-2.5 px-12 rounded-full cursor-pointer hover:bg-[#5258ff] disabled:bg-[#a5b4ff] disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending OTP..." : "Register"}
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-between">
                    <hr className="grow text-gray-300" />
                    <span className="px-3">or</span>
                    <hr className="grow text-gray-300" />
                </div>
                <p className="text-center pt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;