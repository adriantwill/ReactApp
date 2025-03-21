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
import RankingsDropdown from "../components/RankingsDropdown";
import { supabase } from "../supabase-client";
import MainPageTitle from "../subcomponents/MainPageTitle";

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
  id: string;
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
  const options = [
    "Receiving Yards",
    "Rushing Yards",
    "Passing Yards",
    "Total Touchdowns",
  ];
  const weeks = [
    "Season Long",
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4",
    "Week 5",
    "Week 6",
    "Week 7",
    "Week 8",
    "Week 9",
    "Week 10",
    "Week 11",
    "Week 12",
    "Week 13",
    "Week 14",
    "Week 15",
    "Week 16",
    "Week 17",
    "Week 18",
  ];
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
          key: index,
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
  const addPlayer = async () => {
    const newPlayersData = tasks.slice(0, 5).map((task) => ({
      name: task.player.displayName,
      position: task.player.position.abbreviation,
      team: task.team.displayName,
      headshot: task.player.headshot.href,
      espnid: task.player.id,
      key: task.id,
    }));
    const newPlayerStats = tasks.slice(0, 5).map((task) => ({
      playerid: task.player.id,
      receptions: parseInt(task.data?.statistics.splits[0]?.stats[0]),
      receiving_yards: parseInt(
        task.data?.statistics.splits[0]?.stats[2].replace(/,/g, "")
      ),
      receiving_touchdowns: parseInt(task.data?.statistics.splits[0]?.stats[4]),
    }));
    const { data, error } = await supabase
      .from("Players")
      .insert(newPlayersData);
    if (error) {
      console.error("Error adding player", error);
    } else {
      console.log("Player added successfully", data);
    }
    const { data: statsData, error: statsError } = await supabase
      .from("Stats")
      .insert(newPlayerStats);
    if (statsError) {
      console.error("Error adding player stats", statsError);
    } else {
      console.log("Player stats added successfully", statsData);
    }
  };
  const deleteAll = async () => {
    const { data, error } = await supabase
      .from("Players")
      .delete()
      .neq("id", 0);
    const { data: stats, error: statserr } = await supabase
      .from("Stats")
      .delete()
      .neq("id", 0);
    if (error) {
      console.error("Error deleting players", error);
    } else {
      console.log("Players deleted successfully", data);
    }
    if (statserr) {
      console.error("Error deleting players", statserr);
    } else {
      console.log("Players deleted successfully", stats);
    }
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;
  return (
    <>
      <Dropdown />
      <div className="flex flex-col items-center">
        <MainPageTitle title="Rankings" />
        <div className="flex flex-col gap-10">
          <div className="bg-white shadow-surround rounded-2xl">
            <div className="flex gap-6 items-center h-full py-3 px-6">
              <RankingsDropdown title={"Category"} options={options} />
              <RankingsDropdown title={"Event"} options={weeks} />
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
                <div className="bg-primary w-fit p-8 pb-6 rounded-lg shadow-lg h-[39rem] flex flex-col justify-between">
                  <div className="flex justify-between bg-secondary items-center -mx-8 -mt-8  p-5 shadow-lg rounded-t-lg h-20">
                    <FontAwesomeIcon
                      icon={faArrowRightToBracket}
                      className="fa-xl cursor-pointer"
                      onClick={addPlayer}
                    />
                    <h1 className="text-3xl">Week 6 Receiving Rankings</h1>
                    <FontAwesomeIcon
                      icon={faArrowUpFromBracket}
                      className="fa-xl cursor-pointer"
                      onClick={deleteAll}
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
                        index={tasks.findIndex((t) => t.id === task.id)} //comment
                        isExpanded={activeId === task.id}
                        onExpand={(id) =>
                          setActiveId(id === activeId ? null : id)
                        }
                      />
                    </>
                  ))}
                </div>
                <div
                  className="bg-primary w-fit rounded-lg shadow-lg h-[39rem] flex flex-col gap-7 p-8 overflow-y-auto overflow-x-hidden"
                  ref={ref} //comment
                >
                  <div className="relative -mt-2 mb-2">
                    <input className="bg-secondary p-3 text-xl drop-shadow-xl rounded-xl w-full pr-10" />
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
                    key={activeDragItem.id}
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
