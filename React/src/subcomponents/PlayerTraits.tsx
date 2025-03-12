import InfoBox from "./InfoBox";
import { Database } from "../lib/database.types";
type PlayerCharacteristics =
  Database["public"]["Tables"]["Passing_Characteristic"]["Row"];

type TraitProps = {
  characteristicLabel: StatItemProps[];
  playerCharacteristics: PlayerCharacteristics | undefined;
};

type StatItemProps = {
  label: string;
  description: string;
};

function PlayerTraits(props: TraitProps) {
  if (!props.playerCharacteristics) {
    return <div></div>;
  }
  return (
    <>
      {Object.entries(props.playerCharacteristics)
        .slice(3)
        .map(([_, value], index) => (
          <div>
            <div className="flex items-center ">
              <div className="text-lg text-center">
                {props.characteristicLabel[index].label}
              </div>
              <InfoBox info="This is a trait" />
            </div>
            <div className="text-xs text-center">Tier</div>
            <div className="text-3xl text-center font-medium ">{value}</div>
          </div>
        ))}
    </>
  );
}
export default PlayerTraits;
