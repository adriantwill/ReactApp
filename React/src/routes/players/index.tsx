import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/players/")({
  component: RouteComponent,
});

import { useQuery } from "@tanstack/react-query";
import PlayerCard from "../../components/PlayerCard";
import InfoSubHeader from "../../subcomponents/InfoSubHeader";
import MainPageTitle from "../../subcomponents/MainPageTitle";
import { supabase } from "../../supabase-client";
import { Database } from "../../lib/database.types";

type Player = Database["public"]["Tables"]["Players"]["Row"];
type Team = Database["public"]["Tables"]["Team"]["Row"];
function RouteComponent() {
  const {
    data: players,
    isLoading,
    isError,
  } = useQuery<Player[]>({
    queryKey: ["player"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Players")
        .select("*")
        .eq("position", "QB")
        .gt("contract", 0);
      if (error) {
        throw error;
      }
      return data;
    },
  });

  const { data: teams = [] } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Team").select("*");
      if (error) {
        throw error;
      }
      return data;
    },
  });
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
      <div className="animate-fade-in-down bg-primary">
        <MainPageTitle title="Players" />
        <div className="pl-10">
          <InfoSubHeader text="Quarterbacks" />
        </div>
        <div className="flex relative overflow-scroll gap-12 px-10 pb-10">
          {isLoading
            ? Array(10)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-80 w-96 bg-gray-300 rounded-lg"></div>
                  </div>
                ))
            : playersList.map((player) => (
                <Link
                  key={player.espnid}
                  to="/players/$playerId"
                  params={{ playerId: player.espnid }}
                >
                  <PlayerCard
                    player={player}
                    team={teams.find((t) => t.espnid === player.teamid)}
                  />
                </Link>
              ))}
        </div>
      </div>
    </>
  );
}
