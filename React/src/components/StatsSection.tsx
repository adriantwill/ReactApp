import { TbInfoCircle } from "react-icons/tb";
import { Database } from "../lib/database.types";

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
                <div className="relative group">
                  <TbInfoCircle className="ml-1 cursor-help " />
                  <div className="absolute w-96 left-9 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10">
                    {props.table[index].description}
                  </div>
                </div>
              </div>
              <span className="font-medium">{value}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
export default StatsSection;
