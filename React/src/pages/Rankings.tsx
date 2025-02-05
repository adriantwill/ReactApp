import { useState } from "react";
import Dropdown from "../components/Dropdown";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { useQuery } from "@tanstack/react-query";
import SlimRankingCard from "../components/SlimRankingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";

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
  logos: Logos[];
  color: string;
};

type Logos = {
  href: string;
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
  const getTaskPos = (id: string | number) =>
    tasks.findIndex((task) => task.id === id);
  const handleDragEnd = (event: DragEndEvent) => {
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

    const leaders = result.categories[2]?.leaders.slice(0, 12) || [];

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

      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <div className="flex justify-center items-center">
            <div className="m-16 bg-primary w-fit p-8 pb-6 rounded-lg shadow-lg h-[39rem] flex flex-col justify-between">
              <div className="flex justify-between bg-secondary items-center -mx-8 -mt-8 p-5 shadow-xl rounded-t-lg">
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className="fa-xl cursor-pointer"
                />
                <h1 className="text-3xl">2024 NFL Rankings</h1>
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
                    onExpand={(id) => setActiveId(id === activeId ? null : id)}
                  />
                </>
              ))}
            </div>
            <div className="m-16 bg-primary w-fit px-8 rounded-lg shadow-lg h-[39rem] flex flex-col justify-between py-6">
              {tasks.slice(5, 11).map((task) => (
                <>
                  <SlimRankingCard
                    team={task.team}
                    data={task.data}
                    player={task.player}
                    id={task.id}
                    key={task.id}
                    index={tasks.findIndex((t) => t.id === task.id)}
                    isExpanded={activeId === task.id}
                    onExpand={(id) => setActiveId(id === activeId ? null : id)}
                  />
                </>
              ))}
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}

export default Rankings;
