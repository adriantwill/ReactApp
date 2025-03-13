import Dropdown from "../components/Dropdown";
import { useQuery } from "@tanstack/react-query";
import { AtpAgent } from "@atproto/api";
import {
  FeedViewPost,
  PostView,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import Gamecard from "../components/Gamecard";
import BreakingCarosel from "../components/BreakingCarosel";

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
        "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
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
  let likes = data as FeedViewPostWithRecord[];
  likes = likes?.sort((a, b) => {
    const dateA = new Date(a.post.record.createdAt);
    const dateB = new Date(b.post.record.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
  return (
    <div className="animate-fade-in-down">
      <Dropdown />
      <div className="pb-3 pl-2 overflow-auto flex pt-9">
        <Gamecard data={nflData ?? []} league={"NFL"} />
        <Gamecard data={nbaData ?? []} league={"NBA"} />
      </div>
      <div>
        <h2 className="text-2xl text-center font-semibold text-white uppercase bg-[#3C3C3C] p-1">
          Breaking
        </h2>
        <div className="flex group overflow-hidden bg-primary p-6 shadow-lg">
          <BreakingCarosel likes={likes} />
          <BreakingCarosel likes={likes} />
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
