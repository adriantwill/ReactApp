import { Database } from "../lib/database.types";

type PlayerTeams = Database["public"]["Tables"]["Player_Team"]["Row"];
type TeamDetails = {
  id: string;
  uid: string;
  slug: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  name: string;
  nickname: string;
  location: string;
  color: string;
  alternateColor: string;
  isActive: boolean;
  isAllStar: boolean;
  logos: {
    href: string;
  }[];
};

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
      {props.index > 0 && <div className="w-1 h-24 bg-black mx-auto"></div>}
      <div className="flex justify-center items-center relative">
        <div
          className="w-24 h-24 rounded-full flex justify-center items-center relative overflow-hidden"
          style={{ backgroundColor: `#${props.teamInfo.color}` }}
        >
          <img
            src={props.teamInfo.logos[1].href}
            className="absolute inset-0 m-auto object-contain w-10/12"
          />
        </div>

        <div
          className={`bg-white rounded-lg px-4 py-2 shadow-surround w-56 h-20 absolute overflow-auto ${
            props.index % 2 === 0 ? "translate-x-48" : "-translate-x-48"
          }`}
        >
          <p className="font-medium">{props.team.notes}</p>
        </div>
        <div
          className={` absolute overflow-auto w-40 ${
            props.index % 2 === 1
              ? "translate-x-40"
              : "-translate-x-40 text-right"
          }`}
        >
          <p className="text-xl"> {convertDate(props.team.start_date)}</p>
        </div>
      </div>
    </>
  );
}
export default TimelinePoint;
