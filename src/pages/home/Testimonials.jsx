const Testimonials = () => {
  const studentData = [
    {
      name: "Ayaan Khan",
      className: "Intermediate 1st year",
      image: "https://i.ibb.co.com/3c9JHs0/team-1.webp",
      bio: "A blockchain enthusiast passionate about decentralized applications and smart contracts.A blockchain enthusiast passionate about decentralized applications and smart contracts",
    },
    {
      name: "Sophia Rahman",
      className: "Intermediate 1st year",
      image: "https://i.ibb.co.com/1XKpsRj/team-2.webp",
      bio: "A blockchain enthusiast passionate about decentralized applications and smart contracts.A blockchain enthusiast passionate about decentralized applications and smart contracts",
    },
    {
      name: "Ethan Walker",
      className: "Intermediate 1st year",
      image: "https://i.ibb.co.com/5WzjYLr/team-2.png",
      bio: "A blockchain enthusiast passionate about decentralized applications and smart contracts. A blockchain enthusiast passionate about decentralized applications and smart contracts",
    },
    {
      name: "Hana Kim",
      className: "Intermediate 2nd year",
      image: "https://i.ibb.co.com/G7VMBxc/ManRead.png",
      bio: "A blockchain enthusiast passionate about decentralized applications and smart contracts.",
    },
    {
      name: "Liam Chen",
      className: "Intermediate 1st year",
      image: "https://i.ibb.co.com/3c9JHs0/team-1.webp",
      bio: "A blockchain enthusiast passionate about decentralized applications and smart contracts.",
    },
    {
      name: "Aisha Patel",
      className: "Intermediate 2nd year",
      image: "https://i.ibb.co.com/3c9JHs0/team-1.webp",
      bio: "A blockchain enthusiast passionate about decentralized applications and smart contracts.",
    },
    {
      name: "Noah Smith",
      className: "Intermediate 2nd year",
      image: "https://i.ibb.co.com/5WzjYLr/team-2.png",
      bio: "A blockchain enthusiast passionate about decentralized applications and smart contracts.",
    },
    {
      name: "Emma Johnson",
      className: "Intermediate 1st year",
      image: "https://i.ibb.co.com/5WzjYLr/team-2.png",
      bio: "A blockchain enthusiast passionate about decentralized applications and smart contracts.",
    },
  ];
  return (
    <div className="bg-white relative">
      <div className="px-3 max-w-7xl mx-auto mt-12 md:mt-20 pb-16 ">
        <div className="pb-12 md:pb-20">
        <h2 className=" text-3xl md:text-4xl text-center font-bold">
          <span className="text-[#5271ff] ">What People </span>
          say about us
        </h2>
        <p className=" mx-auto text-center md:text-lg text-[#8f8c8c] pt-3">
            Quickly Build, Customize, and Launch Your Own Learning Platform—No
            Coding, No Hassle.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between gap-6 ">
          {studentData.map((item, i) => (
            <div key={i}>
              <div
                className={`p-5 bg-[#EEF1FF] rounded-3xl ${
                  i % 3 === 1 ? "md:translate-y-[50px]" : ""
                } 
                ${
                  i % 2 === 1 ? "sm:translate-y-[50px] md:translate-y-0" : ""
                } `}
              >
                <div className="flex  space-x-3 ">
                  <div className=" ">
                    <img
                      className="rounded-full w-[60px] h-[60px]"
                      src={item?.image}
                      alt="pic"
                    />
                  </div>
                  <div>
                    <h2 className="text-[22px] md:text-[25px] font-semibold">
                      {item?.name}
                    </h2>
                    <p className="text-[14px] md:text-[16px] text-[#8f8c8c]">
                      {item?.className ? item?.className : "No class name"}
                    </p>
                  </div>
                </div>
                <div className="pt-3">
                  <p className="text-[14px] md:text-[16px] text-[#434040] font-semibold">
                    {item?.bio ? item?.bio : "No bio"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-linear-to-t from-white  to-transparent absolute w-full top-0 left-0 h-full"></div>
    </div>
  );
};

export default Testimonials;
