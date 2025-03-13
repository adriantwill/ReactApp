import { useParams } from "react-router";
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
import React from "react";
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
type TeamDetails = {
  id: string;
  uid: string;
  slug: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  name: string;
  nickname: string;
  location: string;
  color: string;
  alternateColor: string;
  isActive: boolean;
  isAllStar: boolean;
  logos: {
    href: string;
  }[];
};

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
    data.sort((a, b) => {
      if (a.start_date > b.start_date) {
        return 1;
      } else {
        return -1;
      }
    });
    return data;
  };
  const fetchTeams = async (teams: PlayerTeams[]) => {
    const data = [];
    let error = null;

    for (const team of teams) {
      try {
        let response;
        if (team.nfl) {
          response = await fetch(
            `http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team.team_id}`
          );
        } else {
          response = await fetch(
            `http://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${team.team_id}`
          );
        }
        if (!response.ok) {
          throw new Error(`Failed to fetch team ${team.team_id}`);
        }
        const teamData = await response.json();
        data.push(teamData.team);
      } catch (err) {
        console.error(`Error fetching team ${team.team_id}:`, err);
        error = err;
      }
    }
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
  const { data: allteams } = useQuery<TeamDetails[]>({
    queryKey: ["teams", teams],
    queryFn: () => fetchTeams(teams || []),
    enabled: !!teams,
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
  if (isError || !player || !team || !teams || !allteams)
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
    <div className="animate-fade-in-down">
      <Dropdown />
      <div className="mb-12" style={{ backgroundColor: `#${team?.color}` }}>
        <div className="w-[90rem] mx-auto flex justify-between h-52 overflow-hidden">
          <div className="py-8 flex flex-col justify-around">
            <h1 className="text-white text-6xl font-bold ">{player.name}</h1>
            <h2 className="text-white text-4xl font-medium">
              {player.position + " | #" + player.number}
            </h2>
          </div>
          <div className="relative w-60 self-end ">
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
                  teamInfo={allteams.find(
                    (team) => team.id === timelineTeam.team_id
                  )}
                ></TimelinePoint>
              ))}
          </PlayerPageMediumCard>
        </div>
      </div>
    </div>
  );
}
export default Players;
