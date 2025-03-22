import { Database } from "../lib/database.types";
import InfoBox from "../subcomponents/InfoBox";
import MediumCardTitle from "../subcomponents/MediumCardTitle";

type StatsSectionProps = {
  title: string;
  stats: PlayerPassingStats | undefined;
  table: StatItemProps[];
  color: string;
};
type StatItemProps = {
  label: string;
  description: string;
};
type PlayerPassingStats = Database["public"]["Tables"]["Passing_Stats"]["Row"];

function StatsSection(props: StatsSectionProps) {
  console.log(props.stats);
  if (!props.stats) {
    return <div className="shadow-surround rounded-md bg-white "></div>;
  }
  return (
    <div className="shadow-surround rounded-md mb-6 bg-white w-[21rem]">
      <MediumCardTitle title={props.title} color={props.color} />
      <div className="h-[21rem] px-6 py-3">
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
              <span className="font-semibold">{value}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
export default StatsSection;
