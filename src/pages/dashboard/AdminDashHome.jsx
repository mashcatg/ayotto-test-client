import { BookOpen, Home, Star } from "lucide-react";
import AdminDashLeader from "./AdminDashLeader";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const AdminDashHome = () => {
  const [stats, setStats] = useState({
    questionsAdded: 0,
    totalQuestions: 0,
    contribution: 0
  });
  const axiosSecure = useAxios();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosSecure.get('/user/admin-stats/67c00231ca391f5a3e1dfe2d');
        setStats(response.data.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  return (
    <div className="flex flex-col bg-[#FAFAFC] max-w-7xl min-h-screen p-3">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
        {/* Position Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden h-40">
          <div className="relative z-10">
            <h2 className="text-gray-600 text-sm mb-2">Questions Added</h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{stats.questionsAdded}</span>
              <span className="text-gray-500 ml-2 text-sm">questions</span>
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
            <h2 className="text-gray-600 text-sm mb-2">Total Questions</h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{stats.totalQuestions}</span>
              <span className="text-gray-500 ml-2 text-sm">questions</span>
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
            <h2 className="text-gray-600 text-sm mb-2">Contribution</h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{stats.contribution}</span>
              <span className="text-gray-500 ml-2 text-sm">points</span>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 rotate-12">
            <div className="bg-blue-100/50 rounded-xl p-12">
              <Star className="text-blue-600 w-24 h-24" />
            </div>
          </div>
        </div>
      </div>
      {/* AdminDashLeader */}
      <div>
        <AdminDashLeader></AdminDashLeader>
      </div>
    </div>
  );
};

export default AdminDashHome;