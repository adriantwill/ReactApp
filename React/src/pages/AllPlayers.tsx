import { useQuery } from "@tanstack/react-query";
import Dropdown from "../components/Dropdown";
import PlayerCard from "../components/PlayerCard";
import { supabase } from "../supabase-client";
import { Database } from "../lib/database.types";
import MainPageTitle from "../subcomponents/MainPageTitle";
import InfoSubHeader from "../subcomponents/InfoSubHeader";

type Player = Database["public"]["Tables"]["Players"]["Row"];
type Team = Database["public"]["Tables"]["Team"]["Row"];

function AllPlayers() {
  const fetchPlayer = async () => {
    const { data, error } = await supabase
      .from("Players")
      .select("*")
      .eq("position", "QB");
    if (error) {
      console.log("error", error);
      throw error;
    }
    return data;
  };

  const {
    data: players,
    isLoading,
    isError,
  } = useQuery<Player[]>({
    queryKey: ["player"],
    queryFn: fetchPlayer,
  });
  const fetchTeams = async () => {
    const { data, error } = await supabase.from("Team").select("*");
    if (error) {
      console.log("error", error);
      throw error;
    }
    return data;
  };

  const { data: teams = [] } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });

  // If still loading players or teams, show loading message
  if (isLoading) {
    return (
      <div className="text-center p-10 bg-primary">Loading players...</div>
    );
  }

  // If there is an error fetching players or teams, show error message
  if (isError) {
    return (
      <div className="text-center p-10 text-red-500">
        Error loading players!
      </div>
    );
  }
  const playersList = Array.isArray(players) ? players : [];
  console.log(teams);
  return (
    <>
      <Dropdown />
      <div className="animate-fade-in-down bg-primary">
        <MainPageTitle title="Players" />
        <div className="pl-10">
          <InfoSubHeader text="Quarterbacks" />
        </div>
        <div className="flex relative overflow-scroll gap-12 px-10 pb-10">
          {playersList.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              team={teams.find((team) => team.espnid === player.teamid)}
            />
          ))}
        </div>
        <InfoSubHeader text="Wide Recievers" />
        <div className="flex relative overflow-scroll gap-12 px-10 pb-10">
          {playersList.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              team={teams.find((team) => team.espnid === player.teamid)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default AllPlayers;
