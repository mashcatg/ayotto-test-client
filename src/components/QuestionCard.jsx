/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import QuestionRenderer from "./CustomEditor/QuestionRenderer";

const QuestionCard = ({ question, showAnswer, idx }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  const handleOptionSelect = (optionId) => {
    if (showAnswer) return;

    if (selectedOption === optionId) {
      setSelectedOption(null);
      setShowSolution(false);
    } else {
      setSelectedOption(optionId);
      setShowSolution(true);
    }
  };

  const getOptionClass = (option) => {
    const baseClasses = "flex items-center p-3 rounded-xl cursor-pointer transition-colors";

    if (!showSolution && !showAnswer) {
      return `${baseClasses} bg-gray-50 hover:bg-gray-100`;
    }
    if (showAnswer && option.isCorrect) {
      return `${baseClasses} bg-green-50 border border-green-500`;
    }
    if (showSolution && selectedOption === option._id) {
      return `${baseClasses} ${option.isCorrect ? "bg-green-50 border border-green-500" : "bg-red-50 border border-red-500"}`;
    }
    if (showSolution && option.isCorrect) {
      return `${baseClasses} bg-green-50 border border-green-500`;
    }
    return `${baseClasses} bg-gray-50 hover:bg-gray-100`;
  };

  useEffect(() => {
    if (showAnswer) {
      setSelectedOption(null);
      setShowSolution(false);
    }
  }, [showAnswer]);

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-4 mb-4">
        <div className="text-[15px] font-medium text-gray-900 flex-1">
          <span className="inline-block mr-1">{idx + 1})</span>
          <QuestionRenderer content={question.questionText} className="inline-block" />
        </div>
        {question.questionRef && <span className="text-sm text-gray-500 whitespace-nowrap">{question.questionRef}</span>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {question.questionOption.map((option) => (
          <div key={option._id} onClick={() => handleOptionSelect(option._id)} className={getOptionClass(option)}>
            <input
              type="checkbox"
              checked={showAnswer ? option.isCorrect : selectedOption === option._id}
              onChange={() => handleOptionSelect(option._id)}
              className="hidden"
            />
            <div className="flex-1 text-[15px] text-gray-700 select-none">
              <QuestionRenderer content={option.text} className="option-content" />
            </div>
          </div>
        ))}
      </div>

      {(showSolution || showAnswer) && question.solution && (
        <div className="mt-4 pt-4">
          <div className="rounded-xl bg-green-50 border border-green-500 p-4">
            <p className="text-xl font-medium text-gray-900 mb-1">Solution:</p>
            <div className="text-sm text-gray-700">
              <QuestionRenderer content={question.solution} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
