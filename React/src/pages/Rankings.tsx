import { useRef, useState } from "react";
import Dropdown from "../components/Dropdown";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useQuery } from "@tanstack/react-query";
import SlimRankingCard from "../components/SlimRankingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faArrowUpFromBracket,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import RankingCard from "../components/RankingCard";

type Split = {
  stats: string[];
};

export type Statistics = {
  statistics: {
    labels: string[];
    splits: Split[];
  };
};

export type Player = {
  team: {
    $ref: string;
  };
  displayName: string;
  headshot: {
    href: string;
  };
  position: {
    abbreviation: string;
  };
};

export type TeamStats = {
  displayName: string;
  logos: { href: string }[];
  color: string;
};

type Card = {
  id: number;
  data: Statistics;
  player: Player;
  team: TeamStats;
};

type Leader = {
  athlete: {
    $ref: string;
  };
  team: {
    $ref: string;
  };
};

function Rankings() {
  const [tasks, setTasks] = useState<Card[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeDragItem, setActiveDragItem] = useState<Card | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const getTaskPos = (id: string | number) =>
    tasks.findIndex((task) => task.id === id);
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedTask = tasks.find((task) => task.id === active.id);
    setActiveDragItem(draggedTask || null);
    if (tasks.findIndex((t) => t.id === active.id) < 6 && ref.current) {
      ref.current.scrollTo({ top: 0 });
      ref.current.style.cssText = "overflow-y: hidden;";
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {
    if (ref.current) {
      ref.current.style.cssText = "overflow-y: auto;";
    }
    setActiveDragItem(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setTasks((tasks) => {
      const oldIndex = getTaskPos(active.id);
      const newIndex = getTaskPos(over.id);
      console.log(oldIndex, newIndex);
      return arrayMove(tasks, oldIndex, newIndex);
    });
  };
  const fetchLeadersData = async () => {
    const response = await fetch(
      "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/types/2/leaders"
    );
    const result = await response.json();

    if (!result) throw new Error("No data received");

    const leaders = result.categories[2]?.leaders.slice(0, 20) || [];

    const tasks = await Promise.all(
      leaders.map(async (leader: Leader, index: number) => {
        const athleteRef = leader.athlete.$ref;
        const athleteId = athleteRef
          ? athleteRef.split("/athletes/")[1].split("?")[0]
          : null;

        const [athleteResult, playerResult, teamResult] = await Promise.all([
          fetch(
            `https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/${athleteId}/overview`
          ).then((res) => res.json()),
          fetch(leader.athlete.$ref || "").then((res) => res.json()),
          fetch(leader.team.$ref || "").then((res) => res.json()),
        ]);

        return {
          id: index,
          data: athleteResult,
          player: playerResult,
          team: teamResult,
        };
      })
    );
    setTasks(tasks);
    return tasks;
  };
  const { isLoading, isError } = useQuery({
    queryKey: ["leadersData"],
    queryFn: fetchLeadersData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;
  return (
    <>
      <Dropdown />
      <div className="flex justify-center">
        <div className="flex flex-col gap-10">
          <div className="bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.2)] h-20 rounded-lg">
            <div className="flex justify-between items-center h-full p-8">
              <div>
                <h1 className="text-md font-medium">Rankings</h1>
                <select></select>
              </div>
            </div>
          </div>
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
          >
            <SortableContext
              items={tasks}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex gap-24">
                <div className="bg-primary w-fit p-8 pb-6 rounded-lg shadow-lg h-[39rem] flex flex-col gap-8">
                  <div className="flex justify-between bg-secondary items-center -mx-8 -mt-8  p-5 shadow-lg rounded-t-lg h-72">
                    <FontAwesomeIcon
                      icon={faArrowRightToBracket}
                      className="fa-xl cursor-pointer"
                    />
                    <h1 className="text-3xl">Week 6 Receiving Rankings</h1>
                    <FontAwesomeIcon
                      icon={faArrowUpFromBracket}
                      className="fa-xl cursor-pointer"
                    />
                  </div>
                  {tasks.slice(0, 5).map((task) => (
                    <>
                      <SlimRankingCard
                        team={task.team}
                        data={task.data}
                        player={task.player}
                        id={task.id}
                        key={task.id}
                        index={tasks.findIndex((t) => t.id === task.id)}
                        isExpanded={activeId === task.id}
                        onExpand={(id) =>
                          setActiveId(id === activeId ? null : id)
                        }
                      />
                    </>
                  ))}
                </div>
                <div
                  className="bg-primary w-fit rounded-lg shadow-lg h-[39rem] flex flex-col gap-8 p-8 overflow-y-auto overflow-x-hidden"
                  ref={ref}
                >
                  <div className="relative h-20">
                    <input
                      className="bg-secondary p-3 text-xl -mt-1 shadow-lg rounded-xl w-full pr-10"
                      placeholder="Search for a player"
                    />
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 fa-lg"
                    />
                  </div>
                  {tasks.slice(5, 20).map((task) => (
                    <>
                      <RankingCard
                        team={task.team}
                        data={task.data}
                        player={task.player}
                        id={task.id}
                        key={task.id}
                        index={tasks.findIndex((t) => t.id === task.id)}
                        tailwind={
                          task === activeDragItem ? "opacity-0" : "opacity-100"
                        }
                      />
                    </>
                  ))}
                </div>
              </div>
            </SortableContext>
            {activeDragItem &&
              tasks.findIndex((t) => t.id === activeDragItem.id) > 4 && (
                <DragOverlay>
                  <RankingCard
                    team={activeDragItem.team}
                    data={activeDragItem.data}
                    player={activeDragItem.player}
                    id={activeDragItem.id}
                    index={tasks.findIndex((t) => t.id === activeDragItem.id)}
                    tailwind="opacity-100"
                  />
                </DragOverlay>
              )}
          </DndContext>
        </div>
      </div>
    </>
  );
}

export default Rankings;
