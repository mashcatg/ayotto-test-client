import { ArrowUpRight, CirclePlay, FileText, Filter, LoaderPinwheel, Search, Send, Swords } from "lucide-react";
import { Award } from "lucide-react";
import { FaStar } from "react-icons/fa6";

const WhyWe = () => {
  const leaderData = [
    {
      name: "Istiaque Zaman",
      location: "xyz college, ctg",
      image: "https://i.ibb.co.com/SydpJcK/fonoa.png",
      rating: "4.5",
    },
    {
      name: "Mashraf Amin",
      location: "abc college, ctg",
      image: "https://i.ibb.co.com/Vvxkpbm/mycase.png",
      rating: "4.5",
    },
  ];
  return (
    <div className="bg-white">
      <div
        id="features"
        className="px-3 max-w-7xl mx-auto mt-12 md:mt-20 pb-16 p-3"
      >
        <div className="pb-12 md:pb-20">
          <h2 className="text-3xl md:text-4xl text-center font-bold">
            What do we <span className="text-[#5271ff] ">offer</span>?
          </h2>
          <p className="md:text-lg md:w-3xl mx-auto text-center text-[#5F5981] pt-3 ">
            Quickly Build, Customize, and Launch Your Own Learning Platform—No
            Coding, No Hassle.
          </p>
        </div>
        <div className="grid grid-cols-1  lg:grid-cols-8 justify-between gap-12 ">
          {/* card 1  */}
          <div className="lg:col-span-5">
            <div className="border border-[#7C93FB] p-6 h-full rounded-3xl md:rounded-4xl">
              <div className="">
                <div className="flex justify-between gap-x-5">
                  <h2 className="text-3xl md:text-4xl  font-bold">
                    Gamifying your
                    <span className="text-[#516FFA] "> boring mcqs</span>
                  </h2>
                  <ArrowUpRight size={45} className="text-4xl font-bold text-[#516FFA]" />
                </div>
                <p className="md:text-lg text-[#8f8c8c] pt-3 w-full md:max-w-lg">
                  Quickly Build, Customize, and Launch Your Own Learning
                  Platform—No Coding, No Hassle.
                </p>
              </div>
              <div className="bg-[#F4F5F5] px-5 pt-3  rounded-3xl mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[15px] md:text-[16px] w-max text-[#1D1D1D]">
                    1) This is the hardest question
                  </span>
                  <span className="text-[11px] md:text-[14px] text-[#1D1D1D] inline-block">
                    [JB 22, DB 21]
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-x-4 gap-y-[10px] mt-2">
                  <p className="text-[13px]  text-[#48494A] bg-[#E5E7EA] py-[6px] px-3 rounded-lg">
                    a) This is the hardest question
                  </p>
                  <p className="text-[13px]  text-[#48494A] bg-[#E5E7EA] py-[6px] px-3 rounded-lg">
                    b) Jani nah
                  </p>
                  <p className="text-[13px]  text-[#48494A] bg-[#E5E7EA] py-[6px] px-3 rounded-lg">
                    c) No answer
                  </p>
                  <p className="text-[13px]  text-[#48494A] bg-[#E6F4E7] border border-[#DAF3DD] py-[6px] px-3 rounded-lg">
                    d) All answer
                  </p>
                </div>
                <div className="bg-[#E6F4E7] border border-[#C9EFC2] rounded-lg mt-4 pt-2 px-2">
                  <h3 className="text-lg font-semibold">Solution: </h3>
                  <p className="text-[13px] text-[#48494A] pt-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nostrum repudiandae voluptate.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* card 2 */}
          <div className="lg:col-span-3">
            <div className="hover:bg-[#5271FF] group transition duration-500 border bg-[#EDF1FF] border-[#7C93FB] p-7 h-full rounded-3xl md:rounded-4xl">
              <div className="">
                <div className="flex justify-between gap-x-5">
                  <h2 className="text-3xl md:text-4xl transition duration-500 group-hover:text-white font-bold">
                    Challenge Friends
                  </h2>
                  <ArrowUpRight size={45} className="text-4xl font-bold   transition duration-500 text-[#5271FF]   group-hover:text-white" />
                </div>
                <p className="md:text-lg text-[#7c808f] transition duration-500 group-hover:text-[#DCE3FF] pt-3 w-full md:max-w-lg">
                  Quickly Build, Customize, and Launch Your Own Learning
                </p>
              </div>
              <div className="bg-[#5271FF] transition duration-500 group-hover:bg-white p-5 rounded-4xl mt-4 space-y-5">
                <div className=" flex justify-between items-center gap-x-3">
                  <span className="w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] rounded-full transition duration-500 bg-white group-hover:bg-[#5271FF]"></span>
                  <div className="flex-1">
                    <h3 className="text-[14px] sm:text-[16px]  font-semibold text-[#ffffff] transition duration-500 group-hover:text-[#000000] ">
                      Hassan
                    </h3>
                    <p className="text-[#e3eff7] transition duration-500 group-hover:text-[#9aa0a4] text-[13px]">
                      CCPC
                    </p>
                  </div>
                  <div className="">
                    <button className="bg-white group-hover:bg-[#5271FF] transition duration-500 py-2 px-4 rounded-full text-black  text-[14px] sm:text-[16px] group-hover:text-white">
                      Challenge
                    </button>
                  </div>
                </div>
                <div className=" flex justify-between items-center gap-x-3">
                  <span className="w-[40px] sm:w-[44px] h-[40px] sm:h-[44px] rounded-full transition duration-500 bg-white group-hover:bg-[#5271FF]"></span>
                  <div className="flex-1">
                    <h3 className="text-[14px] sm:text-[16px]  font-semibold text-[#ffffff] transition duration-500 group-hover:text-[#000000]">
                      Afrin
                    </h3>
                    <p className="text-[#e3eff7] transition duration-500 group-hover:text-[#9aa0a4] text-[13px]">
                      CGPS
                    </p>
                  </div>
                  <div className="">
                    <button className="bg-white group-hover:bg-[#5271FF] transition duration-500 py-2 px-4  rounded-full text-black  text-[14px] sm:text-[16px] group-hover:text-white">
                      Challenge
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* card 3 */}
          <div className="lg:col-span-3">
            <div className="hover:bg-[#5271FF] group transition duration-500 border bg-[#EDF1FF] border-[#7C93FB] p-7 h-full rounded-3xl md:rounded-4xl">
              <div className="">
                <div className="flex justify-between gap-x-5">
                  <h2 className="text-3xl md:text-4xl transition duration-500 group-hover:text-white font-bold">
                    Real-time Leaderboard
                  </h2>
                  <ArrowUpRight size={45} className="text-4xl font-bold   transition duration-500 text-[#5271FF]   group-hover:text-white" />
                </div>
                <p className="md:text-lg text-[#7c808f] transition duration-500 group-hover:text-[#DCE3FF] pt-3 w-full md:max-w-lg">
                  Quickly Build, Customize, and Launch Your Own Learning
                </p>
              </div>
              <div className="mt-4">
                <div className=" transition duration-500 bg-[#516FFA] group-hover:bg-white rounded-2xl p-3 ">
                  <div className="flex justify-between gap-2 items-center  mr-1 sm:mr-2 ">
                    <div>
                      <h3 className="text-[14px] text-white transition duration-500 group-hover:text-black font-semibold">
                        Leaderboard
                      </h3>
                      <p className="text-[8px] text-white transition duration-500 group-hover:text-[#697177]">
                        Find the legends in the App
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <button className="cursor-pointer flex  justify-between gap-x-1 text-[10px] h-[27px] items-center px-[5px] py-[2px] font-semibold rounded-md bg-[#EEF1FF] text-[#516FFA] ">
                        <span>Last week</span>
                        <Filter className="text-[#516FFA]" size={15} />
                      </button>
                      <button className="bg-[#F0F1F5] rounded-lg p-1 w-[30px] h-[30px] flex justify-center items-center">
                      <Search
                          className="  text-[#000000]"
                          size={18}
                        ></Search>
                      </button>
                    </div>
                  </div>
                  <div className="">
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
                              <p className="text-[8px] font-semibold  text-white transition duration-500 group-hover:text-[#516FFA]  ">
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
                                className="w-5 h-5 object-cover rounded-full hover:scale-105 duration-300"
                              />
                            </td>
                            <td className="text-start">
                              <p className="text-[12px] font-semibold text-white transition duration-500 group-hover:text-[#171137]  ">
                                {item.name}
                              </p>
                              <p className="text-[8px] text-white transition duration-500 group-hover:text-[#697177]   ">
                                {item.location}
                              </p>
                            </td>
                            <td className="flex justify-end ">
                              <div className="flex items-center gap-x-2 ">
                                <div className="w-[30px] h-[30px] flex flex-col justify-center gap-y-0 items-center bg-[#FFF5CA] rounded-lg p-[1px] "><FaStar
                                      size={14}
                                      className="text-[#FFDE59]"
                                    ></FaStar><span className="text-[#4E4669] text-[8px] font-semibold">
                                      {item.rating}k
                                    </span>
                                </div>
                                <div className="flex justify-center items-center w-[30px] h-[30px] bg-[#D8FFF5] rounded-lg p-2">
                                  <p className="text-black p-1 rounded-full flex justify-center items-center ">
                                  <CirclePlay 
                                      className="-rotate-90  "
                                      size={22}
                                    ></CirclePlay>
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* card 4 */}
          <div className="lg:col-span-5">
            <div className="border border-[#7C93FB] p-6 h-full rounded-3xl md:rounded-4xl">
              <div className="">
                <div className="flex justify-between gap-x-5">
                  <h2 className="text-3xl md:text-4xl  font-bold">
                    Rich Question Bank
                    <span className="text-[#516FFA] "> & Mock Tests</span>
                  </h2>
                  <ArrowUpRight size={45} className="text-4xl font-bold text-[#516FFA]" />
                </div>
                <p className="md:text-lg text-[#8f8c8c] pt-3 w-full md:max-w-lg">
                  Quickly Build, Customize, and Launch Your Own Learning
                  Platform—No Coding, No Hassle.
                </p>
              </div>
              {/* grid section */}
              <div className=" mt-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 ">
                  <div className="md:col-span-9 flex items-center flex-wrap justify-center md:justify-end gap-4">
                    <button className=" bg-[#5271FF] group hover:bg-[#EDF0FF] transition duration-500 py-2 px-4  rounded-full text-[#DADDFE]  text-[14px] hover:text-[#7089FB] flex justify-between items-center gap-x-1">
                      <span>Rewards</span>{" "}
                      <Award
                        size={20}
                        className="text-[#DADDFE]  group-hover:text-[#7089FB]"
                      ></Award>
                    </button>
                    <button className="bg-[#EDF0FF] group hover:bg-[#5271FF] transition duration-500 py-2 px-4  rounded-full text-[#7089FB]  text-[14px] hover:text-[#DADDFE] flex justify-between items-center gap-x-1">
                      <span>Analyze Your Progress</span>
                      <LoaderPinwheel
                        size={20}
                        className="text-[#7089FB]  group-hover:text-[#DADDFE]"
                      ></LoaderPinwheel>
                    </button>
                    <button className=" bg-[#5271FF] hover:bg-[#EDF0FF] transition group duration-500 py-2 px-4  rounded-full text-[#DADDFE]  text-[14px] hover:text-[#7089FB] flex justify-between items-center gap-x-1">
                      <span>Count Your XP</span>{" "}
                      <FaStar
                        size={20}
                        className="text-[#DADDFE]  group-hover:text-[#7089FB]"
                      ></FaStar>
                    </button>
                    <button className="bg-[#EDF0FF] group hover:bg-[#5271FF] transition duration-500 py-2 px-4  rounded-full text-[#7089FB]  text-[14px] hover:text-[#DADDFE] flex justify-between items-center gap-x-1">
                      <span>Badges</span>{" "}
                      <Award
                        size={20}
                        className="text-[#7089FB]  group-hover:text-[#DADDFE]"
                      ></Award>
                    </button>
                    <button className=" bg-[#5271FF] hover:bg-[#EDF0FF] transition group duration-500 py-2 px-4  rounded-full text-[#DADDFE]  text-[14px] hover:text-[#7089FB] flex justify-between items-center gap-x-1">
                      <span>Share with friends & Family</span>{" "}
                      <Send
                        size={20}
                        className="text-[#DADDFE]  group-hover:text-[#7089FB]"
                      ></Send>
                    </button>
                    <button className="bg-[#EDF0FF] group hover:bg-[#5271FF] transition duration-500 py-2 px-4  rounded-full text-[#7089FB]  text-[14px] hover:text-[#DADDFE] flex justify-between items-center gap-x-1">
                      <span>Badges</span>{" "}
                      <Award
                        size={20}
                        className="text-[#7089FB]  group-hover:text-[#DADDFE]"
                      ></Award>
                    </button>
                    <button className=" py-1  ">
                      <ArrowUpRight 
                        size={30}
                        className="text-[#7089FB] transition duration-500 hover:text-[#58585d]"
                      ></ArrowUpRight>
                    </button>
                  </div>

                  <div className="md:col-span-3">
                    <button className="bg-[#EDF0FF] w-full hover:bg-[#5271FF] transition duration-500 py-2 px-4   rounded-3xl text-[#7089FB]  text-[14px] hover:text-[#DADDFE] text-start">
                      <span className="text-center md:text-start">
                        Board <br className="hidden md:block" /> Test Questions
                        <br className="hidden md:block" /> Others
                      </span>
                    </button>
                  </div>
                  {/* down */}
                  <div className="md:col-span-3 "></div>

                  <div className="md:col-span-9 flex items-center flex-wrap justify-center md:justify-end gap-x-3 gap-y-4">
                  <button className=" bg-[#5271FF] hover:bg-[#EDF0FF] transition group duration-500 py-2 px-4  rounded-full text-[#DADDFE]  text-[12px] hover:text-[#7089FB] flex justify-between items-center gap-x-1">
                      <span>Topic-wise</span>{" "}
                      <FileText 
                        size={20}
                        className="text-[#DADDFE]  group-hover:text-[#7089FB]"
                      ></FileText>
                    </button>
                    <button className="bg-[#EDF0FF] group hover:bg-[#5271FF] transition duration-500 py-2 px-4  rounded-full text-[#7089FB]  text-[12px] hover:text-[#DADDFE] flex justify-between items-center gap-x-1">
                      <span>Challenge Friends</span>
                      <Swords
                        size={20}
                        className="text-[#7089FB]  group-hover:text-[#DADDFE]"
                      ></Swords>
                    </button>
                    <button className=" bg-[#5271FF] hover:bg-[#EDF0FF] transition group duration-500 py-2 px-4  rounded-full text-[#DADDFE]  text-[12px] hover:text-[#7089FB] flex justify-between items-center gap-x-1">
                      <span>Rewards</span>{" "}
                      <FaStar
                        size={20}
                        className="text-[#DADDFE]  group-hover:text-[#7089FB]"
                      ></FaStar>
                    </button>
                    <button className=" bg-[#5271FF] hover:bg-[#EDF0FF] transition group duration-500 py-2 px-4  rounded-full text-[#DADDFE]  text-[12px] hover:text-[#7089FB] flex justify-between items-center gap-x-1">
                      <span>Topic-wise</span>{" "}
                      <FileText 
                        size={20}
                        className="text-[#DADDFE]  group-hover:text-[#7089FB]"
                      ></FileText>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyWe;
