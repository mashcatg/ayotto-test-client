import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { HiSearch } from "react-icons/hi";
import QuestionCard from "../../components/QuestionCard";
import useAxios from "../../hooks/useAxios";
import Categories from "./Admin/Questions/Categories";

const RapidRead = () => {
  const axiosPublic = useAxios();
  const [showAnswer, setShowAnswer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("");
  const [topicId, setTopicId] = useState("");

  const { data: questionsData = [], isLoading } = useQuery({
    queryKey: ["questions", type, topicId, searchQuery],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();

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
        return data.questions || [];
      } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
      }
    },
  });

  return (
    <div className="py-6 px-4 md:px-6 relative min-h-screen">
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

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <CgSpinner className="animate-spin w-8 h-8 text-primary" />
        </div>
      ) : (
        <>
          {/* Questions List */}
          <div className="space-y-6 mb-20">
            {questionsData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">{searchQuery || type || topicId ? "No matching questions found" : "No questions available"}</p>
              </div>
            ) : (
              questionsData.map((question, idx) => <QuestionCard key={question._id} question={question} idx={idx} showAnswer={showAnswer} />)
            )}
          </div>

          {/* Floating Button */}
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className={`fixed bottom-28 xs:bottom-40 sm:bottom-44 lg:bottom-10 right-5 sm:right-10 px-4 py-2 rounded-lg flex items-center gap-2 border
              ${showAnswer ? "bg-[#EDF0FF] border-primary text-primary" : "bg-white text-black"}
               z-50 transition-colors duration-300 hover:bg-opacity-90
              `}
          >
            {showAnswer ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            {showAnswer ? "Hide Answers" : "View Answers"}
          </button>
        </>
      )}
    </div>
  );
};

export default RapidRead;
