import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loading.json";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Lottie className="max-w-[20rem]" animationData={loadingAnimation} />

      {/* <p className="text-2xl -mt-10 font-semibold text-gray-800">Loading...</p> */}
    </div>
  );
};

export default Loading;
