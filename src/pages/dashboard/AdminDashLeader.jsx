import { LuChevronRight } from "react-icons/lu";
import { RiPlayLargeFill } from "react-icons/ri";
import { TiStar } from "react-icons/ti";
import AdminDashChart from "./AdminDashChart";
import { Link } from "react-router-dom";

const AdminDashLeader = () => {
  const leaderData = [
    {
      name: "Mufazzal Hossain Yamin",
      location: "Dhaka",
      image: "https://i.ibb.co.com/SydpJcK/fonoa.png",
      rating: "4.5",
    },
    {
      name: "MD Arman Khan",
      location: "Dhaka",
      image: "https://i.ibb.co.com/Vvxkpbm/mycase.png",
      rating: "4.5",
    },
    {
      name: "Muhammad Abu Bakar",
      location: "Dhaka",
      image: "https://i.ibb.co.com/2KJjgz4/Computer-Logo.png",
      rating: "4.5",
    },
  ];
  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-between gap-8">
        <div className=" bg-white rounded-2xl p-3 sm:p-5">
          <div className="flex justify-between gap-3 items-center">
            <div>
              <h3 className="sm:text-2xl text-xl md:text-3xl font-semibold">
                Leaderboard
              </h3>
              <p className="text-[14px] text-[#697177]">
                Find the legends in the App
              </p>
            </div>
            <Link to={`/dashboard/leaderboard`} className="">
              <button className="cursor-pointer flex justify-between gap-x-2 items-center px-4 py-1 mr-1 sm:mr-2  font-semibold rounded-md bg-[#EEF1FF] text-[#516FFA] ">
                <span>Show More</span>{" "}
                <LuChevronRight size={19}></LuChevronRight>
              </button>
            </Link>
          </div>
          <div className="mt-2">
            <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-1 sm:border-spacing-x-2">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <tbody className="">
                {leaderData.map((item, i) => (
                  <tr key={i} className="">
                    <td className="">
                      <p className="text-[16px] font-semibold text-[#516FFA]">
                        #{i + 1}
                      </p>
                    </td>
                    <td className="">
                      <img
                        src={
                          item.image
                            ? item.image
                            : "https://i.ibb.co.com/qYkFJ9X7/error-image.png"
                        }
                        alt=""
                        className="w-10 h-10 object-cover rounded-full hover:scale-105 duration-300"
                      />
                    </td>
                    <td className="">
                      <p className="text-[15px] sm:text-lg font-semibold text-[#171137] ">
                        {item.name}
                      </p>
                      <p className="text-[14px] text-[#697177] ">
                        {item.location}
                      </p>
                    </td>
                    <td className="bg-[#EEF1FF] rounded-lg px-2">
                      <p className="flex flex-col justify-center items-center  ">
                        <TiStar size={25}></TiStar>
                        <span className="text-[#516FFA] font-semibold">
                          {item.rating}k
                        </span>
                      </p>
                    </td>
                    <td className="bg-[#EEF1FF] rounded-lg px-2">
                      <div className="flex justify-center items-center ">
                        <p className=" bg-[#131729] w-8 h-8 rounded-full flex justify-center items-center ">
                          <RiPlayLargeFill
                            className="-rotate-90 text-white"
                            size={20}
                          ></RiPlayLargeFill>
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Right side  */}
        <div className=" bg-white rounded-2xl p-3 sm:p-5">
          <div>
            <h3 className="sm:text-2xl text-xl md:text-3xl font-semibold">
              Quiz Submissions History
            </h3>
            <p className="text-[14px] text-[#697177]">
              Last 7days quiz submissions history at once
            </p>
          </div>
          <div className="mt-2">
            <AdminDashChart></AdminDashChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashLeader;
