import { BookOpen, Home, Star } from "lucide-react";
import DeshLeaderboard from "./DeshLeaderboard";
import UpdateBatchGroup from '../auth/UpdateBatchGroup'
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useGetProfileStats from "../../hooks/useGetProfileStats";

const UserDashHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { statsData } = useGetProfileStats();

  

  console.log(statsData);

  // console.log(user);

  useEffect(() => {
    if (user && (!user.groupId || !user.groupId)) {
      setIsOpen(true);
    }
  }, [user]);


  return (
    <div className="flex flex-col bg-[#FAFAFC] max-w-7xl min-h-screen p-6">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
        {/* Position Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden h-40">
          <div className="relative z-10">
            <h2 className="text-gray-600 text-sm mb-2">Position</h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{statsData?.currentPosition}</span>
              <sub className="text-gray-500 ml-1">th</sub>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 rotate-12">
            <div className="bg-blue-100/50 rounded-xl p-12">
              <Home className="text-blue-600 w-24 h-24" />
            </div>
          </div>
        </div>

        {/* Tests Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden h-40">
          <div className="relative z-10">
            <h2 className="text-gray-600 text-sm mb-2">Tests</h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{statsData?.totalQuizzes}</span>
              <span className="text-gray-500 ml-2 text-sm">in total</span>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 -rotate-12">
            <div className="bg-blue-100/50 rounded-xl p-12">
              <BookOpen className="text-blue-600 w-24 h-24" />
            </div>
          </div>
        </div>

        {/* Stars Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden h-40">
          <div className="relative z-10">
            <h2 className="text-gray-600 text-sm mb-2">XP</h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{statsData?.totalStars * 30} </span>
              <span className="text-gray-500 ml-2 text-sm">last week</span>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 rotate-12">
            <div className="bg-blue-100/50 rounded-xl p-12">
              <Star className="text-blue-600 w-24 h-24" />
            </div>
          </div>
        </div>
      </div>
      {/* DeshLeaderboard */}
      <div>
        <DeshLeaderboard></DeshLeaderboard>
      </div>
      <UpdateBatchGroup isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default UserDashHome;
