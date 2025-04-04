import { Database } from "../lib/database.types";
type PlayerCharacteristics =
  Database["public"]["Tables"]["Passing_Characteristic"]["Row"];

function PlayerTraits(props: {
  characteristicLabel: { label: string; description: string }[];
  playerCharacteristics: PlayerCharacteristics | undefined;
}) {
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
            </div>
            <div className="text-xs text-center text-gray-600">Tier</div>
            <div className="text-3xl text-center font-medium ">{value}</div>
          </div>
        ))}
    </>
  );
}
export default PlayerTraits;
