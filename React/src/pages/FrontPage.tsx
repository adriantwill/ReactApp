import Dropdown from "../components/Dropdown";
import { useQuery } from "@tanstack/react-query";
import { AtpAgent } from "@atproto/api";
import {
  FeedViewPost,
  PostView,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import Gamecard from "../components/Gamecard";
import BreakingCarosel from "../components/BreakingCarosel";
import DraftFrontPageCard from "../components/DraftFrontPageCard";

export interface FeedViewPostWithRecord extends FeedViewPost {
  post: PostView & {
    record: {
      text: string;
      createdAt: string;
    };
    embed: {
      images: {
        fullsize: string;
      }[];
    };
  };
}

export type Games = {
  status: Status;
  competitions: Competitions[];
};

export type Status = {
  displayClock: string;
  type: {
    id: string;
    shortDetail: string;
  };
};

type Competitions = {
  competitors: Competitors[];
};

export type Competitors = {
  team: Team;
  score: string;
  records: {
    summary: string;
  }[];
};

type Team = {
  color: string;
  abbreviation: string;
  logo: string;
};

export type Player = {
  displayName: string;
  weight: number;
  height: number;
  position: string;
  headshot: string;
  college: string;
  experience: { displayValue: string };
};

function FrontPage() {
  const agent = new AtpAgent({ service: "https://bsky.social" });
  const { data } = useQuery<FeedViewPost[]>({
    queryKey: ["likes"],
    queryFn: async () => {
      await agent.login({
        identifier: "bigdatapoint.bsky.social",
        password: import.meta.env.VITE_BLUESKY_PASSWORD,
      });
      const response = await agent.getActorLikes({
        actor: "did:plc:g7hm5kt7bfgdutda62pygdfk",
        limit: 14,
      });

      return response.data.feed;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const { data: nbaData } = useQuery<Games[]>({
    queryKey: ["nbaEvents"],
    queryFn: async () => {
      const response = await fetch(
        "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard"
      );
      const data = await response.json();
      return data.events;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const { data: nflData } = useQuery<Games[]>({
    queryKey: ["nflEvents"],
    queryFn: async () => {
      const response = await fetch(
        "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard"
      );
      const data = await response.json();
      return data.events;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const { data: nflDraftData } = useQuery<{ items: Array<{ $ref: string }> }>({
    queryKey: ["nflDraft"],
    queryFn: async () => {
      const response = await fetch(
        "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2025/draft/athletes?lang=en&region=us"
      );
      return response.json();
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { data: draftPlayers } = useQuery<
    {
      athlete: Player;
      college: { name: string; logo?: string };
    }[]
  >({
    queryKey: ["draftPlayersDetails", nflDraftData],
    queryFn: async () => {
      if (!nflDraftData?.items?.length) return [];

      const playerPromises = nflDraftData.items.map(async (item) => {
        const response = await fetch(item.$ref);
        const playerData = await response.json();

        try {
          const athleteResponse = await fetch(playerData.athlete.$ref);
          const athleteData = await athleteResponse.json();

          const collegeId = playerData.college.$ref.split("/").pop();
          const collegeResponse = await fetch(
            `https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${collegeId}`
          );
          const collegeData = await collegeResponse.json();

          return {
            athlete: {
              ...athleteData,
              position: athleteData.position.abbreviation,
              fullName: athleteData.fullName || athleteData.displayName,
              headshot: athleteData.headshot?.href || null,
            },
            college: collegeData
              ? {
                  name: collegeData.team.shortDisplayName,
                  logo: collegeData.team.logos?.[1]?.href || null,
                  color: collegeData.team.color,
                }
              : null,
          };
        } catch (error) {
          console.error("Error fetching player details:", error);
          return {
            athlete: playerData.athlete,
            college: playerData.college,
          };
        }
      });

      return Promise.all(playerPromises);
    },
    enabled: !!nflDraftData?.items?.length,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  let likes = data as FeedViewPostWithRecord[];
  likes = likes?.sort((a, b) => {
    const dateA = new Date(a.post.record.createdAt);
    const dateB = new Date(b.post.record.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
  return (
    <>
      <Dropdown />
      <div className="animate-fade-in-down bg-primary pb-12">
        <div className=" pl-2 overflow-auto flex py-8">
          <Gamecard data={nflData ?? []} league={"NFL"} />
          <Gamecard data={nbaData ?? []} league={"NCAA"} />
        </div>
        <div className="mb-12">
          <h2 className="text-2xl text-center font-semibold text-white uppercase bg-blue-700 p-1">
            Breaking
          </h2>
          <div className="flex group overflow-hidden bg-white p-6 shadow-surround">
            <BreakingCarosel likes={likes} />
            <BreakingCarosel likes={likes} />
          </div>
        </div>
        <div className="bg-white shadow-surround">
          <div className="text-center text-3xl font-bold p-4  ">Big Board</div>
          <div className="flex overflow-auto overflow-y-visible gap-12 px-5 pb-5">
            {draftPlayers?.slice(0, 10).map((player, index) => (
              <DraftFrontPageCard
                key={index}
                player={player.athlete}
                college={player.college}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FrontPage;
