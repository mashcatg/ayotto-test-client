import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Equal, Filter, Star, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

export default function Leaderboard() {
  const axios = useAxios();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState("all"); // Changed default to day
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [previousRankings, setPreviousRankings] = useState({});

  // Debounce search query
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch leaderboard data
  const {
    data: leaderboardData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["leaderboard", timeFilter, page, limit, debouncedSearch],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Always include pagination
      params.append("page", page);
      params.append("limit", limit);

      // Add timeFilter if present
      if (timeFilter) {
        params.append("timeFilter", timeFilter);
      }

      // Add search if present
      if (debouncedSearch) {
        params.append("search", debouncedSearch);
      }

      const response = await axios.get(`/leaderboard?${params}`);

      // Store rankings for movement tracking
      if (response.data.leaderboard?.length > 0) {
        const newRankings = {};
        response.data.leaderboard.forEach((entry) => {
          newRankings[entry._id] = entry.rank;
        });
        setPreviousRankings((prev) => ({ ...prev, ...newRankings }));
      }

      return response.data;
    },
    keepPreviousData: true,
  });

  // Determine movement direction based on previous rankings
  const determineMovement = (userId, currentRank) => {
    if (!previousRankings[userId] || previousRankings[userId] === currentRank) {
      return "same";
    }
    return previousRankings[userId] > currentRank ? "up" : "down";
  };

  // Format number to K format
  const formatNumber = (num) => {
    if (!num) return "0";
    return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num;
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setTimeFilter(filter);
    setPage(1); // Reset to first page
    setIsFilterOpen(false);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page
  };

  // Load more handler
  const handleLoadMore = () => {
    if (!isFetching && leaderboardData?.hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Header section */}
        <div className="flex flex-col xs:flex-row justify-between items-center gap-y-4 xs:items-start">
          <div className="text-center xs:text-left">
            <h1 className="text-2xl font-bold">Leaderboard</h1>
            <p className="text-sm text-gray-500">Find the legends in the App</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="sm:hidden bg-[#F0F1F5] p-3 rounded-full flex items-center gap-2">
              <button className="text-[#434E55] hover:text-black text-xl duration-300 cursor-pointer">
                <HiSearch />
              </button>
            </div>

            <div className="hidden bg-[#F0F1F5] py-2 px-6 rounded-full sm:flex items-center gap-2 max-w-fit lg:max-w-[400px]">
              <input
                type="text"
                className="grow max-w-[100px] lg:max-w-[400px] outline-0 placeholder-[#CBCED3]"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="text-[#434E55] hover:text-black text-xl duration-300 cursor-pointer">
                <HiSearch />
              </button>
            </div>

            {/* Filter dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="h-10 px-4 flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {timeFilter === "day"
                  ? "Today"
                  : timeFilter === "week"
                  ? "Last Week"
                  : timeFilter === "month"
                  ? "Last Month"
                  : "All Time"}
                <Filter className="h-4 w-4" />
              </button>
              <div className={`absolute right-0 mt-1 bg-white shadow-lg rounded-lg overflow-hidden ${isFilterOpen ? "block" : "hidden"} z-10`}>
                <div className="py-1">
                  <button
                    onClick={() => handleFilterChange("day")}
                    className={`block px-4 py-2 text-sm w-full text-left ${timeFilter === "day" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => handleFilterChange("week")}
                    className={`block px-4 py-2 text-sm w-full text-left ${timeFilter === "week" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    Last Week
                  </button>
                  <button
                    onClick={() => handleFilterChange("month")}
                    className={`block px-4 py-2 text-sm w-full text-left ${timeFilter === "month" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    Last Month
                  </button>
                  <button
                    onClick={() => handleFilterChange("all")}
                    className={`block px-4 py-2 text-sm w-full text-left ${timeFilter === "all" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    All Time
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard table */}
        <div className="overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full table-auto">
              <tbody>
                {isLoading ? (
                  // Loading state
                  Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index} className="bg-gray-50 animate-pulse">
                        <td className="p-3 flex items-center gap-4">
                          <div className="w-8 h-6 bg-gray-200 rounded"></div>
                          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                          <div>
                            <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-4">
                            <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : error ? (
                  // Error state
                  <tr>
                    <td colSpan={2} className="p-3">
                      <div className="flex flex-col items-center justify-center py-10 text-red-500">
                        <p>Error loading leaderboard data</p>
                        <button onClick={() => refetch()} className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                          Try Again
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : // Data display
                leaderboardData?.leaderboard?.length > 0 ? (
                  leaderboardData.leaderboard.map((entry, index) => (
                    <tr
                      key={entry._id}
                      className={`bg-white hover:bg-gray-100 transition-colors ${
                        index !== leaderboardData.leaderboard.length - 1 ? "border-b border-gray-100" : ""
                      }`}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2 sm:gap-4">
                          <span className="text-base sm:text-lg font-semibold text-[#5271ff] w-6 sm:w-8 flex-shrink-0">#{entry.rank}</span>
                          <Link to={`/dashboard/public-profile/${entry?._id}`} className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                            <div className="size-full rounded-full bg-blue-100 flex items-center justify-center border-2 border-[#5271ff]">
                              <span className="text-base sm:text-lg font-bold text-[#5271ff]">{entry.name.charAt(0)}</span>
                            </div>
                          </Link>
                          <div className="min-w-0">
                            <h3 className="font-semibold">
                              <Link to={`/dashboard/public-profile/${entry?._id}`}>{entry.name}</Link>
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500">{entry?.institution || entry?.phone || "No details"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-end gap-2 sm:gap-4">
                          <div className="flex items-center gap-1 bg-yellow-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs sm:text-sm font-medium">{formatNumber(entry.totalStars * 30)} XP</span>
                          </div>
                          <div
                            className={`rounded-full p-1 sm:p-2 ${
                              determineMovement(entry._id, entry.rank) === "up"
                                ? "bg-teal-50"
                                : determineMovement(entry._id, entry.rank) === "down"
                                ? "bg-red-50"
                                : "bg-gray-50"
                            }`}
                          >
                            {determineMovement(entry._id, entry.rank) === "up" ? (
                              <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
                            ) : determineMovement(entry._id, entry.rank) === "down" ? (
                              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                            ) : (
                              <Equal className="h-4 w-4 sm:h-5 sm:w-5" />
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="p-3">
                      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                        <Trophy className="h-12 w-12 text-gray-300 mb-2" />
                        <p>No leaderboard data available</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Load More Button */}
        {leaderboardData?.hasMore && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLoadMore}
              disabled={isFetching}
              className="bg-[#B7C4FF] text-[#00005A] transition duration-300 hover:bg-[#a4b4fa] py-2 px-6 rounded-sm disabled:opacity-50"
            >
              {isFetching ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
