import { useEffect, useState } from "react";
import Card from "./../components/Players";
import Title from "./../components/Title";
import Dropdown from "./../components/Dropdown";
import Modal from "./../components/Modal";
import { Navigate, useParams } from "react-router-dom";
import NextGame from "../components/NextGame";
import TeamStat from "../components/TeamStat";
type TeamInfo = {
  color: string;
  alternateColor: string;
  logos: [Logos];
  displayName: string;
  nextEvent: NextEvent[];
  record: Record;
};

type Record = {
  items: Items[];
};

type Items = {
  summary: string;
  stats: Stats[];
};

type Stats = {
  value: number;
};

type NextEvent = {
  competitions: Competitions[];
  week: Week;
};

type Week = {
  text: string;
};

type Competitions = {
  competitors: [Competitors];
  status: Status;
};

type Competitors = {
  team: Team;
};

type Team = {
  nickname: string;
  logos: [Logos];
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
  athletes: [Athlete];
};

type Athlete = {
  rank: number;
  athlete: Logos;
};
type Position = {
  name: string;
  abbreviation: string;
};

type PlayerInfo = {
  id: string;
  lastName: string;
  jersey: string;
  displayName: string;
  weight: number;
  displayHeight: string;
  age: number;
  debutYear: number;
  college: Logos;
  position: Position;
  headshot: Logos;
  draft: Draft;
};

type Draft = {
  year: string;
  selection: string;
};
function Teams() {
  const { id } = useParams();
  const teamId = Number(id) || 1;
  if (!((teamId > 0 && teamId < 31) || teamId == 33 || teamId == 34)) {
    return <Navigate to="/error" replace />; // Redirect to error route
  }
  const [modal, setModal] = useState(false);
  const [initialUrl, setInitialUrl] = useState(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2024/teams/${teamId}/depthcharts`
  );
  const [teamUrl, setTeamUrl] = useState(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}`
  );
  const [teamData, setTeamData] = useState<TeamInfo>();
  const [fetchedUrl, setFetchedUrl] = useState<AllPositions>();
  const [data, setData] = useState<PlayerInfo[]>([]);
  const positions = ["qb", "rb", "wr", "te", "lt", "lg", "c", "rg", "rt"];
  const [currentPlayer, setCurrentPlayer] = useState<PlayerInfo>();
  const toggleModal = () => {
    setModal(!modal);
  };
  useEffect(() => {
    const fetchTeamUrl = async () => {
      try {
        const response = await fetch(teamUrl);
        const result = await response.json();
        setTeamData(result.team);
        const responseDepth = await fetch(initialUrl);
        const resultDepth = await responseDepth.json();
        setFetchedUrl(resultDepth.items[2].positions);
      } catch (error) {
        console.error("Error fetching initial URL:", error);
      }
    };
    fetchTeamUrl();
  }, [teamUrl, initialUrl]);

  useEffect(() => {
    if (!fetchedUrl) return;
    const fetchData = async () => {
      const allResults: PlayerInfo[] = [];
      for (const element of positions) {
        const response = await fetch(
          fetchedUrl[element].athletes[0].athlete.$ref
        );
        const result = await response.json();
        allResults.push(result);
        if (element === "wr") {
          for (let i = 0; i < fetchedUrl[element].athletes.length; i += 1) {
            if (
              fetchedUrl[element].athletes[i].rank == 2 ||
              fetchedUrl[element].athletes[i].rank == 3
            ) {
              const response = await fetch(
                fetchedUrl[element].athletes[i].athlete.$ref
              );
              const result = await response.json();
              allResults.push(result);
            }
          }
        }
      }
      setData(allResults);
    };

    fetchData();
  }, [fetchedUrl]);

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
      {data.length > 10 && teamData ? (
        <div className="flex justify-center">
          <div className="w-full mx-12 my-6">
            <Title teamName={teamData} />
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
              <div className="flex justify-center max-m">
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
          </div>
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}

export default Teams;
