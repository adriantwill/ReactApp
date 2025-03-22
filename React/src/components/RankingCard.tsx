import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Player, Statistics, TeamStats } from "../pages/Rankings";

function SlimRankingCard(props: {
  player: Player;
  team: TeamStats;
  data: Statistics;
  id: number;
  index: number;
  tailwind: string;
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
      className={`bg-white rounded-md border shadow-md cursor-grab w-[28rem] ${props.tailwind} `}
    >
      <div className="transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center overflow-hidden">
          <div className="flex-1 text-xl font-medium text-center overflow-hidden">
            {props.player.displayName} | {props.player.position.abbreviation}
          </div>
          <img src={props.player.headshot.href} className="w-24 mr-1" />
        </div>
      </div>
    </div>
  );
}
export default SlimRankingCard;
