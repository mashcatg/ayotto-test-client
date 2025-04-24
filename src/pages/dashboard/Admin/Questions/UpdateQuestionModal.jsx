/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomEditor from "../../../../components/CustomEditor/CustomEditor"; // Add this import
import useAxios from "../../../../hooks/useAxios";
import { processHtmlContent } from "../../../../utils/imageProcessor";

const UpdateQuestionModal = ({ props }) => {
  const { setIsModalOpen, questionToEdit } = props;
  const axiosPublic = useAxios();
  const queryClient = useQueryClient();

  const [question, setQuestion] = useState({
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

  // Pre-fill form when questionToEdit is provided
  useEffect(() => {
    if (questionToEdit) {
      setQuestion(questionToEdit);
    }
  }, [questionToEdit]);

  const updateMutation = useMutation({
    mutationFn: (updatedQuestion) => {
      return axiosPublic.put(`/question/${questionToEdit._id}`, updatedQuestion);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questions"]);
      toast.success("Question updated successfully!");
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("Error updating question:", error);
      toast.error("Failed to update question");
    },
  });

  const handleQuestionChange = (field, value) => {
    setQuestion((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOptionChange = (optionIndex, value) => {
    setQuestion((prev) => ({
      ...prev,
      questionOption: prev.questionOption.map((opt, idx) => (idx === optionIndex ? { ...opt, text: value } : opt)),
    }));
  };

  const handleCorrectAnswerChange = (optionIndex) => {
    setQuestion((prev) => ({
      ...prev,
      questionOption: prev.questionOption.map((opt, idx) => ({
        ...opt,
        isCorrect: idx === optionIndex,
      })),
    }));
  };

  const handleAddOption = () => {
    setQuestion((prev) => ({
      ...prev,
      questionOption: [...prev.questionOption, { text: "", isCorrect: false }],
    }));
  };

  const handleRemoveOption = (optionIndex) => {
    if (question.questionOption.length <= 2) {
      toast.error("Minimum 2 options required");
      return;
    }
    setQuestion((prev) => ({
      ...prev,
      questionOption: prev.questionOption.filter((_, idx) => idx !== optionIndex),
    }));
  };

  const handleSubmit = async () => {
    const { questionText, questionOption } = question;

    // Check if question text is empty
    if (!questionText.trim()) {
      toast.error("Question text is required.");
      return;
    }

    // Check if any option text is empty
    if (
      questionOption.some((option) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = option.text.trim();
        return tempDiv.textContent === "";
      })
    ) {
      toast.error("Option text is required for all options");
      return;
    }

    // Check if at least one option is marked as correct
    if (!questionOption.some((option) => option.isCorrect)) {
      toast.error("At least one option must be marked as correct.");
      return;
    }

    try {
      // Process each question to replace base64 images with URLs
      const processedQuestion = {
        ...question,
        questionText: await processHtmlContent(question.questionText),
        questionOption: await Promise.all(
          question.questionOption.map(async (option) => ({
            ...option,
            text: await processHtmlContent(option.text),
          }))
        ),
        solution: await processHtmlContent(question.solution),
      };

      // Submit update with processed content
      updateMutation.mutate(processedQuestion);
    } catch (error) {
      console.error("Error processing question data:", error);
      toast.error("Failed to process image data. Please try again.");
    }
  };

  const handleClickOutsideModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsModalOpen(false);
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
        <h2 className="text-xl font-medium mb-4 text-primary">{questionToEdit ? "Update Question" : "Add New Question"}</h2>

        <div className="mb-4">
          <label className="block font-medium mb-2">Question Text:</label>
          <CustomEditor value={question.questionText} onChange={(value) => handleQuestionChange("questionText", value)} placeholder="Enter question text" />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Question Reference:</label>
          <input
            type="text"
            placeholder="Enter reference text"
            value={question.questionRef}
            onChange={(e) => handleQuestionChange("questionRef", e.target.value)}
            className="w-full bg-white p-3 rounded-xl border border-transparent focus:border-primary/50 outline-none"
          />
        </div>

        {question.questionOption.map((option, optIdx) => (
          <div key={optIdx} className="mb-2">
            <label className="block font-medium mb-2">Option {optIdx + 1}:</label>
            <div className={`flex flex-col rounded-xl bg-white`}>
              <div className={`bg-white rounded-t-xl`}>
                <CustomEditor value={option.text} onChange={(value) => handleOptionChange(optIdx, value)} placeholder={`Enter option ${optIdx + 1} text`} />
              </div>
              <div className="flex items-center justify-end p-2 rounded-b-xl border-t border-gray-200 bg-gray-50">
                <div className="flex items-center">
                  <label className="mr-2 text-sm font-medium">Correct:</label>
                  <input type="checkbox" checked={option.isCorrect} onChange={() => handleCorrectAnswerChange(optIdx)} className="cursor-pointer" />
                </div>
                <button onClick={() => handleRemoveOption(optIdx)} className="text-red-500 hover:text-red-600 ml-4" title="Remove option">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        <button onClick={handleAddOption} className="text-primary hover:text-primary/80 mt-2 flex items-center">
          <svg className="size-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Option
        </button>

        <div className="mb-4 mt-4">
          <label className="block font-medium mb-2">Solution:</label>
          <CustomEditor value={question.solution} onChange={(value) => handleQuestionChange("solution", value)} placeholder="Enter solution explanation" />
        </div>

        <div className="flex justify-center mt-6">
          <button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl text-sm" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Updating..." : questionToEdit ? "Update Question" : "Add Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuestionModal;
