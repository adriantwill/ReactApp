import {
  FeedViewPost,
  PostView,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export interface TeamDetails {
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
}

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

export interface Games {
  status: Status[];
}
export interface Competitors {
  team: TeamInfo;
  score: string;
  records: {
    summary: string;
  }[];
}

export interface CollegePlayer {
  displayName: string;
  weight: number;
  height: number;
  position: string;
  headshot: string;
  college: string;
  experience: { displayValue: string };
}

export interface CareerStats {
  yards: number;
  displayName: string;
  touchdowns: number;
  completions: number;
  interceptions: number;
  abreviation: string;
  color: string;
  year: string;
  logo: string;
}

export interface NextEvent {
  competitions: {
    competitors: { team: { nickname: string; logos: Logos[] } }[];
    status: Status;
  }[];
  week: {
    text: string;
  };
}

export interface Status {
  displayClock: string;
  competitions: {
    competitors: Competitors[];
  };

  type: { shortDetail: string; description: string; id: string };
}

export interface TeamInfo {
  color: string;
  alternateColor: string;
  abbreviation: string;
  displayName: string;
  logo: string;
  nextEvent: NextEvent[];
  record: { items: { summary: string; stats: { value: number }[] }[] };
  standingSummary: string;
}

export interface CategoriesLabels {
  name: string;
  displayName: string;
  count: number;
}

export interface GameLog {
  categories: CategoriesLabels[];
  labels: string[];
  seasonTypes: {
    categories: { events: { stats: string[]; eventId: string }[] }[];
  }[];
  events: Record<
    string,
    {
      id: string;
      week: number;
      eventNote: string;
      atVs: string;
      homeTeamScore: string;
      awayTeamScore: string;
      gameResult: string;
      gameDate: string;
      opponent: { id: string; abbreviation: string };
    }
  >;
}

export interface Logos {
  $ref: string;
  href: string;
}

export interface AllPositions {
  [key: string]: Positions;
  wr: Positions;
  lt: Positions;
  lg: Positions;
  c: Positions;
  rg: Positions;
  rt: Positions;
  qb: Positions;
  rb: Positions;
  te: Positions;
}

export interface Positions {
  athletes: Athlete[];
}

export interface Athlete {
  rank: number;
  athlete: Logos;
}

export interface PlayerInfo {
  id: string;
  lastName: string;
  jersey: string;
  displayName: string;
  weight: number;
  displayHeight: string;
  age: number;
  debutYear: number;
  college: Logos;
  position: {
    abbreviation: string;
    name: string;
  };
  headshot: Logos;
  draft: {
    year: string;
    selection: string;
  };
  team: {
    $ref: string;
  };
}

export interface Statistics {
  statistics: {
    labels: string[];
    splits: { stats: string[] }[];
  };
}

export interface Card {
  id: number;
  data: {
    statistics: Statistics;
  };
  player: PlayerInfo;
  team: {
    displayName: string;
    logos: { href: string }[];
    color: string;
  };
}

export interface Leader {
  athlete: {
    $ref: string;
  };
  team: {
    $ref: string;
  };
}
