import { Navigate, useParams } from "react-router";
import Dropdown from "../components/Dropdown";
import logo from "../assets/DET.webp";
import StatsSection from "../components/StatsSection";
import TimelinePoint from "../components/TimelinePoint";
import PlayerPageSmallCard from "../components/PlayerPageSmallCard";
import PlayerTraits from "../subcomponents/PlayerTraits";
import PlayerPageMediumCard from "../components/PlayerPageMediumCard";
import { supabase } from "../supabase-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFootball } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { Database } from "../lib/database.types";
import PlayerInfo from "../subcomponents/PlayerSalaryAge";

type Player = Database["public"]["Tables"]["Players"]["Row"];
type Team = Database["public"]["Tables"]["Teams"]["Row"];
type PlayerTeams = Database["public"]["Tables"]["Player_Team"]["Row"];
type PlayerStats = Database["public"]["Tables"]["Passing_Stats"]["Row"];
type PlayerCharacteristics =
  Database["public"]["Tables"]["Passing_Characteristic"]["Row"];
type Colleage_Team = Database["public"]["Tables"]["College_Teams"]["Row"];

function Players() {
  const { id } = useParams();
  const playerId = Number(id) || 3046779;
  const fetchPlayer = async () => {
    const { data, error } = await supabase
      .from("Players")
      .select("*")
      .eq("espnid", playerId);
    if (error) {
      console.log("error", error);
      throw error;
    }
    return data[0];
  };
  const fetchTeam = async () => {
    const { data, error } = await supabase
      .from("Teams")
      .select("*")
      .eq("espnid", player?.teamid);
    if (error) {
      console.log("error", error);
      throw error;
    }
    return data[0];
  };
  const fetchPlayerTeams = async () => {
    const { data, error } = await supabase
      .from("Player_Team")
      .select("*")
      .eq("player_espnid", player?.espnid);
    if (error) {
      console.log("error", error);
      throw error;
    }
    return data;
  };
  const {
    data: player,
    isLoading,
    isError,
  } = useQuery<Player>({
    queryKey: ["player"],
    queryFn: fetchPlayer,
    refetchOnWindowFocus: false,
  });

  const { data: team } = useQuery<Team>({
    queryKey: ["team", player],
    queryFn: fetchTeam,
    enabled: !!player,
    refetchOnWindowFocus: false,
  });
  const { data: teams } = useQuery<PlayerTeams[]>({
    queryKey: ["playerTeams", player],
    queryFn: fetchPlayerTeams,
    enabled: !!player,
    refetchOnWindowFocus: false,
  });

  const fetchTeamDetails = async (teamId: string, nfl: boolean) => {
    const { data, error } = await supabase
      .from(nfl ? "Teams" : "College_Teams")
      .select("*")
      .eq("espnid", teamId);
    if (error) {
      console.log("error fetching team details", error);
      throw error;
    }
    return data[0];
  };

  const { data: teamDetails } = useQuery<Team[]>({
    queryKey: ["teamDetails", teams],
    queryFn: async () => {
      if (!teams || !teams.length) return [];

      // Use Promise.all properly to create a clean array
      const teamDetailsArray = await Promise.all(
        teams.map(async (playerTeam) => {
          if (playerTeam.team_id) {
            return await fetchTeamDetails(playerTeam.team_id, playerTeam.nfl);
          }
          return null; // Return null for teams without IDs
        })
      );

      // Filter out null values
      const filteredTeamDetails = teamDetailsArray.filter(
        (detail): detail is Team => detail !== null
      );

      return filteredTeamDetails;
    },
    enabled: !!teams && teams.length > 0,
    refetchOnWindowFocus: false,
  });
  console.log("fsdiujf", teamDetails);
  if (isLoading)
    return <div className="text-center py-10">Loading player data...</div>;
  if (isError || !player || !team || !teams || !teamDetails)
    return <div className="text-center py-10">Error loading data</div>;
  const passingStats = [
    { label: "EPA", value: 1000, description: "Real" },
    { label: "Adj Completion %", value: 100, description: "Real" },
    { label: "Touchdowns", value: 20, description: "Real" },
    { label: "Pressure to Sack %", value: 20, description: "Real" },
    { label: "Avg Time to Throw", value: 20, description: "Real" },
    { label: "Interception %", value: 20, description: "Real" },
    { label: "Interception %", value: 20, description: "Real" },
    { label: "Interception %", value: 20, description: "Real" },
    { label: "Interception %", value: 20, description: "Real" },
    { label: "Interception %", value: 20, description: "Real" },
  ];

  const rushingStats = [
    { label: "Yards", value: 1000, description: "Real" },
    { label: "Completion %", value: 100, description: "Real" },
    { label: "Touchdowns", value: 20, description: "Real" },
    { label: "Pressure to Sack %", value: 20, description: "Real" },
    { label: "Avg Time to Throw", value: 20, description: "Real" },
  ];

  return (
    <>
      <Dropdown />
      <div className=" mb-12" style={{ backgroundColor: `#${team?.color}` }}>
        <div className="w-[90rem] mx-auto flex justify-between h-52">
          <div className="py-8 flex flex-col justify-around">
            <h1 className="text-white text-6xl font-bold ">{player.name}</h1>
            <h2 className="text-white text-4xl font-medium">
              {player.position + " | #" + player.number}
            </h2>
          </div>
          <div className="relative w-60 self-end">
            <img
              src={`https://a.espncdn.com/i/headshots/nfl/players/full/${player.espnid}.png`}
              className="relative z-10"
            />
            <img
              src={team?.logo}
              className="absolute opacity-50 -bottom-4 left-0"
            />
          </div>
        </div>
      </div>
      <div className="w-[90rem] mx-auto space-y-12">
        <div className="flex justify-between">
          <PlayerPageSmallCard title="Info" tailwind=" justify-evenly">
            <PlayerInfo
              age={player.age}
              salary={player.contract}
              height={player.height}
              weight={player.weight}
            />
          </PlayerPageSmallCard>
          <PlayerPageSmallCard title="Traits" tailwind="grid grid-cols-3 ">
            {Array.isArray(player.attributes) &&
              player.attributes.map((attribute, index) => (
                <div key={index} className="flex flex-col">
                  <FontAwesomeIcon icon={faFootball} className="fa-2xl" />
                  <div className="text-lg text-center proper capitalize">
                    {String(attribute)}
                  </div>
                </div>
              ))}
          </PlayerPageSmallCard>
          <PlayerPageSmallCard
            title="Characteristics"
            tailwind="justify-evenly"
          >
            <PlayerTraits />
          </PlayerPageSmallCard>
        </div>
        <div className="flex justify-between">
          {" "}
          <PlayerPageMediumCard title="Stats">
            <div className="grid grid-cols-2 gap-6 h-[20rem] mx-8 my-4 ">
              <StatsSection title="Passing" stats={passingStats} />
              <StatsSection title="Rushing" stats={rushingStats} />
            </div>
          </PlayerPageMediumCard>
          <PlayerPageMediumCard title="Timeline">
            <div className="h-[22rem] py-4 overflow-auto">
              {Array.isArray(teams) &&
                teams.map((timelineTeam, index) => (
                  <TimelinePoint
                    key={index}
                    index={index}
                    team={timelineTeam}
                    teamInfo={teamDetails[index]}
                  ></TimelinePoint>
                ))}
            </div>
          </PlayerPageMediumCard>
        </div>
      </div>
    </>
  );
}
export default Players;
