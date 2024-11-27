import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import InfoBox from "./InfoBox";

type PlayerInfo = {
  id: string;
  lastName: string;
  jersey: string;
  displayName: string;
  weight: number;
  displayHeight: string;
  age: number;
  debutYear: number;
  college: college;
  position: Position;
  headshot: Headshot;
  draft: Draft;
};

type college = {
  $ref: string;
};

type Headshot = {
  href: string;
};

type Position = {
  name: string;
};

type Logos = {
  href: string;
};

type Draft = {
  year: string;
  selection: string;
};

type TeamInfo = {
  color: string;
  alternateColor: string;
  logos: [Logos];
};

interface MoadlProps {
  toggleModal: () => void;
  team: TeamInfo;
  player: PlayerInfo;
}

type GameLog = {
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
  events: [Game];
};

type Game = {
  week: number;
  opponent: string;
  stats: [string];
};

function Modal(props: MoadlProps) {
  const teamUrl = props.player.college.$ref;
  const gameLogUrl = `https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/${props.player.id}/gamelog`;
  const [college, setCollege] = useState("");
  const [gameLog, setGameLog] = useState<GameLog | null>(null);
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
    // const sortedGameLog = gameLog ? [...gameLog].sort((a, b) => a.week - b.week) : [];
  }

  return (
    <div className="flex items-center justify-center fixed inset-0 z-20">
      <div
        onClick={props.toggleModal}
        className="bg-black bg-opacity-30 w-screen h-screen absolute inset-0"
      ></div>
      <div
        className="relative rounded-lg bg-white w-10/12 h-[90%] drop-shadow-xl overflow-hidden"
        style={{ backgroundColor: `#${props.team.color}` }}
      >
        <h1 className="text-white text-6xl font-bold text-center m-5">
          {" "}
          {props.player.displayName}{" "}
        </h1>
        <div
          className="h-14 rounded-md my-5"
          style={{ backgroundColor: `#${props.team.alternateColor}` }}
        >
          <div className="flex items-center justify-center h-full">
            <h2 className="text-white text-3xl font-bold text-center">
              {props.player.position.name + " - #" + props.player.jersey}
            </h2>
          </div>
        </div>
        <button
          className="absolute px-4 py-2 right-4 top-4"
          onClick={props.toggleModal}
        >
          <FontAwesomeIcon icon={faX} style={{ color: "white" }} />
        </button>
        <div className="flex justify-center">
          <InfoBox
            item1={college}
            item2={props.player.draft.year}
            item3={props.player.draft.selection}
          />
          <InfoBox
            item1={String(props.player.weight)}
            item2={props.player.displayHeight}
            item3={String(props.player.age)}
          />
        </div>
        <div className="flex justify-start">
          <div className="rounded-xl bg-gray-200 mx-4 p-4 w-2/3">
            <div className="overflow-auto max-h-64">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Wk</th>
                    <th className="px-4 py-2">OPP</th>
                    {gameLog?.labels && (
                      <>
                        <th className="px-4 py-2">{gameLog.labels[0]}</th>
                        <th className="px-4 py-2">{gameLog.labels[1]}</th>
                        <th className="px-4 py-2">{gameLog.labels[2]}</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 19 }).map((_, index) => (
                    <tr key={index}>
                      <td className="border text-center">{`Week ${index}`}</td>
                      <td className="border  text-center">-</td>
                      {gameLog?.labels && (
                        <>
                          <td className="border  text-center">-</td>
                          <td className="border  text-center">-</td>
                          <td className="border  text-center">-</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 flex justify-center items-center ">
          <img
            src={props.team.logos[0].href}
            className="absolute opacity-50 -z-10 -bottom-20"
          />
          <img src={props.player.headshot.href} className="" />
        </div>
      </div>
    </div>
  );
}

export default Modal;
