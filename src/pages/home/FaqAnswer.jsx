/* eslint-disable react/prop-types */
import { GrDown } from "react-icons/gr";

const FaqAnswer = ({ item, isOpen, onClick }) => {
  const { question, answer } = item;

  return (
    <div
      className={`${
        isOpen ? "bg-[#EEF1FF]" : "bg-white"
      } rounded-lg py-[6px] px-8 transition-all duration-500`}
    >
      <button
        className="w-full flex justify-between items-center py-3 text-start transition duration-500 text-gray-500"
        onClick={onClick}
      >
        <span className="text-[22px] font-medium">{question}</span>
        <GrDown
          size={27}
          className={`transform transition-transform duration-500 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[20px] md:text-[22px] text-[#8f8c8c] py-3">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FaqAnswer;