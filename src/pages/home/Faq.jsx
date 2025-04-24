import { useState } from "react";
import FaqAnswer from "./FaqAnswer";

const Faq = () => {
  const questionData = [
    {
      question: "What is your refund policy?",
      answer:
        "A blockchain enthusiast passionate about decentralized applications and smart contracts.A blockchain enthusiast passionate about decentralized applications and smart contracts",
    },
    {
      question: "What is your refund policy?",
      answer:
        "A blockchain enthusiast passionate about decentralized applications and smart contracts.A blockchain enthusiast passionate about decentralized applications and smart contracts",
    },
    {
      question: "What is your refund policy?",
      answer:
        "A blockchain enthusiast passionate about decentralized applications and smart contracts.A blockchain enthusiast passionate about decentralized applications and smart contracts",
    },
    {
      question: "What is your refund policy?",
      answer:
        "A blockchain enthusiast passionate about decentralized applications and smart contracts.A blockchain enthusiast passionate about decentralized applications and smart contracts",
    },
    {
      question: "What is your refund policy?",
      answer:
        "A blockchain enthusiast passionate about decentralized applications and smart contracts.A blockchain enthusiast passionate about decentralized applications and smart contracts",
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <div className="bg-white">
      <div className="px-3 max-w-7xl mx-auto mt-12 md:mt-20 pb-16 p-3">
        <div className="grid grid-cols-1  md:grid-cols-2 md:justify-between gap-4 lg:gap-12 ">
          <div className="">
            <h2 className="text-3xl md:text-4xl lg:text-5xl   font-bold">
              Frequently Asked
              <span className="text-[#5271FF] "> Questions</span>
            </h2>
            <p className="md:text-lg lg:text-xl text-[#211951] pt-6 md:pt-12">
              Have questions? We've answered the most common ones to help you
              get started. For anything else, feel free to reach out to our
              support team.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-y-1 ">
            {questionData.map((item, i) => (
              <FaqAnswer key={i} item={item} isOpen={openIndex === i} 
              onClick={() =>toggleFaq(i)} ></FaqAnswer>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
