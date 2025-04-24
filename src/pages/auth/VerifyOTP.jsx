import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";

const VerifyOTP = () => {
    const axiosPublic = useAxios();
    const navigate = useNavigate();
    const navigationInputs = useRef([]);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const length = 6;
    const location = useLocation();
    
    // Get phone and name from navigation state
    const { phone, name } = location.state || {};
    
    // Redirect if no phone number is provided
    if (!phone) {
        navigate("/register");
        toast.error("Please complete registration form first");
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const enteredOTP = navigationInputs.current
                .map((input) => input?.value)
                .join("");
            
            if (enteredOTP.length !== 6) {
                toast.error("Please enter all 6 digits.");
                setLoading(false);
                return;
            }
            
            const response = await axiosPublic.post("/auth/verify", {
                phone: phone,
                otp: enteredOTP, // Send as string, not parseInt
            });
            
            if (response.data.success) {
                toast.success("Registration Successful!");
                navigate("/login");
            }
        } catch (error) {
            console.error("OTP verification error:", error);
            // Display the specific error message from the backend if available
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("OTP verification failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };
    
    const handleResendOTP = async () => {
        setResendLoading(true);
        
        try {
            // We need name and password to resend OTP, but we only have phone from location state
            // This is a simplified version - in a real app, you might want to store these temporarily
            const response = await axiosPublic.post("/auth/resend-otp", { 
                phone: phone 
            });
            
            if (response.data.success) {
                toast.success("New OTP sent successfully!");
                // Clear existing inputs
                navigationInputs.current.forEach(input => {
                    if (input) input.value = '';
                });
                navigationInputs.current[0]?.focus();
            }
        } catch (error) {
            console.error("Resend OTP error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to resend OTP. Please try again.");
            }
        } finally {
            setResendLoading(false);
        }
    };

    const handleInputChange = (e, index) => {
        const { value } = e.target;
        if (/^[0-9]$/.test(value) && value.length === 1) {
            if (index < length - 1) {
                navigationInputs.current[index + 1]?.focus();
            }
        } else {
            e.target.value = value.slice(0, 1); // Ensure only one character
        }
    };
    
    const handleKeydown = (e, index) => {
        if (
            e.key === "Backspace" &&
            index > 0 &&
            !navigationInputs.current[index]?.value
        ) {
            navigationInputs.current[index - 1]?.focus();
        }
    };
    
    return (
        <div className="py-16">
            <div className="bg-slate-50 max-w-xl mx-auto p-10 border border-slate-100 rounded-lg">
                <div className="text-center space-y-3 pt-4">
                    <h3 className="text-4xl font-semibold">Verify OTP</h3>
                    <p className="font-light">
                        Enter the 6-digit OTP sent to your phone number: {phone && `+880${phone}`}
                    </p>
                </div>
                <form onSubmit={handleVerifyOTP} className="pt-10 pb-4 space-y-6">
                    <div>
                        <p className="pl-1">Enter OTP :</p>
                        <div className="grid grid-cols-6 gap-2 md:gap-4">
                            {Array.from({ length }).map((_, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (navigationInputs.current[index] = el)}
                                    className="p-3 text-center border border-[#bcbcbc] rounded-md outline-none focus:border-[#3B9DF8] h-12"
                                    maxLength="1"
                                    onChange={(e) => handleInputChange(e, index)}
                                    onKeyDown={(e) => handleKeydown(e, index)}
                                    type="text"
                                    inputMode="numeric"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#5271FF] text-white font-semibold py-2.5 px-12 rounded-full cursor-pointer hover:bg-[#5258ff] disabled:bg-[#a5b4ff] disabled:cursor-not-allowed"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </div>
                </form>
                <p className="text-center pt-4">
                    Haven't received yet?
                    <button 
                        onClick={handleResendOTP} 
                        disabled={resendLoading}
                        className="text-primary ml-1 cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        {resendLoading ? "Sending..." : "Resend OTP"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default VerifyOTP;