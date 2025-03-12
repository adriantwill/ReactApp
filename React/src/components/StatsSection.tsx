import { Database } from "../lib/database.types";
import InfoBox from "../subcomponents/InfoBox";

type StatsSectionProps = {
  title: string;
  stats: PlayerPassingStats | undefined;
  table: StatItemProps[];
};
type StatItemProps = {
  label: string;
  description: string;
};
type PlayerPassingStats = Database["public"]["Tables"]["Passing_Stats"]["Row"];

function StatsSection(props: StatsSectionProps) {
  console.log(props.stats);
  if (!props.stats) {
    return <div className="shadow-surround rounded-lg p-6 bg-white h-70"></div>;
  }
  return (
    <div className="shadow-surround rounded-lg p-6 pb-0 bg-white h-70 ">
      <h2 className="text-2xl font-bold mb-2">{props.title}</h2>
      <div className="">
        {Object.entries(props.stats)
          .slice(3)
          .map(([_, value], index) => (
            <div
              className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
              key={index}
            >
              <div className="flex items-center ">
                <div className="text-gray-70 ">{props.table[index].label}</div>
                <InfoBox info={props.table[index].description} />
              </div>
              <span className="font-medium">{value}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
export default StatsSection;
