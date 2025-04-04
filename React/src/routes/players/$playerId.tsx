import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import PlayerNameTitle from "../../components/PlayerNameTitle";
import PlayerPageSmallCard from "../../components/PlayerPageSmallCard";
import StatsSection from "../../components/StatsSection";
import TimelinePoint from "../../components/TimelinePoint";
import { getTraitIcon } from "../../lib/icons";
import InfoSubHeader from "../../subcomponents/InfoSubHeader";
import PlayerCareerTableStat from "../../subcomponents/PlayerCareerTableStat";
import PlayerInfo from "../../subcomponents/PlayerSalaryAge";
import PlayerTraits from "../../subcomponents/PlayerTraits";
import { useQuery } from "@tanstack/react-query";
import {
  rushingCharacteristics,
  passingCharacteristics,
} from "../../lib/characteristiclabels";
import { rushingStats, passingStats } from "../../lib/statlabels";
import { CareerStats, TeamDetails } from "../../lib/types";
import { supabase } from "../../supabase-client";
import { Database } from "../../lib/database.types";

type Player = Database["public"]["Tables"]["Players"]["Row"];
type Team = Database["public"]["Tables"]["Team"]["Row"];
type PlayerTeams = Database["public"]["Tables"]["Player_Team"]["Row"];
type PlayerPassingStats = Database["public"]["Tables"]["Passing_Stats"]["Row"];
type PlayerRushingStats = Database["public"]["Tables"]["Rushing_Stat"]["Row"];
type PlayerCharacteristics =
  Database["public"]["Tables"]["Passing_Characteristic"]["Row"];

export const Route = createFileRoute("/players/$playerId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      playerId: params.playerId,
    };
  },
});

