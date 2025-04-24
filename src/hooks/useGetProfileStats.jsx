import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useGetProfileStats = () => {
   const axios = useAxios();
   const { user } = useAuth();

   const { data: statsData, refetch: refetchStats, isLoading } = useQuery({
      queryKey: ['stats', user?._id],
      queryFn: async () => {
         try {
            const { data } = await axios.get(`/user/stats/${user?._id}`);
            return data.data;
         } catch (error) {
            console.error("Error fetching stats:", error);
            return null;
         }
      }
   });

   return { statsData, refetchStats, isLoading }
};

export default useGetProfileStats;