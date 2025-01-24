import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import InfoBox from "./InfoBox";
import StatsTable from "./StatsTable";

type PlayerInfo = {
  id: string;
  lastName: string;
  jersey: string;
  displayName: string;
  weight: number;
  displayHeight: string;
  age: number;
  debutYear: number;
  college: Headshot;
  position: Position;
  headshot: Headshot;
  draft: Draft;
};

type Headshot = {
  href: string;
  $ref: string;
};

type Position = {
  name: string;
  abbreviation: string;
};

type Draft = {
  year: string;
  selection: string;
};

type TeamInfo = {
  color: string;
  alternateColor: string;
  logos: [Headshot];
  displayName: string;
};

interface MoadlProps {
  toggleModal: () => void;
  team: TeamInfo;
  player: PlayerInfo;
}

type GameLog = {
  categories: [CategoriesLabels];
  labels: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  seasonTypes: [SeasonTypes];
  events: Record<string, EventDetail>;
};

type CategoriesLabels = {
  name: string;
  displayName: string;
  count: number;
};

type SeasonTypes = {
  categories: [Categories];
};

type Categories = {
  events: [Events];
};

type Events = {
  stats: [string, string, string, string, string, string, string, string];
  eventId: string;
};

type EventDetail = {
  id: string;
  week: number;
  atVs: string;
  homeTeamScore: string;
  awayTeamScore: string;
  gameResult: string;
  gameDate: string;
  opponent: Opponent;
};

type Opponent = {
  id: string;
  abbreviation: string;
};

function Modal(props: MoadlProps) {
  const teamUrl = props.player.college.$ref;
  const gameLogUrl = `https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/${props.player.id}/gamelog`;
  const [college, setCollege] = useState("");
  const [gameLog, setGameLog] = useState<GameLog | null>(null);
  if (!props.player.debutYear) {
    props.player.debutYear = 2024;
  }
  if (!props.player.draft) {
    props.player.draft = {
      year: props.player.debutYear.toString(),
      selection: "UDFA",
    };
  }
  if (!college && !gameLog) {
    const fetchTeamUrl = async () => {
      try {
        const response = await fetch(teamUrl);
        const result = await response.json();
        setCollege(result.abbrev);
        const responseLog = await fetch(gameLogUrl);
        const resultLog = await responseLog.json();
        setGameLog(resultLog);
      } catch (error) {
        console.error("Error fetching initial URL:", error);
      }
    };
    fetchTeamUrl();
  }

  return gameLog ? (
    <div className="flex items-center justify-center fixed inset-0 z-20">
      <div
        onClick={props.toggleModal}
        className="bg-black bg-opacity-30 w-screen h-screen absolute inset-0"
      />
      <div
        className="rounded-lg bg-white w-[150vh] h-[90%] drop-shadow-xl overflow-auto"
        style={{ backgroundColor: `#${props.team.color}` }}
      >
        <button
          className="absolute px-4 py-2 right-4 top-4 z-20"
          onClick={props.toggleModal}
        >
          <FontAwesomeIcon icon={faX} style={{ color: "white" }} />
        </button>
        <div className="w-[70rem] mx-auto">
          <h1 className="text-white text-6xl font-bold mt-8 mb-4">
            {props.player.displayName}
          </h1>
          <h2 className="text-white text-3xl font-bold">
            {props.player.position.name + " | #" + props.player.jersey}
          </h2>
        </div>
        <div
          className="h-10 rounded-lg my-8"
          style={{ backgroundColor: `#${props.team.alternateColor}` }}
        >
          <div className="relative w-[70rem] mx-auto">
            <div className="absolute w-60 bottom-0 right-0">
              <img
                src={props.team.logos[0].href}
                className="absolute opacity-50 -z-10 -bottom-10"
              />
              <img src={props.player.headshot.href} />
            </div>
          </div>
          <div className="flex items-center justify-center h-full">
            <h2 className="text-white text-3xl font-medium text-center">
              {props.team.displayName}
            </h2>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-[70rem]">
            <div className="flex justify-between">
              <InfoBox
                item1={college}
                item2={props.player.draft.year}
                item3={props.player.draft.selection}
                style={"mr-4"}
              />
              <InfoBox
                item1={String(props.player.weight)}
                item2={props.player.displayHeight}
                item3={String(props.player.age)}
                style={"ml-4"}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <StatsTable gameLog={gameLog} />
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-black bg-opacity-30 w-screen h-screen flex items-center justify-center fixed inset-0 z-20">
      <div className="text-white text-4xl">Loading...</div>
    </div>
  );
}

export default Modal;
