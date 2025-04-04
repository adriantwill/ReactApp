import { VscChromeClose } from "react-icons/vsc";
import StatsTable from "./StatsTable";
import { useQuery } from "@tanstack/react-query";
import PlayerNameTitle from "./PlayerNameTitle";
import PlayerModalMediumCard from "./PlayerModalMediumCard";

import { TeamInfo, PlayerInfo, GameLog } from "../lib/types";

function Modal(props: {
  toggleModal: () => void;
  team: TeamInfo;
  player: PlayerInfo;
}) {
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
    <div className="flex items-center justify-center fixed inset-0 z-20 animate-fade-in ">
      <div
        onClick={props.toggleModal}
        className="bg-black bg-opacity-30 w-screen h-screen absolute inset-0 "
      />
      <div
        className="rounded-lg bg-white w-[150vh] h-[90%] drop-shadow-xl overflow-auto animate-scale-in"
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

          <div className="relative w-60 bottom-0 right-0">
            <img
              src={`https://a.espncdn.com/i/teamlogos/nfl/500-dark/${props.team.abbreviation}.png`}
              className="absolute opacity-50 -z-10 -bottom-10"
              onError={(e) => {
                e.currentTarget.src = `https://a.espncdn.com/i/teamlogos/nfl/500/${props.team.abbreviation}.png`;
              }}
            />
            <img src={props.player.headshot.href} />
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
            title={"Information"}
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
