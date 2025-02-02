import RankingStats from "./RankingStats";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Player, Statistics, TeamStats } from "../pages/Rankings";

function RankingCard(props: {
  player: Player;
  team: TeamStats;
  data: Statistics;
  id: number;
  index: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="my-4 bg-primary rounded-md shadow-xl cursor-grab w-[28rem]"
    >
      <div className="flex justify-between p-1 px-4 items-center gap-4">
        <div className="text-lg font-semibold">{props.index + 1}</div>
        <div className="text-2xl font-bold">{props.player?.displayName}</div>
        <div className="text-lg font-bold">
          {props.player?.position.abbreviation}
        </div>
      </div>
      <div
        style={{ backgroundColor: `#${props.team?.color}` }}
        className="h-1"
      ></div>
      <p className="text-center font-medium p-1">{props.team?.displayName}</p>
      <div className="flex justify-between items-center">
        <RankingStats
          values={props.data?.statistics.splits[0]?.stats || []}
          type="2024"
        ></RankingStats>
        <div className="relative w-32 overflow-hidden self-end">
          <img
            src={props.team?.logos[0].href}
            className="absolute opacity-50"
          />
          <img src={props.player?.headshot.href} className="relative " />
        </div>
      </div>
    </div>
  );
}

export default RankingCard;
