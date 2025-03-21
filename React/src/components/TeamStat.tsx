import { Items } from "../pages/Teams";

type Props = {
  item: Items;
  color: string;
};

function TeamStat(props: Props) {
  return (
    <div className="w-[51rem] bg-white rounded-md shadow-surround">
      <h3 className="text-center text-3xl font-medium m-2">Team Stats</h3>
      <div style={{ backgroundColor: `#${props.color}` }} className="h-2"></div>
      <div className="grid grid-cols-3 gap-0 p-4 items-center">
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">Overall Record</p>
          <p className="text-center text-lg">{props.item.summary}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">Avg Pts Against</p>
          <p className="text-center text-lg">{props.item.stats[2].value}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">Avg Pts For</p>
          <p className="text-center text-lg">{props.item.stats[3].value}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamStat;
