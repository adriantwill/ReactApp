import { Games } from "../pages/FrontPage";
import GameCardInfo from "./GameCardInfo";

function Gamecard(props: { data: Games[] }) {
  return (
    <>
      {props.data?.map((game, index) => (
        <div
          className="shadow-[0_0_8px_0_rgba(0,0,0,0.2)] rounded-xl my-2 mx-4 relative w-52 flex-shrink-0"
          key={index}
        >
          <GameCardInfo
            border={"rounded-tl-xl"}
            teamColor={game.competitions[0].competitors[1].team.color}
            teamAbbrev={game.competitions[0].competitors[1].team.abbreviation}
            teamImage={game.competitions[0].competitors[1].team.logo}
            teamScore={game.competitions[0].competitors[1].score}
            borderPos={[
              "borderBottomColor",
              "borderLeftWidth",
              "borderBottomWidth",
            ]}
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2 text-sm">
            {game.status.displayClock}
          </div>
          <GameCardInfo
            border={"rounded-bl-xl"}
            teamColor={game.competitions[0].competitors[0].team.color}
            teamAbbrev={game.competitions[0].competitors[0].team.abbreviation}
            teamImage={game.competitions[0].competitors[0].team.logo}
            teamScore={game.competitions[0].competitors[0].score}
            borderPos={["borderTopColor", "borderRightWidth", "borderTopWidth"]}
          />
        </div>
      ))}
    </>
  );
}
export default Gamecard;
