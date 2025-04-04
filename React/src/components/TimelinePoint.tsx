import { Database } from "../lib/database.types";

import { TeamDetails } from "../lib/types";
type PlayerTeams = Database["public"]["Tables"]["Player_Team"]["Row"];

function TimelinePoint(props: {
  index: number;
  team: PlayerTeams;
  teamInfo?: TeamDetails;
}) {
  const convertDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", { month: "long", year: "numeric" });
  };
  if (!props.teamInfo) {
    return null;
  }
  return (
    <>
      {props.index > 0 && (
        <div className="w-1.5 h-28 bg-gray-300 mx-auto"></div>
      )}
      <div className="flex justify-center items-center relative">
        <div
          className="size-20 rounded-full shadow-md flex justify-center items-center relative overflow-hidden"
          style={{ backgroundColor: `#${props.teamInfo.color}` }}
        >
          <img
            src={props.teamInfo.logos[1].href}
            className="absolute inset-0 m-auto object-contain w-10/12"
          />
        </div>

        <div
          className={`bg-white rounded-md shadow-surround w-1/3 py-2 px-3 h-20 absolute overflow-auto ${
            props.index % 2 === 0 ? "translate-x-48" : "-translate-x-48"
          }`}
        >
          <p className="">{props.team.notes}</p>
        </div>
        <div
          className={` absolute overflow-auto w-40 ${
            props.index % 2 === 1
              ? "translate-x-40"
              : "-translate-x-40 text-right"
          }`}
        >
          <p className="text-2xl font-medium">
            {" "}
            {convertDate(props.team.start_date)}
          </p>
        </div>
      </div>
    </>
  );
}
export default TimelinePoint;
