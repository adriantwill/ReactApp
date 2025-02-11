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
    shortDetail: string;
  };
};

type Competitions = {
  competitors: Competitors[];
};

export type Competitors = {
  team: Team;
  score: string;
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
        limit: 10,
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
  const likes = data as FeedViewPostWithRecord[];
  return (
    <>
      <Dropdown />
      <div className="py-4 px-2 overflow-scroll">
        <p className="px-2 text-xl text-gray-500">NFL</p>
        <div className="flex">
          <Gamecard data={nflData ?? []} />
          <Gamecard data={nbaData ?? []} />
        </div>
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
    </>
  );
}

export default FrontPage;
