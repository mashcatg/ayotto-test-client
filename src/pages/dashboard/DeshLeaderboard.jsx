import { useState, useEffect } from "react";
import { LuChevronRight } from "react-icons/lu";
import { ChevronDown, ChevronUp, Star, BookOpen, Award, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const DeshLeaderboard = () => {
  const [recentTests, setRecentTests] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [myPosition, setMyPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    const fetchRecentTests = async () => {
      try {
        const page = 1;
        const limit = 5;
        const response = await axios.get(`/quiz/user/quizzes/${page}/${limit}`);
        if (response.data.success) {
          setRecentTests(response.data.quizzes);
        }
      } catch (error) {
        console.error("Error fetching recent tests:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        setLeaderboardLoading(true);
        const response = await axios.get(`/leaderboard?page=1&limit=3&timeFilter=all`);
        if (response.data.success) {
          console.log(response.data.leaderboard);
          setLeaderboard(response.data.leaderboard);
          setMyPosition(response.data.myPosition);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLeaderboardLoading(false);
      }
    };

    fetchRecentTests();
    fetchLeaderboard();
  }, [axios]);
  const formatNumber = (num) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num;
  };

  // Format date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Determine movement (placeholder - in a real app, you'd compare with previous rankings)
  const determineMovement = (index) => {
    // This is just for display purposes - in a real app, you'd compare with previous position
    return index % 2 === 0 ? "up" : "down";
  };

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-between gap-8">
        <div className="lg:order-1 order-2 bg-white rounded-2xl p-3 sm:p-5 shadow-sm">
          <div className="flex justify-between gap-3 items-center">
            <div>
              <h3 className="sm:text-xl text-xl text-[#211951] md:text-2xl font-bold">Leaderboard</h3>
              <p className="text-[13px] text-[#697177]">Find the legends in the App</p>
            </div>
            <Link to={`/dashboard/leaderboard`}>
              <button className="cursor-pointer flex justify-between gap-x-2 items-center px-3 py-2 mr-1 sm:mr-2 font-semibold rounded-md bg-[#EEF1FF] text-[#516FFA]">
                <span>Show More</span>{" "}
                <LuChevronRight size={19}></LuChevronRight>
              </button>
            </Link>
          </div>
          
          {myPosition && (
            <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-[#516FFA]" />
                  <span className="text-sm font-medium">Your Rank: </span>
                  <span className="text-lg font-bold text-[#516FFA]">{myPosition}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 space-y-3">
            {leaderboardLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#516FFA]"></div>
              </div>
            ) : (
              leaderboard.map((entry, index) => (
                <Link to={`/dashboard/public-profile/${entry._id}`} key={entry._id} className="flex items-center justify-between bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-[#5271ff] w-8">#{entry.rank}</span>
                    <div className="relative h-12 w-12">
                      <div className="size-full rounded-full bg-blue-100 flex items-center justify-center border-2 border-[#5271ff]">
                        <span className="text-lg font-bold text-[#5271ff]">{entry.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{entry.name}</h3>
                      <p className="text-sm text-gray-500">{entry.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{formatNumber(entry.totalStars * 30)} XP</span>
                    </div>
                    <div className={`rounded-full p-2 ${determineMovement(index) === "up" ? "bg-teal-50" : "bg-red-50"}`}>
                      {determineMovement(index) === "up" ? 
                        <ChevronUp className="h-5 w-5 text-teal-600" /> : 
                        <ChevronDown className="h-5 w-5 text-red-500" />}
                    </div>
                  </div>
                </Link>
              ))
            )}
            {leaderboard.length === 0 && !leaderboardLoading && (
              <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                <Trophy className="h-12 w-12 text-gray-300 mb-2" />
                <p>No leaderboard data available</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side - Recent Tests (unchanged) */}
        <div className="lg:order-2 order-1 bg-white rounded-2xl p-3 sm:p-5 shadow-sm">
          <div className="flex justify-between gap-3 items-center">
            <div>
              <h3 className="sm:text-xl text-xl text-[#211951] md:text-2xl font-bold">Recent Tests</h3>
              <p className="text-[13px] text-[#697177]">Your recent scores at once</p>
            </div>
            <Link to={`/dashboard`}>
              <button className="cursor-pointer flex justify-between gap-x-2 items-center px-3 py-2 mr-1 sm:mr-2 font-semibold rounded-md bg-[#EEF1FF] text-[#516FFA]">
                <span>Show More</span>{" "}
                <LuChevronRight size={19}></LuChevronRight>
              </button>
            </Link>
          </div>
          <div className="mt-4">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#516FFA]"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTests.map((quiz, index) => (
                  <Link to={`/dashboard/result/${quiz.quizId}`} key={index} className="flex items-center justify-between bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="relative h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-[#5271ff]" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{quiz.subjects.join(", ")}</h3>
                        <p className="text-sm text-gray-500">{quiz.chapters.join(", ")}</p>
                        <p className="text-xs text-gray-400">{formatDate(quiz.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full">
                        <Award className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">{quiz.stars * 30} XP</span>
                      </div>
                      <div className="flex items-center gap-1 bg-[#edf0ff] px-3 py-1.5 rounded-full">
                        <span className="text-sm font-medium text-[#516FFA]">{quiz.correctAnswers}/{quiz.totalQuestions}</span>
                      </div>
                    </div>
                  </Link >
                ))}
                {recentTests.length === 0 && !loading && (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                    <BookOpen className="h-12 w-12 text-gray-300 mb-2" />
                    <p>No recent tests found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeshLeaderboard;