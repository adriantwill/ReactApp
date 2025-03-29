import { Database } from "../lib/database.types";
import MediumCardTitle from "../subcomponents/MediumCardTitle";

type PlayerPassingStats = Database["public"]["Tables"]["Passing_Stats"]["Row"];
type PlayerRushingStats = Database["public"]["Tables"]["Rushing_Stat"]["Row"];

function StatsSection(props: {
  title: string;
  stats: PlayerPassingStats | PlayerRushingStats | undefined;
  table: {
    label: string;
    description: string;
  }[];
  color: string;
}) {
  if (!props.stats) {
    return <div className="shadow-surround rounded-md bg-white "></div>;
  }
  console.log(props.table);
  return (
    <div className="shadow-surround rounded-sm bg-white w-1/2">
      <MediumCardTitle title={props.title} color={props.color} />
      <div className=" px-6 py-3">
        {Object.entries(props.stats)
          .slice(3)
          .map(([_, value], index) => (
            <div
              className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
              key={index}
            >
              <div className="flex items-center gap-4">
                <div className="font-semibold ">
                  11<sup>th</sup>
                </div>
                <div className="capitalize">{props.table[index].label}</div>
              </div>
              <span className="font-semibold">
                {value}
                {(props.table[index].label.toLowerCase() ===
                  "touchdown rate by interception rate" ||
                  props.table[index].label.toLowerCase() ===
                    "explosive run rate" ||
                  props.table[index].label.toLowerCase() ===
                    "pressure to sack rate" ||
                  props.table[index].label.toLowerCase() ===
                    "completion percentage over expected") &&
                  "%"}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
export default StatsSection;
