import { Games } from "../pages/FrontPage";
import GameCardInfo from "./GameCardInfo";

function Gamecard(props: { data: Games[]; league: string }) {
  const sortedData = [...props.data].sort((a, b) => {
    const statusOrder: { [key: number]: number } = { 2: 0, 1: 1, 3: 2 };
    return (
      statusOrder[Number(a.status.type.id)] -
      statusOrder[Number(b.status.type.id)]
    );
  });
  return (
    <div className="flex relative">
      <p className="text-lg text-gray-500 block absolute -top-6 left-2">
        {props.league}
      </p>

      {sortedData.map((game, index) => (
        <div
          className="shadow-surround rounded-xl my-2 mx-4 relative w-52 flex-shrink-0 "
          key={index}
        >
          <GameCardInfo
            border={"rounded-tl-xl"}
            team={game.competitions[0].competitors[1]}
            status={game.status}
            borderPos={[
              "borderBottomColor",
              "borderLeftWidth",
              "borderBottomWidth",
            ]}
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2 text-sm">
            {game.status.type.shortDetail}
          </div>
          <GameCardInfo
            border={"rounded-bl-xl"}
            status={game.status}
            team={game.competitions[0].competitors[0]}
            borderPos={["borderTopColor", "borderRightWidth", "borderTopWidth"]}
          />
        </div>
      ))}
    </div>
  );
}
export default Gamecard;
