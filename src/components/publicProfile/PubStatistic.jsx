import { Award, Star } from "lucide-react";
import { BiTrophy } from "react-icons/bi";
import { MdOutlineStarRate } from "react-icons/md";

const PubStatistic = ({ stats }) => {
  return (
    <div>
      <div className=" grid grid-cols-1 lg:grid-cols-2 justify-between gap-8   mt-10">
        <div className=" bg-[#EDF0FF] rounded-lg px-6 md:px-10 py-8 md:py-12">
          <div className="space-y-3">
            <div className=" flex justify-center items-center gap-x-1">
            <Star size={28}/>
              <h2 className="text-4xl text-center font-medium">
                Total XP
              </h2>
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-8xl text-center text-[#5271FF] font-bold">
              {stats?.totalStars * 30 || 0}
              </h2>           
          </div>
        </div>
        <div className=" bg-[#EDF0FF] rounded-lg px-6 md:px-10 py-8 md:py-12">
          <div className="space-y-3">
            <div className=" flex justify-center items-center gap-x-1">
            <BiTrophy  size={28}/>
              <h2 className="text-4xl text-center font-medium">
              Level
              </h2>
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-8xl text-center text-[#5271FF] font-bold">
              10 (static data)
              </h2>           
          </div>
        </div>
        <div className=" bg-[#EDF0FF] rounded-lg px-6 md:px-10 py-10 md:py-16">
          <h2 className="text-2xl md:text-4xl font-medium pb-6">
            Achievements
          </h2>
          <div className="space-y-5">
            <div className="bg-[#A0B1FE] flex items-center gap-x-2 rounded-lg py-2 md:py-3 px-4 md:px-5 ">
              <Award size={35} />
              <p className="text-lg font-medium">Top performer</p>
            </div>
            <div className="bg-[#A0B1FE] flex items-center gap-x-2 rounded-lg py-2 md:py-3 px-4 md:px-5 ">
              <BiTrophy size={35} />
              <p className="text-lg font-medium">Science Champion</p>
            </div>
            <div className="bg-[#A0B1FE] flex items-center gap-x-2 rounded-lg py-2 md:py-3 px-4 md:px-5 ">
              <MdOutlineStarRate size={35} />
              <p className="text-lg font-medium">Math Wizard</p>
            </div>
          </div>
        </div>
        <div className=" bg-[#EDF0FF] rounded-lg px-6 md:px-10 py-10 md:py-16">
          <h2 className="text-2xl md:text-4xl font-medium pb-6">
            Leaderboard position
          </h2>
          <div className="space-y-5">
            <div className="">
              <h2 className="text-5xl sm:text-6xl md:text-8xl text-center text-[#5271FF] font-bold">
                #{stats?.currentPosition || 0}
              </h2>
              <p className="text-2xl md:text-3xl text-center text-[#ACB8C2] ">
                Overall Rank
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mock tests Section  */}
      <div className="bg-[#EDF0FF] grid grid-cols-1 md:grid-cols-3 justify-between items-center gap-8 px-6 md:px-10 py-10 md:py-16 rounded-lg mt-10">
        <div className="text-center md:border-r-[2px] md:border-gray-300">
          <h2 className="text-3xl lg:text-4xl font-semibold">Mock tests</h2>
          <p className="text-5xl lg:text-6xl font-bold text-[#5271FF]">{stats?.totalQuizzes || 0}</p>
        </div>
        <div className="text-center md:border-r-[2px] md:border-gray-300">
          <h2 className="text-3xl lg:text-4xl font-semibold">Challenges</h2>
          <p className="text-5xl lg:text-6xl text-[#5271FF] font-bold">{stats?.totalChallenges || 0}</p>
        </div>
        <div className="text-center ">
          <h2 className="text-3xl lg:text-4xl font-semibold">Stars</h2>
          <p className="text-5xl lg:text-6xl text-[#5271FF] font-bold">{stats?.totalStars || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default PubStatistic;
