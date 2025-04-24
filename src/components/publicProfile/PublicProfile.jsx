import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { MdVerified } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import PubStatistic from "./PubStatistic";
import PerformanceChart from "../../components/shared/PerformanceChart";
import { useEffect, useState } from "react";

const PublicProfile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const axios = useAxios();

  // Profile Data Query
  const { data: profileData, refetch: refetchProfile } = useQuery({
    queryKey: ['profile', userId],
    enabled: false, // Disable auto-fetch
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/user/profile/${userId}`);
        return data.data;
      } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
    }
  });

  // Stats Data Query
  const { data: statsData, refetch: refetchStats } = useQuery({
    queryKey: ['stats', userId],
    enabled: false,
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/user/stats/${userId}`);
        return data.data;
      } catch (error) {
        console.error("Error fetching stats:", error);
        return null;
      }
    }
  });

  // Weekly Progress Query
  const { data: weeklyProgress, refetch: refetchWeekly } = useQuery({
    queryKey: ['weekly-progress', userId],
    enabled: false,
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/user/weekly-progress/${userId}`);
        return data.data;
      } catch (error) {
        console.error("Error fetching weekly progress:", error);
        return null;
      }
    }
  });



  // Fetch data when userId changes
  useEffect(() => {
    if (userId) {
      refetchProfile();
      refetchStats();
      refetchWeekly();;
    }
  }, [userId, refetchProfile, refetchStats, refetchWeekly]);

  const isOwnProfile = user?._id === userId;

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
            {/* Only show phone number if it's own profile */}
            {isOwnProfile && (
              <p className="flex justify-center lg:justify-start items-center gap-x-2 text-sm text-[#77787A]">
                <span>{`${0}${profileData?.phone || ''}`}</span>
              </p>
            )}
            <p className="flex justify-center lg:justify-start items-center text-[18px] gap-x-2">
              <span>{profileData?.followerCount || 0} Followers</span>
              <span>{profileData?.followingCount || 0} Following</span>
            </p>
            {/* Show batch and group for everyone */}
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
        {/* Show Edit Profile button for own profile, Follow button for others */}
        {isOwnProfile && (
          <div className="flex justify-end">
            <Link to="/dashboard/editProfile">
              <button className="bg-[#B7C4FF] text-[#00005A] transition duration-300 hover:bg-[#a4b4fa] py-2 md:py-3 px-4 md:px-6 rounded-sm">
                Edit Profile
              </button>
            </Link>
        </div>)}
      {!isOwnProfile && (
                <div className="flex justify-end mt-4">
                  <Link to={`/dashboard/add-friend/${userId}`}>
                    <button className="bg-[#B7C4FF] text-[#00005A] transition duration-300 hover:bg-[#a4b4fa] py-2 md:py-3 px-4 md:px-6 rounded-sm flex items-center gap-x-2">
                      <IoMdAdd size={20} />
                      Follow
                    </button>
                  </Link>
                </div>
              )}
      </div>
      {/* Statistics */}
      <PubStatistic stats={statsData} />

      {/* Performance Chart */}
      {weeklyProgress && <PerformanceChart data={weeklyProgress} />}
  
              
    </div>
    
        

  );
};

export default PublicProfile;
