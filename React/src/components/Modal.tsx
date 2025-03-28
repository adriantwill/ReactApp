import { VscChromeClose } from "react-icons/vsc";
import StatsTable from "./StatsTable";
import { useQuery } from "@tanstack/react-query";
import { PlayerInfo, TeamInfo } from "../pages/Teams";
import PlayerNameTitle from "./PlayerNameTitle";
import PlayerModalMediumCard from "./PlayerModalMediumCard";

interface MoadlProps {
  toggleModal: () => void;
  team: TeamInfo;
  player: PlayerInfo;
}

type GameLog = {
  categories: CategoriesLabels[];
  labels: string[];
  seasonTypes: SeasonTypes[];
  events: Record<string, EventDetail>;
};

type CategoriesLabels = {
  name: string;
  displayName: string;
  count: number;
};

type SeasonTypes = {
  categories: Categories[];
};

type Categories = {
  events: Events[];
};

type Events = {
  stats: string[];
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
  if (!props.player.debutYear) {
    props.player.debutYear = 2024;
  }
  if (!props.player.draft) {
    props.player.draft = {
      year: props.player.debutYear.toString(),
      selection: "UDFA",
    };
  }
  const {
    data: gameLog,
    isLoading,
    isError,
  } = useQuery<GameLog>({
    queryKey: ["gameLog"],
    queryFn: async () => {
      const response = await fetch(
        `https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/${props.player.id}/gamelog`
      );
      const data = await response.json();
      return data;
    },
  });
  const { data: college } = useQuery<string>({
    queryKey: ["college"],
    queryFn: async () => {
      const response = await fetch(props.player.college.$ref);
      const data = await response.json();
      return data.abbrev;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !gameLog) return <p>Error loading data</p>;

  return (
    <div className="flex items-center justify-center fixed inset-0 z-20">
      <div
        onClick={props.toggleModal}
        className="bg-black bg-opacity-30 w-screen h-screen absolute inset-0"
      />
      <div
        className="rounded-lg bg-white w-[150vh] h-[90%] drop-shadow-xl overflow-auto "
        style={{ backgroundColor: `#${props.team.color}` }}
      >
        <button
          className="absolute px-4 py-2 right-4 top-4 z-20"
          onClick={props.toggleModal}
        >
          <VscChromeClose className="text-white size-8" />
        </button>
        <div className="flex justify-between mx-32">
          <PlayerNameTitle
            name={props.player.displayName}
            number={props.player.jersey}
            position={props.player.position.name}
          />
          <div className="relative ">
            <div className=" w-60 bottom-0 right-0">
              <img
                src={`https://a.espncdn.com/i/teamlogos/nfl/500-dark/${props.team.abbreviation}.png`}
                className="absolute opacity-50 -z-10 -bottom-10"
              />
              <img src={props.player.headshot.href} />
            </div>
          </div>
        </div>

        <h2
          className="text-white text-3xl font-medium text-center mb-10 py-1"
          style={{ backgroundColor: `#${props.team.alternateColor}` }}
        >
          {props.team.displayName}
        </h2>

        <div className="flex justify-between mx-32 gap-10">
          <PlayerModalMediumCard
            items={[
              college || "",
              props.player.draft.year,
              props.player.draft.selection,
            ]}
            info={["College", "Draft Year", "Draft Selection"]}
            title={"Draft Profile"}
          />
          <PlayerModalMediumCard
            items={[
              String(props.player.weight),
              props.player.displayHeight,
              String(props.player.age),
            ]}
            info={["Weight", "Height", "Age"]}
            title={"Player Info"}
          />
        </div>

        <div className="my-10 mx-32  ">
          <StatsTable gameLog={gameLog} color={props.team.color} />
        </div>
      </div>
    </div>
  );
}

export default Modal;
