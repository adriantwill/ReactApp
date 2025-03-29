import { useParams } from "react-router";
import Dropdown from "../components/Dropdown";
import StatsSection from "../components/StatsSection";
import TimelinePoint from "../components/TimelinePoint";
import PlayerPageSmallCard from "../components/PlayerPageSmallCard";
import PlayerTraits from "../subcomponents/PlayerTraits";
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
import PlayerNameTitle from "../components/PlayerNameTitle";
import InfoSubHeader from "../subcomponents/InfoSubHeader";
import PlayerCareerTableStat from "../subcomponents/PlayerCareerTableStat";

type Player = Database["public"]["Tables"]["Players"]["Row"];
type Team = Database["public"]["Tables"]["Team"]["Row"];
type PlayerTeams = Database["public"]["Tables"]["Player_Team"]["Row"];
type PlayerPassingStats = Database["public"]["Tables"]["Passing_Stats"]["Row"];
type PlayerRushingStats = Database["public"]["Tables"]["Rushing_Stat"]["Row"];
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

type CareerStats = {
  yards: number;
  touchdowns: number;
  interceptions: number;
  name: string;
  abreviation: string;
  year: number;
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
      .from("Team")
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

  // const fetchCareerStats = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/${playerId}/statisticslog`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch player statistics log");
  //     }

  //     const statsLog = await response.json();

  //     console.log(statsLog);
  //     // Extract item references from the stats log
  //     const itemRefs = statsLog.entries?.map((item) => item.$ref) || [];
  //     console.log(itemRefs);

  //     // Fetch each stats item
  //     const statsPromises = itemRefs.map((ref) =>
  //       fetch(ref).then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`Failed to fetch stats at ${ref}`);
  //         }
  //         return response.json();
  //       })
  //     );

  //     // Wait for all stats to be fetched
  //     const statsResults = await Promise.all(statsPromises);

  //     // Transform into career stats format
  //     return statsResults.map((stat) => ({
  //       yards: stat.passing?.yards || 0,
  //       touchdowns: stat.passing?.touchdowns || 0,
  //       interceptions: stat.passing?.interceptions || 0,
  //       name: stat.team?.displayName || "",
  //       abreviation: stat.team?.abbreviation || "",
  //       year: stat.season?.year || 0,
  //     }));
  //   } catch (err) {
  //     console.error("Error fetching career stats:", err);
  //     return [];
  //   }
  // };

  // const { data: careerStats } = useQuery<CareerStats[]>({
  //   queryKey: ["player"],
  //   queryFn: fetchCareerStats,
  //   refetchOnWindowFocus: false,
  // });

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
    queryKey: ["playerPassingStats"],
    queryFn: fetchPlayerPassingStats,
    refetchOnWindowFocus: false,
  });
  const fetchPlayerRushingStats = async () => {
    const { data, error } = await supabase
      .from("Rushing_Stat")
      .select("*")
      .eq("espnid", playerId)
      .limit(1);
    if (error) {
      console.log("error", error);
      throw error;
    }
    console.log(data);
    return data[0];
  };
  const { data: playerRushingStats } = useQuery<PlayerRushingStats>({
    queryKey: ["playerRusingStats"],
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

  const seasonData = [
    {
      season: "2015",
      team: "Louisville",
      passingYards: 1840,
      complations: 135,
      touchdowns: 12,
      interceptions: 8,
      logo: "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/97.png",
      color: "#c9001f",
    },
    {
      season: "2016",
      team: "Louisville",
      passingYards: 4282,
      complations: 135,
      touchdowns: 29,
      interceptions: 7,
      rating: 104.6,
      logo: "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/97.png",
      color: "#c9001f",
    },
    {
      season: "2017",
      team: "Louisville",
      passingYards: 3660,
      complations: 254,
      touchdowns: 27,
      interceptions: 10,
      logo: "https://a.espncdn.com/i/teamlogos/ncaa/500-dark/97.png",
      color: "#c9001f",
    },
  ];

  const { data: playerCharacteristics } = useQuery<PlayerCharacteristics>({
    queryKey: ["playerCharacteristics"],
    queryFn: fetchPlayerCharacteristics,
    refetchOnWindowFocus: false,
  });

  let statsTable1 = rushingStats;
  let statsTable2 = rushingStats;
  let characteristics = rushingCharacteristics;
  let fullPosition = "Running Back";
  if (isLoading)
    return <div className="text-center py-10">Loading player data...</div>;
  if (isError || !player || !team || !teams || !allteams)
    return <div>Error</div>;
  if (player.position === "QB") {
    statsTable1 = passingStats;
    statsTable2 = rushingStats;
    characteristics = passingCharacteristics;
    fullPosition = "Quarterback";
  } else if (player.position === "RB") {
    statsTable1 = rushingStats;
    statsTable2 = passingStats;
    characteristics = rushingCharacteristics;
  }
  return (
    <>
      <Dropdown />
      <div className="animate-fade-in-down bg-primary">
        <div className="" style={{ backgroundColor: `#${team?.color}` }}>
          <div className="px-32 flex justify-between h-56">
            <PlayerNameTitle
              name={player.name}
              number={player.number}
              position={fullPosition}
            />
            <div className="relative w-60 self-end ">
              <img
                src={`https://a.espncdn.com/i/headshots/nfl/players/full/${player.espnid}.png`}
                className="relative z-10"
              />
              <img
                src={`https://a.espncdn.com/i/teamlogos/nfl/500-dark/${team.abbreviation}.png`}
                className="absolute opacity-50 -bottom-4 left-0"
              />
            </div>
          </div>
        </div>
        <div className="px-32 py-10 flex flex-col gap-10">
          <div>
            <InfoSubHeader text="Player Info" />
            <div className="flex justify-between gap-10">
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
                title="Characteristics"
                tailwind="justify-evenly "
                color={team.color}
              >
                <PlayerTraits
                  characteristicLabel={characteristics}
                  playerCharacteristics={playerCharacteristics}
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
                      <div className=" text-center proper capitalize">
                        {String(attribute)}
                      </div>
                    </div>
                  ))}
              </PlayerPageSmallCard>
            </div>
          </div>
          <div>
            <InfoSubHeader text="Stats" />
            <div className="flex justify-between gap-10">
              <StatsSection
                title="Passing"
                stats={playerPassingStats}
                table={statsTable1}
                color={team.color}
              />
              <StatsSection
                title="Rushing"
                stats={playerRushingStats}
                table={statsTable2}
                color={team.color}
              />
            </div>
          </div>
          <div className="">
            <InfoSubHeader text="Career" />
            <div className="flex gap-10">
              <div className="w-1/2 h-80 px-8 py-6 overflow-y-auto bg-white rounded-sm shadow-surround">
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
              </div>
              <div className="w-1/2 bg-white h-80 shadow-surround rounded-sm  overflow-auto p-4 flex flex-col gap-6">
                {seasonData.map((season, index) => (
                  <div key={index} className="">
                    <div
                      className="flex justify-between items-center mb-2 px-2 text-white rounded-sm "
                      style={{ backgroundColor: `${season.color}` }}
                    >
                      <span className="text-xl font-medium">
                        {season.season}
                      </span>
                      <div className="flex items-center">
                        <span className="mr-1">{season.team} </span>
                        <img className="h-6" src={season.logo} />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 px-2">
                      <PlayerCareerTableStat
                        title="Passing Yards"
                        amount={season.passingYards}
                      />
                      <PlayerCareerTableStat
                        title="Completions"
                        amount={season.complations}
                      />
                      <PlayerCareerTableStat
                        title="Touchdowns"
                        amount={season.touchdowns}
                      />
                      <PlayerCareerTableStat
                        title="Interceptions"
                        amount={season.interceptions}
                      />
                    </div>
                    <div className="mt-2 border-t border-gray-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Players;
