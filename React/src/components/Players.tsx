import { PlayerInfo, TeamInfo } from "../lib/types";

function Card(props: {
  tailwind?: string;
  data: PlayerInfo;
  team: TeamInfo;
  handleClick: () => void;
  setCurrentPlayer: () => void;
}) {
  return (
    <div
      style={{ backgroundColor: `#${props.team.color}` }}
      className={`text-center w-24 h-36 relative m-4 py-3 rounded-lg cursor-pointer hover:scale-105 hover:rounded-sm transition-all duration-300 ease-in-out ${props.tailwind}`}
      onClick={() => {
        props.handleClick();
        props.setCurrentPlayer();
      }}
    >
      <div className="font-medium  text-white overflow-hidden whitespace-nowrap mb-4">
        {props.data.lastName}
      </div>
      <div className="text-5xl font-medium  text-white">
        {props.data.jersey || "00"}
      </div>
    </div>
  );
}

export default Card;
