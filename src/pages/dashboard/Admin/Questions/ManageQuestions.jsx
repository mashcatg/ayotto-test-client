import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { RiDeleteBin3Line } from "react-icons/ri";
import Swal from "sweetalert2";
import QuestionRenderer from "../../../../components/CustomEditor/QuestionRenderer";
import useAxios from "../../../../hooks/useAxios";
import Categories from "./Categories";
import UpdateQuestionModal from "./UpdateQuestionModal";

const ManageQuestions = () => {
  const axiosPublic = useAxios();
  const queryClient = useQueryClient();
  const [type, setType] = useState("");
  const [topicId, setTopicId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const {
    data: questionsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["questions", type, topicId, searchQuery, currentPage, limit],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        params.append("page", currentPage);
        params.append("limit", limit);

        if (searchQuery.trim()) {
          params.append("search", searchQuery.trim());
        }
        if (type) {
          params.append("type", type);
        }
        if (topicId) {
          params.append("topicId", topicId);
        }

        const { data } = await axiosPublic.get(`/question?${params}`);

        return {
          questions: data.questions || [],
          totalPages: data.totalPages || 1,
          currentPage: data.currentPage || 1,
          total: data.total || 0,
        };
      } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const { questions = [], totalPages = 1, currentPage: serverPage = 1, total = 0 } = questionsData || {};

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Mutation for deleting questions
  const deleteMutation = useMutation({
    mutationFn: (questionId) => axiosPublic.delete(`/question/${questionId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["questions"]);
      toast.success("Question deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question");
    },
  });

  // Delete question handler
  const handleDelete = async (questionId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteMutation.mutateAsync(questionId);
      }
    } catch (error) {
      console.error("Error in delete handler:", error);
    }
  };

  // Handle edit button click
  const handleEditClick = (question) => {
    setSelectedQuestion(question);
    setIsUpdateModalOpen(true);
  };

  // Show error toast if query fails
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch questions");
      console.error("Error fetching questions:", error);
    }
  }, [error]);

  return (
    <div className="py-6">
      {/* Filter Section */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <Categories props={{ topicId, setTopicId }}></Categories>

          <select onChange={(e) => setType(e.target.value)} value={type} className="bg-[#E9E4E4] hover:bg-gray-200 text-[#6a6b6c] text-sm rounded-xl px-4 py-2">
            <option value="">Select Type</option>
            <option value="board">Board</option>
            <option value="test">Test</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="bg-[#E9E4E4] py-3 px-6 rounded-lg max-w-xl flex items-center">
          <button className="text-[#6A6B70] hover:text-black text-xl duration-300 cursor-pointer">
            <HiSearch />
          </button>
          <input
            type="text"
            className="grow outline-0 bg-transparent placeholder-[#96989b] ml-2"
            placeholder="Search questions by text or reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-white rounded-xl shadow-sm">
        {error ? (
          <div className="text-center py-8 text-red-500">
            <p>Error loading questions: {error.message}</p>
          </div>
        ) : isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading questions...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">{searchQuery || type || topicId ? "No matching questions found" : "No questions found"}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Question</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Type</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Answer</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {questions.map((question) => {
                    // Find the correct option
                    const correctOption = question.questionOption.find((option) => option.isCorrect);

                    return (
                      <tr key={question._id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          {/* Use QuestionRenderer to display the question text */}
                          <QuestionRenderer content={question.questionText} className="max-w-md text-sm" />
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className="px-2 py-1 text-xs font-medium rounded-full capitalize"
                            style={{
                              backgroundColor: question.type === "board" ? "#E3F2FD" : question.type === "test" ? "#F3E5F5" : "#FAFAFA",
                              color: question.type === "board" ? "#1976D2" : question.type === "test" ? "#9C27B0" : "#616161",
                            }}
                          >
                            {question.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {/* Use QuestionRenderer to display the correct answer */}
                          {correctOption && (
                            <div className="text-sm text-gray-700">
                              <QuestionRenderer content={correctOption.text} className="text-sm" />
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <button onClick={() => handleEditClick(question)} className="text-blue-500 hover:text-blue-700">
                              <FaRegEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(question._id)}
                              disabled={deleteMutation.isPending}
                              className={`text-red-500 hover:text-red-700 ${deleteMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              <RiDeleteBin3Line size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 py-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${currentPage === page ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}

            {/* Results summary */}
            <div className="text-sm text-gray-500 text-center pb-4">
              {total > 0 ? `Showing ${(currentPage - 1) * limit + 1} to ${Math.min(currentPage * limit, total)} of ${total} results` : "No results found"}
            </div>
          </>
        )}
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <UpdateQuestionModal
          props={{
            setIsModalOpen: setIsUpdateModalOpen,
            questionToEdit: selectedQuestion,
          }}
        />
      )}
    </div>
  );
};

export default ManageQuestions;
