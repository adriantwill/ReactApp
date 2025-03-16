import { Database } from "../lib/database.types";
import { useNavigate } from "react-router";

type Player = Database["public"]["Tables"]["Players"]["Row"];
type Team = Database["public"]["Tables"]["Team"]["Row"];

function PlayerCard(props: { player?: Player; team?: Team }) {
  const navigate = useNavigate();
  console.log(props);
  if (!props.player || !props.team) {
    return null;
  }
  return (
    <div
      className="h-80 w-96 rounded-md shadow-surround flex-shrink-0 group cursor-pointer"
      onClick={() => navigate(`/players/${props.player?.espnid}`)}
    >
      <div
        style={{ backgroundColor: `#${props.team.color}` }}
        className="h-3/5 rounded-t-md relative overflow-hidden"
      >
        <img
          src={`https://a.espncdn.com/i/headshots/nfl/players/full/${props.player.espnid}.png`}
          className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 w-64" // Made player image smaller (w-64 -> w-56)
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png";
          }}
        />
        <img
          src={`https://a.espncdn.com/i/teamlogos/nfl/500-dark/${props.team.abbreviation}.png`}
          className="absolute opacity-70 top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[110%] transition-all duration-300 ease-in-out group-hover:opacity-90 group-hover:min-w-[120%] " // Added smooth transition and subtle rotation
        />
      </div>
      <div className="flex flex-col justify-center items-center bg-white h-2/5 rounded-b-md">
        <div className="text-4xl font-bold tracking-tight drop-shadow-sm pb-2">
          {props.player.name}
        </div>
        <div className="text-2xl font-medium">
          {" "}
          {props.team.name} | #{props.player.number}
        </div>
      </div>
    </div>
  );
}
export default PlayerCard;
