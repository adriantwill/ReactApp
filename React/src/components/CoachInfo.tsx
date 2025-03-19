import { Items } from "../pages/Teams";
import { TbSwords } from "react-icons/tb";
import InfoBox from "../subcomponents/InfoBox";
import { IoInformationCircleOutline } from "react-icons/io5";
type Props = {
  item: Items;
  color: string;
};

function TeamStat(props: Props) {
  return (
    <div className="w-[51rem] bg-white rounded-md shadow-surround">
      <div className="flex justify-center items-center">
        <h3 className="text-3xl font-medium my-2">Coaches</h3>
        <InfoBox
          info="Swords denote the offensive playcaller, while a shield denotes the defensive playcaller."
          tailwind="size-6"
        />
      </div>
      <div style={{ backgroundColor: `#${props.color}` }} className="h-2"></div>
      <div className="grid grid-cols-3 gap-0 p-4 items-center">
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">Head Coach</p>
          <div className="flex ">
            <p className="text-center text-lg">{"Kevin Occonel"}</p>
            <TbSwords className="ml-1 h-7 w-6" />
          </div>
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
