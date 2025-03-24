import { Items } from "../pages/Teams";

type Props = {
  item: Items;
  color: string;
};

function TeamStat(props: Props) {
  return (
    <div className="w-7/12 bg-white rounded-md shadow-surround">
      <h3 className="text-center text-3xl font-medium m-2">
        Offense Team Stats
      </h3>
      <div style={{ backgroundColor: `#${props.color}` }} className="h-2"></div>
      <div className="grid grid-cols-5 gap-0 p-4 items-center">
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">EPA Per Play</p>
          <p className="text-center text-lg">{props.item.summary}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">Success Rate</p>
          <p className="text-center text-lg">{props.item.summary}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">RZ Scoring %</p>
          <p className="text-center text-lg">{props.item.summary}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">Pass Play %</p>
          <p className="text-center text-lg">{props.item.summary}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">Run Play %</p>
          <p className="text-center text-lg">{props.item.summary}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamStat;
