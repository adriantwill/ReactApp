import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import RankingStats from "./RankingStats";
import { Player, Statistics, TeamStats } from "../pages/Rankings";
import { TbChevronDown } from "react-icons/tb";

function SlimRankingCard(props: {
  player: Player;
  team: TeamStats;
  data: Statistics;
  id: number;
  index: number;
  isExpanded: boolean;
  onExpand: (id: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleIconClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    props.onExpand(props.id);
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="relative bg-white rounded-md border shadow-md cursor-grab w-[28rem]"
    >
      <div
        className={`
            transition-all duration-300 ease-in-out
            ${!props.isExpanded ? "opacity-100 h-auto" : "opacity-0 h-0"}
          `}
      >
        <div className="flex justify-between items-center overflow-hidden ">
          <div className="w-12 text-center text-xl font-medium">
            {props.index + 1}
          </div>
          <div className="text-xl font-medium text-nowrap">
            {props.player.displayName} | {props.player.position.abbreviation}
          </div>
          <img src={props.player.headshot.href} className="w-24 mr-1" />
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          props.isExpanded
            ? "opacity-100 h-auto"
            : "opacity-0 h-0 absolute overflow-hidden"
        }`}
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
          />
          <div className="relative w-32 overflow-hidden self-end mr-1">
            <img
              src={props.team?.logos[0].href}
              className="absolute opacity-50"
            />
            <img src={props.player?.headshot.href} className="relative" />
          </div>
        </div>
      </div>

      <TbChevronDown
        className={`absolute bottom-0 right-1/2 cursor-pointer size-6 ${
          props.isExpanded ? "rotate-180" : ""
        }`}
        onClick={handleIconClick}
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      />
    </div>
  );
}
export default SlimRankingCard;
