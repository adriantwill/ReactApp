import {
  DragStartEvent,
  DragEndEvent,
  DndContext,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { TbShare } from "react-icons/tb";
import RankingCard from "../../components/RankingCard";
import RankingsDropdown from "../../components/RankingsDropdown";
import SlimRankingCard from "../../components/SlimRankingCard";
import { Card, Leader } from "../../lib/types";
import MainPageTitle from "../../subcomponents/MainPageTitle";

export const Route = createFileRoute("/rankings/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeDragItem, setActiveDragItem] = useState<Card | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const options = ["Passing Yards", "Receiving Yards", "Rushing Yards"];
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
    setActiveId(null);
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

    const leaders = result.categories[0]?.leaders.slice(0, 20) || [];

    const tasks = await Promise.all(
      leaders.map(async (leader: Leader, index: number) => {
        const athleteRef = leader.athlete.$ref.replace("http:", "https:");
        const athleteId = athleteRef
          ? athleteRef.split("/athletes/")[1].split("?")[0]
          : null;

        const [athleteResult, playerResult, teamResult] = await Promise.all([
          fetch(
            `https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/${athleteId}/overview`
          ).then((res) => res.json()),
          fetch(leader.athlete.$ref.replace("http:", "https:") || "").then(
            (res) => res.json()
          ),
          fetch(leader.team.$ref.replace("http:", "https:") || "").then((res) =>
            res.json()
          ),
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
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;
  return (
    <>
      <div className=" flex flex-col items-center bg-primary pb-3">
        <MainPageTitle title="Rankings" />
        <div className="flex flex-col gap-10">
          <div className="shadow-surround rounded-2xl bg-white">
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
                <div className="bg-white pb-8 w-[32rem] rounded-md shadow-surround h-[39rem] flex flex-col justify-between items-center">
                  <div className="flex justify-center bg-white items-center w-full p-5 shadow-md rounded-md ">
                    <h1 className="ml-auto text-3xl">Passing Rankings</h1>
                    <TbShare className="size-7  ml-auto cursor-pointer" />
                  </div>
                  {tasks.slice(0, 5).map((task) => (
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
                  ))}
                </div>
                <div
                  className="bg-white items-center pb-8 rounded-lg shadow-surround h-[39rem] flex flex-col gap-7 overflow-auto w-[32rem]"
                  ref={ref}
                >
                  <div className="flex justify-between items-center w-11/12 mt-5 relative">
                    <input className="bg-primary p-3 text-xl shadow-sm rounded-xl w-full border" />
                    <PiMagnifyingGlass className="absolute text-gray-600 size-7 right-5" />
                  </div>
                  {tasks.slice(5, 20).map((task) => (
                    <RankingCard
                      player={task.player}
                      id={task.id}
                      key={task.id}
                      index={tasks.findIndex((t) => t.id === task.id)}
                      tailwind={
                        task === activeDragItem ? "opacity-0" : "opacity-100"
                      }
                    />
                  ))}
                </div>
              </div>
            </SortableContext>
            {activeDragItem &&
              tasks.findIndex((t) => t.id === activeDragItem.id) > 4 && (
                <DragOverlay>
                  <RankingCard
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