function RouteComponent() {
  const { playerId } = Route.useLoaderData();
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
            `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team.team_id}`
          );
        } else {
          response = await fetch(
            `https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${team.team_id}`
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

  const fetchCareerStats = async (apiurl: string) => {
    try {
      const response = await fetch(apiurl);
      if (!response.ok) {
        throw new Error("Failed to fetch player statistics log");
      }
      const statsLog = await response.json();
      let itemRefs =
        statsLog.entries.flatMap(
          (item: { statistics: { statistics: { $ref: any } }[] }) =>
            item.statistics.slice(1).map((stat) => stat.statistics.$ref)
        ) || [];
      let statsPromises = itemRefs.map((ref: string | URL | Request) =>
        fetch(ref).then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch stats at ${ref}`);
          }
          return response.json();
        })
      );
      let statsResults = await Promise.all(statsPromises);
      let finalsResult: CareerStats[] = statsResults.map((stat) => ({
        yards: stat.splits.categories[1].stats[7].value || "0",
        completions: stat.splits.categories[1].stats[2].value || "0",
        displayName: "",
        touchdowns: stat.splits.categories[1].stats[17].value || "0",
        interceptions: stat.splits.categories[1].stats[5].value || "0",
        abreviation: "",
        color: "",
        year: stat.season.$ref.split("/").slice(-1)[0].split("?")[0] || "0",
        logo: "",
      }));
      itemRefs =
        statsLog.entries.flatMap(
          (item: { statistics: { team: { $ref: any } }[] }) =>
            item.statistics
              .slice(1)
              .map((stat) => stat?.team?.$ref.replace(/\/seasons\/\d{4}/, ""))
        ) || [];
      statsPromises = itemRefs.map((ref: string | URL | Request) =>
        fetch(ref).then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch stats at ${ref}`);
          }
          return response.json();
        })
      );
      statsResults = await Promise.all(statsPromises);
      for (let i = 0; i < statsResults.length; i++) {
        finalsResult[i].displayName = statsResults[i].displayName;
        finalsResult[i].abreviation = statsResults[i].abbreviation;
        finalsResult[i].color = statsResults[i].color;
        finalsResult[i].logo = statsResults[i].logos[1].href;
      }
      return finalsResult;
    } catch (err) {
      console.error("Error fetching career stats:", err);
      return [];
    }
  };

  const { data: careerStats } = useQuery<CareerStats[]>({
    queryKey: ["playerCareerStats"],
    queryFn: () =>
      fetchCareerStats(
        `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/${playerId}/statisticslog`
      ),
  });

  const { data: collegeCareerStats } = useQuery<CareerStats[]>({
    queryKey: ["collegeCareerStats"],
    queryFn: () =>
      fetchCareerStats(
        `https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/athletes/${playerId}/statisticslog?lang=en&region=us`
      ),
  });

  const mergedCareerStats = [
    ...(careerStats || []),
    ...(collegeCareerStats || []),
  ];

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
  const fetchPlayerPassingStats = async (): Promise<
    [PlayerPassingStats, { rank: number }[]]
  > => {
    const { data, error } = await supabase
      .from("Passing_Stats")
      .select("*")
      .eq("espnid", playerId)
      .single();
    if (error) {
      throw error;
    }
    let rankData: { rank: number }[] = [];
    const statColumns = [
      "ttt",
      "ypa",
      "p2s",
      "epaperplay",
      "cpoe",
      "tdintratio",
    ];

    for (const stat of statColumns) {
      const { data: rankResult, error: rankError } = await supabase.rpc(
        "getpassingstatrank",
        {
          stat_column: stat,
          espn_id: playerId,
          player_position: "QB",
        }
      );

      if (rankError) {
        console.error(`Error getting rank for ${stat}:`, rankError);
      } else {
        rankData.push(rankResult[0]);
      }
    }

    return [data, rankData];
  };
  const { data: playerPassingStats } = useQuery<
    [PlayerPassingStats, { rank: number }[]]
  >({
    queryKey: ["playerPassingStats"],
    queryFn: fetchPlayerPassingStats,
    refetchOnWindowFocus: false,
  });
  const fetchPlayerRushingStats = async (): Promise<
    [PlayerRushingStats, { rank: number }[]]
  > => {
    const { data, error } = await supabase
      .from("Rushing_Stat")
      .select("*")
      .eq("espnid", playerId)
      .single();
    if (error) {
      throw error;
    }
    let rankData: { rank: number }[] = [];
    const statColumns = [
      "yac",
      "broken_tackle",
      "fumble",
      "rush_epa",
      "explosive",
      "success",
      "attempts",
    ];

    for (const stat of statColumns) {
      const { data: rankResult, error: rankError } = await supabase.rpc(
        "getrushingstatrank",
        {
          stat_column: stat,
          espn_id: playerId,
          player_position: "QB",
        }
      );

      if (rankError) {
        console.error(`Error getting rank for ${stat}:`, rankError);
      } else {
        rankData.push(rankResult[0]);
      }
    }

    return [data, rankData];
  };
  const { data: playerRushingStats } = useQuery<
    [PlayerRushingStats, { rank: number }[]]
  >({
    queryKey: ["playerRusingStats"],
    queryFn: fetchPlayerRushingStats,
    refetchOnWindowFocus: false,
  });
  console.log("data", playerRushingStats);

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
    <div className="animate-fade-in-down bg-primary">
      <div className="" style={{ backgroundColor: `#${team?.color}` }}>
        <div className="px-32 flex justify-between overflow-hidden">
          <PlayerNameTitle
            name={player.name}
            number={player.number}
            position={fullPosition}
          />
          <div className="relative w-72 pt-5 self-end">
            <img
              src={`https://a.espncdn.com/i/headshots/nfl/players/full/${player.espnid}.png`}
              className="relative z-10"
              alt="Player headshot"
            />
            <img
              src={`https://a.espncdn.com/i/teamlogos/nfl/500-dark/${team.abbreviation}.png`}
              className="absolute inset-0 size-full object-cover opacity-50"
              alt="Team logo"
              onError={(e) => {
                e.currentTarget.src = `https://a.espncdn.com/i/teamlogos/nfl/500/${team.abbreviation}.png`;
              }}
            />
          </div>
        </div>
      </div>
      <div className="px-32 py-10 flex flex-col gap-10">
        <div>
          <InfoSubHeader text="Breakdown" />
          <div className="flex justify-between gap-10">
            <PlayerPageSmallCard
              title="Information"
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
          <InfoSubHeader text="Statistics" />
          <div className="flex justify-between gap-10">
            <StatsSection
              title="Passing"
              stats={playerPassingStats?.[0] || undefined}
              rankdata={playerPassingStats?.[1] || []}
              table={statsTable1}
              color={team.color}
            />
            <StatsSection
              title="Rushing"
              stats={playerRushingStats?.[0] || undefined}
              rankdata={playerRushingStats?.[1] || []}
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
              {mergedCareerStats && mergedCareerStats.length > 0 ? (
                mergedCareerStats.map((season, index) => (
                  <div key={index} className="">
                    <div
                      className="flex justify-between items-center mb-2 px-2 text-white rounded-sm "
                      style={{ backgroundColor: `#${season.color}` }}
                    >
                      <span className="text-xl font-medium">{season.year}</span>
                      <div className="flex items-center">
                        <span className="mr-1">{season.displayName} </span>
                        <img className="h-6" src={season.logo} />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 px-2">
                      <PlayerCareerTableStat
                        title="Passing Yards"
                        amount={season.yards}
                      />
                      <PlayerCareerTableStat
                        title="Completions"
                        amount={season.completions}
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
                ))
              ) : (
                <div className="text-center text-gray-500">No career stats</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
