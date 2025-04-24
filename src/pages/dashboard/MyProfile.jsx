import { MdVerified } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import UserStatistic from "../../components/profile/UserStatistic";
import AdminStatistic from "../../components/profile/AdminStatistic";
import useRole from "../../hooks/useRole";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import PerformanceChart from "../../components/shared/PerformanceChart";
import { useEffect } from "react";
import useGetProfileStats from "../../hooks/useGetProfileStats";

const MyProfile = () => {
  const { user } = useAuth();
  const role = useRole();
  const axios = useAxios();

  console.log(role);

  const { statsData, refetchStats } = useGetProfileStats();

  // Profile Data Query
  const { data: profileData, refetch: refetchProfile } = useQuery({
    queryKey: ['profile', user?._id],
    enabled: false,
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/user/profile/${user?._id}`);
        return data.data;
      } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
    }
  });

  const { data: weeklyProgress, refetch: refetchWeekly } = useQuery({
    queryKey: ['weekly-progress', user?._id],
    enabled: false,
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/user/weekly-progress/${user?._id}`);
        return data.data;
      } catch (error) {
        console.error("Error fetching weekly progress:", error);
        return null;
      }
    }
  });

  // Fetch leaderboard position
  // const fetchLeaderboardPosition = async () => {
  //   try {
  //     const response = await axios.get(`/leaderboard?page=1&limit=3`);
  //     if (response.data.success) {
  //       setLeaderboardPosition(response.data.myPosition);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching leaderboard:", error);
  //   }
  // };

  // Fetch data when component mounts or user changes
  useEffect(() => {
    if (user?._id) {
      refetchProfile();
      refetchStats();
      refetchWeekly();
    }
  }, [user?._id, refetchProfile, refetchStats, refetchWeekly]);

  return (
    <div className="mb-12">
      {/* Profile Header */}
      <div className="bg-[#EDF0FF] grid grid-cols-1 lg:grid-cols-2 justify-between items-center gap-8 px-6 md:px-10 py-10 md:py-16 rounded-lg">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-x-5">
          <img
            className="w-[140px] h-[140px] rounded-full border-3 border-[#836FFF]"
            src={profileData?.avatar}
            alt={profileData?.name}
          />
          <div className="space-y-[6px] flex-1">
            <p className="flex items-center gap-x-1">
              <span className="text-2xl w-max md:text-3xl font-semibold text-black">
                {profileData?.name}
              </span>
              <span className="inline-block text-[#516FFA]">
                <MdVerified size={25} />
              </span>
            </p>
            <p className="flex justify-center lg:justify-start items-center gap-x-2 text-sm text-[#77787A]">
              <span>{profileData?.group}</span>
              <span>{profileData?.phone}</span>
            </p>
            <p className="flex justify-center lg:justify-start items-center text-[18px] gap-x-2">
              <span>{profileData?.followerCount} Followers</span>
              <span>{profileData?.followingCount} Following</span>
            </p>
            <p className="flex justify-center lg:justify-start items-center gap-x-2 text-sm">
              <span className="bg-[#A0B1FE] py-1 px-3 rounded-full">
                {profileData?.batch}
              </span>
              <span className="bg-[#A0B1FE] py-1 px-3 rounded-full">
                {profileData?.group}
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Link to="/dashboard/editProfile">
            <button className="bg-[#B7C4FF] text-[#00005A] transition duration-300 hover:bg-[#a4b4fa] py-2 md:py-3 px-4 md:px-6 rounded-sm">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>

      {/* Statistics */}
      {role === 'user' && <UserStatistic stats={statsData} />
      }
      {
        role === 'admin' && <AdminStatistic userId={user?._id} />
      }


      {/* Performance Chart */}
      {weeklyProgress && weeklyProgress.length > 0 && (
        <PerformanceChart data={weeklyProgress} />
      )}
    </div>
  );
};

export default MyProfile;
