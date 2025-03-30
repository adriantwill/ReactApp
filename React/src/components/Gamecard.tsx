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
    <div className="pb-5">
      <p className="text-lg block text-gray-600 pb-1 ">{props.league}</p>
      <div className=" flex relative gap-10">
        {sortedData.map((game, index) => (
          <div
            className="shadow-surround rounded-md relative w-56 flex-shrink-0 bg-white"
            key={index}
          >
            <GameCardInfo
              border={"rounded-tl-md"}
              team={game.competitions[0].competitors[1]}
              status={game.status}
              borderPos={[
                "borderBottomColor",
                "borderLeftWidth",
                "borderBottomWidth",
              ]}
            />
            <div className="absolute top-1/2 right-2 -translate-y-1/2 text-xs">
              {game.status.type.shortDetail}
            </div>
            <GameCardInfo
              border={"rounded-bl-md"}
              status={game.status}
              team={game.competitions[0].competitors[0]}
              borderPos={[
                "borderTopColor",
                "borderRightWidth",
                "borderTopWidth",
              ]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Gamecard;
