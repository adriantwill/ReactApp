import { Navigate, useParams } from "react-router";
import Dropdown from "../components/Dropdown";
import StatsSection from "../components/StatsSection";
import TimelinePoint from "../components/TimelinePoint";
import PlayerPageSmallCard from "../components/PlayerPageSmallCard";
import PlayerTraits from "../subcomponents/PlayerTraits";
import PlayerPageMediumCard from "../components/PlayerPageMediumCard";
import { supabase } from "../supabase-client";
import { useQuery } from "@tanstack/react-query";
import { Database } from "../lib/database.types";
import PlayerInfo from "../subcomponents/PlayerSalaryAge";
import { getTraitIcon } from "../lib/icons";
import React, { useState, useEffect } from "react";
import { passingStats, rushingStats } from "../lib/statlabels";
import {
  passingCharacteristics,
  rushingCharacteristics,
} from "../lib/characteristiclabels";

type Player = Database["public"]["Tables"]["Players"]["Row"];
type Team = Database["public"]["Tables"]["Teams"]["Row"];
type PlayerTeams = Database["public"]["Tables"]["Player_Team"]["Row"];
type PlayerPassingStats = Database["public"]["Tables"]["Passing_Stats"]["Row"];
type PlayerCharacteristics =
  Database["public"]["Tables"]["Passing_Characteristic"]["Row"];
type College_Team = Database["public"]["Tables"]["College_Teams"]["Row"];

function Players() {
  const { id } = useParams();
  const playerId = Number(id) || 3046779;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

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
  const fetchPlayerPassingStats = async () => {
    const { data, error } = await supabase
      .from("Passing_Stats")
      .select("*")
      .eq("espnid", playerId);
    if (error) {
      console.log("error", error);
      throw error;
    }
    return data[0];
  };
  const { data: playerPassingStats } = useQuery<PlayerPassingStats>({
    queryKey: ["playerPassingStats", player],
    queryFn: fetchPlayerPassingStats,
    enabled: !!player,
    refetchOnWindowFocus: false,
  });
  const fetchPlayerRushingStats = async () => {
    const { data, error } = await supabase
      .from("Rushing_Stat")
      .select("*")
      .eq("espnid", playerId);
    if (error) {
      console.log("error", error);
      throw error;
    }
    return data[0];
  };
  const { data: playerRushingStats } = useQuery<PlayerPassingStats>({
    queryKey: ["playerPassingStats"],
    queryFn: fetchPlayerRushingStats,
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
      const teamDetailsArray = await Promise.all(
        teams.map(async (playerTeam) => {
          if (playerTeam.team_id) {
            return await fetchTeamDetails(playerTeam.team_id, playerTeam.nfl);
          }
          return null;
        })
      );
      const filteredTeamDetails = teamDetailsArray.filter(
        (detail): detail is Team => detail !== null
      );

      return filteredTeamDetails;
    },
    enabled: !!teams && teams.length > 0,
    refetchOnWindowFocus: false,
  });
  const fetchPlayerCharacteristics = async () => {
    const { data, error } = await supabase
      .from("Passing_Characteristic")
      .select("*")
      .eq("espnid", playerId);
    if (error) {
      console.log("error", error);
      throw error;
    }
    return data[0];
  };

  const { data: playerCharacteristics } = useQuery<PlayerCharacteristics>({
    queryKey: ["playerCharacteristics", player],
    queryFn: fetchPlayerCharacteristics,
    enabled: !!player,
    refetchOnWindowFocus: false,
  });

  let statsTable1 = rushingStats;
  let statsTable2 = rushingStats;
  let characteristics = rushingCharacteristics;
  if (isLoading)
    return <div className="text-center py-10">Loading player data...</div>;
  if (isError || !player || !team || !teams || !teamDetails)
    return <div>Error</div>;
  if (player.position === "QB") {
    statsTable1 = passingStats;
    statsTable2 = rushingStats;
    characteristics = passingCharacteristics;
  } else if (player.position === "RB") {
    statsTable1 = rushingStats;
    statsTable2 = passingStats;
    characteristics = rushingCharacteristics;
  }

  return (
    <>
      <div
        className={`${
          isVisible ? "animate-fade-in-down" : "opacity-0"
        } bg-white`}
      >
        <Dropdown />
        <div className="mb-12" style={{ backgroundColor: `#${team?.color}` }}>
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
                src={team.logo}
                className="absolute opacity-50 -bottom-4 left-0"
              />
            </div>
          </div>
        </div>
        <div className="w-[90rem] mx-auto space-y-12">
          <div className="flex justify-between">
            <PlayerPageSmallCard
              title="Info"
              tailwind=" justify-evenly"
              color={team.color}
            >
              <PlayerInfo
                age={player.age}
                salary={player.contract}
                height={player.height}
                weight={player.weight}
              />
            </PlayerPageSmallCard>
            <PlayerPageSmallCard
              title="Traits"
              tailwind="grid grid-flow-col"
              color={team.color}
            >
              {Array.isArray(player.attributes) &&
                player.attributes.map((attribute, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {React.createElement(getTraitIcon(String(attribute)), {
                      size: 36,
                    })}
                    <div className="text-lg text-center proper capitalize">
                      {String(attribute)}
                    </div>
                  </div>
                ))}
            </PlayerPageSmallCard>
            <PlayerPageSmallCard
              title="Characteristics"
              tailwind="justify-evenly "
              color={team.color}
            >
              <PlayerTraits
                characteristicLabel={characteristics}
                playerCharacteristics={playerCharacteristics}
              />
            </PlayerPageSmallCard>
          </div>
          <div className="flex justify-between">
            {" "}
            <PlayerPageMediumCard
              title="Stats"
              tailwind="grid grid-cols-2 gap-6"
              color={team.color}
            >
              <StatsSection
                title="Passing"
                stats={playerPassingStats}
                table={statsTable1}
              />
              <StatsSection
                title="Rushing"
                stats={playerRushingStats}
                table={statsTable2}
              />
            </PlayerPageMediumCard>
            <PlayerPageMediumCard
              title="Timeline"
              tailwind="overflow-y-auto"
              color={team.color}
            >
              {Array.isArray(teams) &&
                teams.map((timelineTeam, index) => (
                  <TimelinePoint
                    key={index}
                    index={index}
                    team={timelineTeam}
                    teamInfo={teamDetails[index]}
                  ></TimelinePoint>
                ))}
            </PlayerPageMediumCard>
          </div>
        </div>
      </div>
    </>
  );
}
export default Players;
