import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RankingCard from "./RankingCard";
import { Player, Statistics, TeamStats } from "../pages/Rankings";
import { useState } from "react";

function SlimRankingCard(props: {
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
  const [isExpanded, setIsExpanded] = useState(false);

  const handleIconClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  if (isExpanded) {
    return (
      <RankingCard
        player={props.player}
        team={props.team}
        data={props.data}
        id={props.id}
        index={props.index}
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="relative my-8 bg-primary rounded-md shadow-xl cursor-grab w-[28rem]"
    >
      <div className="flex justify-between items-center ">
        <div className="w-12 text-center text-xl font-medium">
          {props.index + 1}
        </div>
        <div className="text-xl font-semibold text-nowrap">
          {props.player.displayName} | {props.player.position.abbreviation}
        </div>
        <img src={props.player.headshot.href} className="w-24" />
      </div>
      <FontAwesomeIcon
        icon={faAngleDown}
        className="absolute bottom-0 right-1/2 cursor-pointer fa-lg"
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
