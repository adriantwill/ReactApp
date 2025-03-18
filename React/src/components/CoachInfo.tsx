import { Items } from "../pages/Teams";
import InfoBox from "../subcomponents/InfoBox";

type Props = {
  item: Items;
  color: string;
};

function TeamStat(props: Props) {
  return (
    <div className="w-[51rem] bg-white rounded-md shadow-surround">
      <h3 className="text-center text-3xl font-medium m-2">Coaches</h3>
      <div style={{ backgroundColor: `#${props.color}` }} className="h-2"></div>
      <div className="grid grid-cols-3 gap-0 p-4 items-center">
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">Head Coach</p>
          <p className="text-center text-lg">{"Kevin Occonel"}</p>
          <InfoBox info="This is a trait" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">Offensive Coordinator</p>
          <p className="text-center text-lg">{"Wes Phillips"}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">Defensive Coordinator</p>
          <p className="text-center text-lg">{"Brian Flores"}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamStat;
