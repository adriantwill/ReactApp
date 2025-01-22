import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import RankingCard from "../components/RankingCard";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCorners, DndContext } from "@dnd-kit/core";

type Split = {
  stats: string[];
};

type Statistics = {
  statistics: {
    labels: string[];
    splits: Split[];
  };
};

type Player = {
  team: Team;
  displayName: string;
  headshot: Headshot;
  position: Position;
};

type Team = {
  $ref: string;
};

type Headshot = {
  href: string;
};

type Position = {
  abbreviation: string;
};

type TeamStats = {
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

function Rankings() {
  const [team, setTeam] = useState<TeamStats[]>([]);
  const [tasks, setTasks] = useState<Card[]>([]);
  const getTaskPos = (id: any) => tasks.findIndex((task) => task.id === id);
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setTasks((tasks) => {
      const oldIndex = getTaskPos(active.id);
      const newIndex = getTaskPos(over.id);
      console.log(oldIndex, newIndex);
      return arrayMove(tasks, oldIndex, newIndex);
    });
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        let response = await fetch(
          "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/types/2/leaders",
          { signal }
        );
        let result = await response.json();
        if (result) {
          for (let i = 0; i < 5; i++) {
            const athleteRef = result.categories[2].leaders[i].athlete.$ref;
            const athleteId = athleteRef
              ? athleteRef.split("/athletes/")[1].split("?")[0]
              : null;
            response = await fetch(
              `https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/${athleteId}/overview`
            );
            const athleteResult = await response.json();

            response = await fetch(
              result.categories[2].leaders[i].athlete.$ref || ""
            );
            const playerResult = await response.json();

            response = await fetch(
              result.categories[2].leaders[i].team.$ref || ""
            );
            const teamResult = await response.json();
            setTeam(teamResult);
            tasks.push({
              id: i,
              data: athleteResult,
              player: playerResult,
              team: teamResult,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    console.log(tasks);
    return () => {
      controller.abort();
      console.log("API call cleaned up");
    };
  }, []);
  return (
    <div>
      <Dropdown />
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <RankingCard
              team={task.team}
              data={task.data}
              player={task.player}
              id={task.id}
              key={task.id}
              index={tasks.findIndex((t) => t.id === task.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default Rankings;
