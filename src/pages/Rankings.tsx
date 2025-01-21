import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import RankingCard from "../components/RankingCard";
import { DragEndEvent } from "@dnd-kit/core";

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

function Rankings() {
  const [data, setData] = useState<Statistics[] | null>(null);
  const [player, setPlayer] = useState<Player[] | null>(null);
  const [team, setTeam] = useState<TeamStats[] | null>(null);

  // function handleDragEnd(event: DragEndEvent){
  //   const {active, over} = event;
  //   if (!over) return;
  //   const taskId = active.id as string;
  //   const newStatus = over.id as Task["status"];

  // }

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
            let athleteResult = await response.json();
            setData((prevData) =>
              prevData ? [...prevData, athleteResult] : [athleteResult]
            );
            response = await fetch(
              result.categories[2].leaders[i].athlete.$ref || ""
            );
            let playerResult = await response.json();
            setPlayer((prevPlayer) =>
              prevPlayer ? [...prevPlayer, playerResult] : [playerResult]
            );

            response = await fetch(
              result.categories[2].leaders[i].team.$ref || ""
            );
            let teamResult = await response.json();
            setTeam((prevTeam) =>
              prevTeam ? [...prevTeam, teamResult] : [teamResult]
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setData([]);
    setPlayer([]);
    setTeam([]);
    fetchData();
    return () => {
      controller.abort(); // Cancel the API request
      console.log("API call cleaned up");
    };
  }, []);
  return (
    <div>
      <Dropdown />
      {data &&
        data.map(
          (leader, index) =>
            team &&
            player && (
              <RankingCard
                team={team[index]}
                data={data[index]}
                player={player[index]}
                index={index + 1}
                key={index}
              />
            )
        )}
    </div>
  );
}

export default Rankings;
