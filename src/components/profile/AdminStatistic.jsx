import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { format } from "date-fns";
import QuestionRenderer from "../CustomEditor/QuestionRenderer";
import useRole from "../../hooks/useRole";

const AdminStatistic = ({ userId }) => {
  const axios = useAxios();
  const role = useRole();


  console.log(role);


  // Fetch admin stats
  const { data: adminStats, isLoading } = useQuery({
    queryKey: ['admin-stats', userId],
    queryFn: async () => {
      const { data } = await axios.get(`/user/admin-stats/${userId}`);
      return data.data;
    },
    enabled: !!userId
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Stats Section */}
      <div className="bg-[#EDF0FF] grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-8 px-6 md:px-10 py-10 md:py-16 rounded-lg mt-10">
        <div className="text-center md:border-r-[2px] md:border-gray-300">
          <h2 className="text-3xl lg:text-4xl font-semibold">Your Questions</h2>
          <p className="text-5xl lg:text-6xl font-bold text-[#5271FF]">
            {adminStats?.questionsAdded || 0}
          </p>
        </div>
        <div className="text-center md:border-r-[2px] md:border-gray-300">
          <h2 className="text-3xl lg:text-4xl font-semibold">Total Questions</h2>
          <p className="text-5xl lg:text-6xl text-[#5271FF] font-bold">{adminStats?.totalQuestions || 0}</p>
        </div>
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold">Coming...</h2>
          <p className="text-5xl lg:text-6xl text-[#5271FF] font-bold">0</p>
        </div>
      </div>

      {/* Recent Questions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-8 mt-10">
        <div className="bg-[#EDF0FF] rounded-lg px-6 md:px-10 py-10 md:py-16">
          <div className="flex justify-between items-center gap-5 pb-6">
            <h2 className="text-3xl md:text-4xl font-medium">
              Recent questions
            </h2>
            <button className="bg-[#B7C4FF] text-[#00005A] transition duration-300 hover:bg-[#a4b4fa] py-[5px] md:py-3 px-4 md:px-6 rounded-sm">
              See all ❯
            </button>
          </div>
          <div className="mt-2">
            <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-1 sm:border-spacing-x-2">
              <thead className="dark:bg-gray-300">
                <tr>
                  <th className="text-start">Question</th>
                  <th className="text-start">Date</th>
                </tr>
              </thead>
              <tbody>
                {adminStats?.recentQuestions?.map((question) => (
                  <tr key={question.id}>
                    <td className="py-2">
                      <div className="line-clamp-2" title={question.title}>
                        <QuestionRenderer
                          content={question.title}
                          className="text-[15px] sm:text-lg font-medium text-[#000000]"
                        />
                      </div>
                    </td>
                    <td className="text-sm text-gray-500">
                      {format(new Date(question.date), 'MMM dd, yyyy')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#EDF0FF] rounded-lg px-6 md:px-10 py-10 md:py-16">
          <h2 className="text-2xl md:text-4xl font-medium pb-6">
            Total Questions Added
          </h2>
          <div className="space-y-5">
            <div>
              <h2 className="text-5xl sm:text-6xl md:text-8xl text-center text-[#5271FF] font-bold">
                {adminStats?.totalQuestions || 0}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistic;
