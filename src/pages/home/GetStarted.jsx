const GetStarted = () => {
    return (
 
      <div className="px-3 max-w-7xl mx-auto mt-6 md:mt-10 p-3">
        <div id="contact" className="grid grid-cols-1 md:grid-cols-2 bg-[#5271FF] rounded-3xl gap-6 md:gap-12 py-12 md:py-20 px-10">
 
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Get Started Now!</h2>
            <p className="text-lg md:text-xl text-white mt-2">
              We have a massive offer only for you. Just get it man!
            </p>
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <button className="bg-white text-[#5271FF] rounded-full text-[20px] h-12 w-40 font-semibold shadow-lg hover:bg-gray-200 transition">
              Join Now
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default GetStarted;