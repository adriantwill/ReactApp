import { useState } from "react";
import Card from "./../components/Players";
import Title from "./../components/Title";
import Dropdown from "./../components/Dropdown";
import Modal from "./../components/Modal";
import { Navigate, useParams } from "react-router";
import NextGame from "../components/NextGame";
import TeamStat from "../components/TeamStat";
import { useQuery } from "@tanstack/react-query";

export type TeamInfo = {
  color: string;
  alternateColor: string;
  logos: Logos[];
  displayName: string;
  nextEvent: NextEvent[];
  record: Record;
};

type Record = {
  items: Items[];
};

export type Items = {
  summary: string;
  stats: Stats[];
};

type Stats = {
  value: number;
};

export type NextEvent = {
  competitions: Competitions[];
  week: {
    text: string;
  };
};

type Competitions = {
  competitors: Competitors[];
  status: Status;
};

type Competitors = {
  team: Team;
};

type Team = {
  nickname: string;
  logos: Logos[];
};

type Status = {
  type: Type;
};

type Type = {
  shortDetail: string;
  description: string;
};

type Logos = {
  $ref: string;
  href: string;
};

type AllPositions = {
  [key: string]: Positions;
  wr: Positions;
  lt: Positions;
  lg: Positions;
  c: Positions;
  rg: Positions;
  rt: Positions;
  qb: Positions;
  rb: Positions;
  te: Positions;
};

type Positions = {
  athletes: Athlete[];
};

type Athlete = {
  rank: number;
  athlete: Logos;
};

export type PlayerInfo = {
  id: string;
  lastName: string;
  jersey: string;
  displayName: string;
  weight: number;
  displayHeight: string;
  age: number;
  debutYear: number;
  college: Logos;
  position: {
    abbreviation: string;
    name: string;
  };
  headshot: Logos;
  draft: {
    year: string;
    selection: string;
  };
};

function Teams() {
  const { id } = useParams();
  const teamId = Number(id) || 1;
  console.log(teamId);
  if (!((teamId > 0 && teamId < 31) || teamId == 33 || teamId == 34)) {
    return <Navigate to="/error" replace />; // Redirect to error route
  }
  const [modal, setModal] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerInfo>();
  const toggleModal = () => {
    setModal(!modal);
  };
  const { data: teamData } = useQuery<TeamInfo>({
    queryKey: ["teamData"],
    queryFn: async () => {
      const response = await fetch(
        `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}`
      );
      const data = await response.json();
      return data.team;
    },
  });
  const { data: fetchedUrl } = useQuery<AllPositions>({
    queryKey: ["fetchedUrl"],
    queryFn: async () => {
      const responseDepth = await fetch(
        `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/teams/${teamId}/depthcharts`
      );
      const data = await responseDepth.json();
      return data.items[2].positions;
    },
  });

  const fetchPlayerData = async () => {
    if (!fetchedUrl) return [];
    const allResults: PlayerInfo[] = [];
    const positions = ["qb", "rb", "wr", "te", "lt", "lg", "c", "rg", "rt"];

    for (const element of positions) {
      console.log(fetchedUrl);
      const primaryResponse = await fetch(
        fetchedUrl[element].athletes[0].athlete.$ref
      );
      console.log(element);
      const primaryResult = await primaryResponse.json();
      allResults.push(primaryResult);

      if (element === "wr") {
        const wrRequests = fetchedUrl[element].athletes
          .filter(
            (athlete: Athlete) => athlete.rank === 2 || athlete.rank === 3
          )
          .map((athlete: Athlete) =>
            fetch(athlete.athlete.$ref).then((res) => res.json())
          );

        const wrResults = await Promise.all(wrRequests);
        allResults.push(...wrResults);
      }
    }

    return allResults;
  };

  const { data, isLoading, isError } = useQuery<PlayerInfo[]>({
    queryKey: ["playerData", fetchedUrl],
    queryFn: fetchPlayerData,
    // enabled: !!fetchedUrl, // Ensures query only runs when `fetchedUrl` exists
  });

  if (isLoading) return <p>Loading player data...</p>;
  if (isError) return <p>Error fetching player data</p>;

  return (
    <>
      <Dropdown />
      {modal && teamData && currentPlayer && (
        <Modal
          toggleModal={toggleModal}
          team={teamData}
          player={currentPlayer}
        ></Modal>
      )}
      {data && data.length > 10 && teamData && (
        <div className="flex justify-center flex-col">
          <Title teamName={teamData} />

          <nav className="flex justify-center space-x-4 py-3 shadow-[0_0_8px_0_rgba(0,0,0,0.2)]">
            <button className="px-4 text-xl font-semibold ">Home</button>
            <button className="px-4 text-xl font-semibold ">Schedule</button>
            <button className="px-4 text-xl font-semibold ">Roster</button>
            <button className="px-4 text-xl font-semibold ">Stats</button>
            <button className="px-4 text-xl font-semibold ">News</button>
          </nav>

          <div className=" mx-12 my-6">
            <div className="grid grid-cols-2 gap-6">
              <NextGame
                nextEvent={teamData.nextEvent}
                color={teamData.color}
              ></NextGame>
              <TeamStat
                item={teamData.record.items[0]}
                color={teamData.color}
              ></TeamStat>
            </div>
            <div className="bg-[url('./assets/background.jpg')] bg-cover bg-center shadow-lg rounded-md">
              <div className="flex">
                <Card
                  team={teamData}
                  data={data[3]}
                  tailwind="top-6 mr-auto"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[3])}
                />
                <Card
                  team={teamData}
                  data={data[4]}
                  tailwind="top-14 mr-auto"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[4])}
                />
                <Card
                  team={teamData}
                  data={data[6]}
                  tailwind="top-6"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[6])}
                />
                <Card
                  team={teamData}
                  data={data[7]}
                  tailwind="top-3"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[7])}
                />
                <Card
                  team={teamData}
                  data={data[8]}
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[8])}
                />
                <Card
                  team={teamData}
                  data={data[9]}
                  tailwind="top-3"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[9])}
                />
                <Card
                  team={teamData}
                  data={data[10]}
                  tailwind="top-6"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[10])}
                />
                <Card
                  team={teamData}
                  data={data[5]}
                  tailwind="top-16 mr-auto"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[5])}
                />
                <Card
                  team={teamData}
                  data={data[2]}
                  tailwind="top-6 ml-auto"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[2])}
                />
              </div>
              <div className="flex justify-center">
                <Card
                  team={teamData}
                  data={data[0]}
                  tailwind="mb-14"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[0])}
                />
                <div className="flex absolute ml-64 mt-8">
                  <Card
                    team={teamData}
                    data={data[1]}
                    handleClick={toggleModal}
                    setCurrentPlayer={() => setCurrentPlayer(data[1])}
                  />
                </div>
              </div>
            </div>
            d
          </div>
        </div>
      )}
    </>
  );
}

export default Teams;
