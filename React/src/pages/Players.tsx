import { Navigate, useParams } from "react-router";
import Dropdown from "../components/Dropdown";
import headshot from "../assets/i.png";
import logo from "../assets/DET.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import StatsSection from "../components/StatsSection";
import TimelinePoint from "../components/TimelinePoint";

function Players() {
  const { id } = useParams();
  const playerId = Number(id) || 1;
  console.log(playerId);
  if (playerId != 1) {
    return <Navigate to="/error" replace />; // Redirect to error route
  }
  const passingStats = [
    { label: "EPA", value: 1000 },
    { label: "Adj Completion %", value: 100 },
    { label: "Touchdowns", value: 20 },
    { label: "Pressure to Sack %", value: 20 },
    { label: "Avg Time to Throw", value: 20 },
    { label: "Interception %", value: 20 },
    { label: "Interception %", value: 20 },
    { label: "Interception %", value: 20 },
    { label: "Interception %", value: 20 },
    { label: "Interception %", value: 20 },
  ];

  const rushingStats = [
    { label: "Yards", value: 1000 },
    { label: "Completion %", value: 100 },
    { label: "Touchdowns", value: 20 },
    { label: "Pressure to Sack %", value: 20 },
    { label: "Avg Time to Throw", value: 20 },
  ];
  return (
    <>
      <Dropdown />
      <div className="bg-blue-500 flex justify-around h-52">
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
      <div className="flex gap-24 justify-center">
        <div className="flex flex-col items-center">
          <div className="w-[28rem] shadow-[0_0_8px_0_rgba(0,0,0,0.2)] rounded-xl h-32 my-12">
            <div className="text-center font-medium text-2xl p-1">
              Characteristics
            </div>
            <div className="h-1 bg-slate-600"></div>
            <div className="flex justify-around pt-2">
              <div className="flex flex-col  py-1 ">
                <FontAwesomeIcon icon={faX} className="fa-2xl pb-2" />
                <p className="text-xl ">Speed</p>
              </div>
              <div className="flex flex-col  py-1">
                <FontAwesomeIcon icon={faX} className="fa-2xl pb-2" />
                <p className="text-xl ">Speed</p>
              </div>
            </div>
          </div>
          <div className="w-[42rem] my-6 bg-primary rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-center bg-secondary -mt-6  py-4 rounded-t-xl shadow-xl">
              Stats
            </h1>
            <div className="grid md:grid-cols-2 gap-6 h-[20rem]  mx-8 my-4 overflow-hidden">
              <StatsSection title="Passing" stats={passingStats} />
              <StatsSection title="Rushing" stats={rushingStats} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-[28rem] shadow-[0_0_8px_0_rgba(0,0,0,0.2)] rounded-xl h-32 my-12 overflow-auto">
            <div className="text-center font-medium text-2xl p-1 overflow-clip">
              Write-up
            </div>
            <div className="h-1 bg-slate-600"></div>
            <div className="p-4">Lorem ipsum dolor sit</div>
          </div>
          <div className="bg-primary w-[42rem] [10rem] my-8 rounded-xl shadow-lg ">
            <h1 className="text-4xl font-bold text-center  bg-secondary -mt-8  py-4 rounded-t-lg shadow-xl">
              Stats
            </h1>
            <div className=" py-4 overflow-auto">
              {[1, 2, 3].map((index) => (
                <TimelinePoint key={index} index={index}></TimelinePoint>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Players;
