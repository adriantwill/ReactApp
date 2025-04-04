import { Competitors, Status } from "../lib/types";

function GameCardInfo(props: {
  team: Competitors;
  status: Status;
  border: string;
  borderPos: string[];
}) {
  return (
    <div className="flex justify-between h-1/2 items-center">
      <div className={`flex overflow-hidden ${props.border}`}>
        <div
          className="border-solid"
          style={{
            borderColor: `#${props.team.team.color}`,
            [props.borderPos[0]]: "transparent",
            [props.borderPos[1]]: "12px",
            [props.borderPos[2]]: "8px",
          }}
        ></div>
        <img src={props.team.team.logo} className="h-10 mx-1 my-3"></img>
        <div className="flex items-center font-medium text-xl">
          {props.team.team.abbreviation}
        </div>
      </div>
      <div
        className={`px-2 ${
          props.status.type.id === "1"
            ? "font-normal text-lg"
            : "font-semibold text-xl"
        }`}
      >
        {props.status.type.id === "1"
          ? (props.team.records?.[0]?.summary ?? "N/A")
          : props.team.score}
      </div>
    </div>
  );
}
export default GameCardInfo;
