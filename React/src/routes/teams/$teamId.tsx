import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Modal from "../../components/Modal";
import Card from "../../components/Players";
import TeamButton from "../../components/TeamButton";
import TeamStats from "../../components/TeamStats";
import Title from "../../components/Title";
import { PlayerInfo, TeamInfo, AllPositions, Athlete } from "../../lib/types";
import InfoSubHeader from "../../subcomponents/InfoSubHeader";
import TeamStat from "../../subcomponents/TeamStat";
import { supabase } from "../../supabase-client";
import { Database } from "../../lib/database.types";
import backgroundSVG from "./../../assets/background.svg";

type Team = Database["public"]["Tables"]["Team"]["Row"];
type TeamStats = Database["public"]["Tables"]["Team_Stat"]["Row"];

export const Route = createFileRoute("/teams/$teamId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      teamId: params.teamId,
    };
  },
});

function RouteComponent() {
  const { teamId } = Route.useLoaderData();
  if (
    !(
      (Number(teamId) > 0 && Number(teamId) < 31) ||
      Number(teamId) == 33 ||
      Number(teamId) == 34
    )
  ) {
    return <div>Error</div>;
  }
  const [modal, setModal] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerInfo>();
  const toggleModal = () => {
    setModal(!modal);
  };

  const { data: supabaseTeam } = useQuery<Team>({
    queryKey: ["supabaseTeam"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Team")
        .select("*")
        .eq("espnid", teamId)
        .single();
      if (error) throw error;
      return data;
    },
  });
  const { data: supabaseTeamStats } = useQuery<TeamStats>({
    queryKey: ["supabaseTeamStats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Team_Stat")
        .select("*")
        .eq("espnid", teamId)
        .single();
      if (error) throw error;

      return data;
    },
  });

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
      const primaryResponse = await fetch(
        fetchedUrl[element].athletes[0].athlete.$ref.replace("http:", "https:")
      );
      const primaryResult = await primaryResponse.json();
      allResults.push(primaryResult);

      if (element === "wr") {
        const wrRequests = fetchedUrl[element].athletes
          .filter(
            (athlete: Athlete) => athlete.rank === 2 || athlete.rank === 3
          )
          .map((athlete: Athlete) =>
            fetch(athlete.athlete.$ref.replace("http:", "https:")).then((res) =>
              res.json()
            )
          );

        const wrResults = await Promise.all(wrRequests);
        allResults.push(...wrResults);
      }
    }

    return allResults;
  };
  const [selectedButton, setSelectedButton] = useState<number>(0);

  const { data, isLoading, isError } = useQuery<PlayerInfo[]>({
    queryKey: ["playerData", fetchedUrl],
    queryFn: fetchPlayerData,
    // enabled: !!fetchedUrl, // Ensures query only runs when `fetchedUrl` exists
  });

  if (isLoading) return <p>Loading player data...</p>;
  if (isError || !data || !teamData) return <p>Error fetching player data</p>;

  return (
    <>
      {modal && currentPlayer && (
        <Modal
          toggleModal={toggleModal}
          team={teamData}
          player={currentPlayer}
        ></Modal>
      )}
      {data.length > 10 && (
        <div className="flex justify-center flex-col animate-fade-in-down bg-primary">
          <Title teamName={teamData} />

          <nav className="flex gap-4 justify-center py-2 shadow-surround bg-white">
            {["Offense", "Defense"].map((title, index) => (
              <TeamButton
                key={index}
                color={teamData.color}
                title={title}
                selected={selectedButton === index}
                onClick={() => setSelectedButton(index)}
              />
            ))}
          </nav>

          <div className="p-10 flex flex-col gap-10">
            <div>
              <InfoSubHeader text="Breakdown" />
              <div className="flex gap-10">
                <TeamStats
                  color={teamData.color}
                  tailwind="w-7/12"
                  title="Team Statistics"
                >
                  <TeamStat
                    title="EPA Per Play"
                    summary={String(supabaseTeamStats?.epaoffense)}
                    rank={15}
                  />
                  <TeamStat
                    title="Success Rate"
                    summary={String(supabaseTeamStats?.sroffense) + "%"}
                    rank={9}
                  />
                  <TeamStat
                    title="Red Zone Scoring"
                    summary={String(supabaseTeamStats?.rzrate) + "%"}
                    rank={17}
                  />
                  <TeamStat
                    title="PROE"
                    summary={String(supabaseTeamStats?.proe) + "%"}
                    rank={24}
                  />
                </TeamStats>
                <TeamStats
                  color={teamData.color}
                  tailwind="w-5/12"
                  title="Coaching Staff"
                >
                  <TeamStat
                    title="Head Coach"
                    summary={supabaseTeam?.hc || ""}
                  />
                  <TeamStat
                    title="Offensive Coordinator"
                    summary={supabaseTeam?.oc || ""}
                  />
                </TeamStats>
              </div>
            </div>
            <div>
              <InfoSubHeader text="Depth Chart" />

              <div
                style={{ backgroundImage: `url(${backgroundSVG})` }}
                className="bg-cover bg-center rounded-sm shadow-surround p-6"
              >
                <div className="flex mb-2">
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
                <div className="flex justify-center w-full">
                  <div className="w-24 m-4 py-3 invisible"></div>
                  <Card
                    team={teamData}
                    data={data[0]}
                    tailwind=""
                    handleClick={toggleModal}
                    setCurrentPlayer={() => setCurrentPlayer(data[0])}
                  />
                  <Card
                    team={teamData}
                    data={data[1]}
                    tailwind="mt-12"
                    handleClick={toggleModal}
                    setCurrentPlayer={() => setCurrentPlayer(data[1])}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
