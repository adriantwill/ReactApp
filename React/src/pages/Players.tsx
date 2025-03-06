import { Navigate, useParams } from "react-router";
import Dropdown from "../components/Dropdown";
import headshot from "../assets/i.png";
import logo from "../assets/DET.webp";
import StatsSection from "../components/StatsSection";
import TimelinePoint from "../components/TimelinePoint";
import PlayerPageSmallCard from "../components/PlayerPageSmallCard";
import PlayerTraits from "../subcomponents/PlayerTraits";
import PlayerSalaryAge from "../subcomponents/PlayerSalaryAge";
import PlayerPageMediumCard from "../components/PlayerPageMediumCard";

function Players() {
  const { id } = useParams();
  const playerId = Number(id) || 1;
  console.log(playerId);
  if (playerId != 1) {
    return <Navigate to="/error" replace />; // Redirect to error route
  }
  const passingStats = [
    { label: "EPA", value: 1000, description: "Real" },
    { label: "Adj Completion %", value: 100, description: "Real" },
    { label: "Touchdowns", value: 20, description: "Real" },
    { label: "Pressure to Sack %", value: 20, description: "Real" },
    { label: "Avg Time to Throw", value: 20, description: "Real" },
    { label: "Interception %", value: 20, description: "Real" },
    { label: "Interception %", value: 20, description: "Real" },
    { label: "Interception %", value: 20, description: "Real" },
    { label: "Interception %", value: 20, description: "Real" },
    { label: "Interception %", value: 20, description: "Real" },
  ];

  const rushingStats = [
    { label: "Yards", value: 1000, description: "Real" },
    { label: "Completion %", value: 100, description: "Real" },
    { label: "Touchdowns", value: 20, description: "Real" },
    { label: "Pressure to Sack %", value: 20, description: "Real" },
    { label: "Avg Time to Throw", value: 20, description: "Real" },
  ];
  return (
    <>
      <Dropdown />
      <div className=" mb-12" style={{ backgroundColor: `#${"0076B6"}` }}>
        <div className="w-[90rem] mx-auto flex justify-between h-52">
          <div className="py-8 flex flex-col justify-around">
            <h1 className="text-white text-6xl font-bold ">{"Jared Goff"}</h1>
            <h2 className="text-white text-4xl font-medium">
              {"Quaterback" + " | #" + "16"}
            </h2>
          </div>
          <div className="relative w-60 self-end">
            <img src={headshot} className="relative z-10" />
            <img src={logo} className="absolute opacity-50 -bottom-4 left-0" />
          </div>
        </div>
      </div>
      <div className="w-[90rem] mx-auto space-y-12">
        <div className="flex justify-between">
          <PlayerPageSmallCard
            title="Info"
            tailwind="items-center justify-evenly"
          >
            <PlayerSalaryAge />
          </PlayerPageSmallCard>
          <PlayerPageSmallCard title="Write Up" tailwind="px-6 py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            tempore nisi voluptatem, impedit culpa temporibus asperiores sequi
            vero fugiat facilis iusto perspiciatis nostrum! Dignissimos
            laudantium ipsam quod. Aperiam, sed provident!
          </PlayerPageSmallCard>
          <PlayerPageSmallCard
            title="Characteristics"
            tailwind="items-center justify-around"
          >
            <PlayerTraits />
          </PlayerPageSmallCard>
        </div>
        <div className="flex justify-between">
          {" "}
          <PlayerPageMediumCard title="Stats">
            <div className="grid grid-cols-2 gap-6 h-[20rem] mx-8 my-4 ">
              <StatsSection title="Passing" stats={passingStats} />
              <StatsSection title="Rushing" stats={rushingStats} />
            </div>
          </PlayerPageMediumCard>
          <PlayerPageMediumCard title="Timeline">
            <div className="h-[22rem] py-4 overflow-auto">
              {[1, 2, 3, 4].map((index) => (
                <TimelinePoint key={index} index={index}></TimelinePoint>
              ))}
            </div>
          </PlayerPageMediumCard>
        </div>
      </div>
    </>
  );
}
export default Players;
