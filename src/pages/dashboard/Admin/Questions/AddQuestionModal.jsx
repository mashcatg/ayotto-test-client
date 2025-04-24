import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import CustomEditor from "../../../../components/CustomEditor/CustomEditor";
import { processHtmlContent } from "../../../../utils/imageProcessor";

/* eslint-disable react/prop-types */
const AddQuestionModal = ({ props }) => {
  const { setIsModalOpen, setQuestions } = props;
  const [newQuestion, setNewQuestion] = useState({
    id: Date.now() + Math.random().toString(36).substring(2),
    questionText: "",
    questionRef: "",
    questionOption: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
    solution: "",
  });

  const handleNewQuestionChange = (field, value) => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      [field]: value,
    }));
  };

  const handleNewOptionChange = (optionIndex, value) => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      questionOption: prevQuestion.questionOption.map((opt, idx) => (idx === optionIndex ? { ...opt, text: value } : opt)),
    }));
  };

  const handleNewCorrectAnswerChange = (optionIndex) => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      questionOption: prevQuestion.questionOption.map((opt, idx) => ({
        ...opt,
        isCorrect: idx === optionIndex,
      })),
    }));
  };

  const handleAddNewOption = () => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      questionOption: [...prevQuestion.questionOption, { text: "", isCorrect: false }],
    }));
  };

  const handleRemoveNewOption = (optionIndex) => {
    if (newQuestion.questionOption.length <= 2) {
      toast.error("Minimum 2 options required");
      return;
    }
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      questionOption: prevQuestion.questionOption.filter((_, idx) => idx !== optionIndex),
    }));
  };

  const handleSaveNewQuestion = async () => {
    const { questionText, questionOption } = newQuestion;

    // Check if question text is empty
    if (!questionText.trim()) {
      toast.error("Question text is required.");
      return;
    }

    // Check if any option text is empty
    if (questionOption.some((option) => !option.text.trim())) {
      toast.error("Option text is required for all options");
      return;
    }

    // Check if at least one option is marked as correct
    if (!questionOption.some((option) => option.isCorrect)) {
      toast.error("At least one option must be marked as correct.");
      return;
    }

    try {
      // Process question content before saving
      const processedQuestion = {
        ...newQuestion,
        questionText: await processHtmlContent(newQuestion.questionText),
        questionOption: await Promise.all(
          newQuestion.questionOption.map(async (option) => ({
            ...option,
            text: await processHtmlContent(option.text),
          }))
        ),
        solution: await processHtmlContent(newQuestion.solution),
      };

      // If all validations pass, save the processed question
      setQuestions((prevQuestions) => [...prevQuestions, processedQuestion]);
      setIsModalOpen(false);
      setNewQuestion({
        id: Date.now() + Math.random().toString(36).substring(2),
        questionText: "",
        questionRef: "",
        questionOption: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        solution: "",
      });

      toast.success("Question added successfully.");
    } catch (error) {
      console.error("Error processing question data:", error);
      toast.error("Failed to add question. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutsideModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleCloseModal();
    }
  };

  return (
    <div className="modal-overlay cursor-not-allowed fixed inset-0 bg-black/50 z-[99] flex items-center justify-center px-4" onClick={handleClickOutsideModal}>
      <div
        className="bg-[#E8ECFF] cursor-default w-full max-w-xl p-6 rounded-xl shadow-lg relative overflow-y-scroll max-h-screen"
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: "thin",
          msOverflowStyle: "thin",
        }}
      >
        <h2 className="text-xl font-medium mb-4 text-primary">Add New Question</h2>

        <div className="mb-4">
          <label className="block font-medium mb-2">Question Text:</label>
          <CustomEditor
            value={newQuestion.questionText}
            onChange={(value) => handleNewQuestionChange("questionText", value)}
            placeholder="Enter question text"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Question Reference:</label>
          <input
            type="text"
            placeholder="Enter reference text"
            value={newQuestion.questionRef}
            onChange={(e) => handleNewQuestionChange("questionRef", e.target.value)}
            className="w-full bg-white p-3 rounded-xl border border-transparent focus:border-primary/50 outline-none"
          />
        </div>

        {newQuestion.questionOption.map((option, optIdx) => (
          <div key={optIdx} className="mb-2">
            <label className="block font-medium mb-2">Option {optIdx + 1}:</label>
            <div className={`flex flex-col rounded-xl bg-white`}>
              <div className={`bg-white rounded-t-xl`}>
                <CustomEditor value={option.text} onChange={(value) => handleNewOptionChange(optIdx, value)} placeholder={`Enter option ${optIdx + 1} text`} />
              </div>
              <div className="flex items-center justify-end p-2 rounded-b-xl border-t border-gray-200 bg-gray-50">
                <div className="flex items-center">
                  <label className="mr-2 text-sm font-medium">Correct:</label>
                  <input type="checkbox" checked={option.isCorrect} onChange={() => handleNewCorrectAnswerChange(optIdx)} className="cursor-pointer" />
                </div>
                <button onClick={() => handleRemoveNewOption(optIdx)} className="text-red-500 hover:text-red-600 ml-4" title="Remove option">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        <button onClick={handleAddNewOption} className="text-primary hover:text-primary/80 mt-2 flex items-center">
          <svg className="size-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Option
        </button>

        <div className="mb-4 mt-4">
          <label className="block font-medium mb-2">Solution:</label>
          <CustomEditor
            value={newQuestion.solution}
            onChange={(value) => handleNewQuestionChange("solution", value)}
            placeholder="Enter solution explanation"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button onClick={handleSaveNewQuestion} className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl text-sm">
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
