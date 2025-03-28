import { Database } from "../lib/database.types";
import MediumCardTitle from "../subcomponents/MediumCardTitle";

type PlayerPassingStats = Database["public"]["Tables"]["Passing_Stats"]["Row"];

function StatsSection(props: {
  title: string;
  stats: PlayerPassingStats | undefined;
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
                <div className="">{props.table[index].label}</div>
              </div>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
export default StatsSection;
