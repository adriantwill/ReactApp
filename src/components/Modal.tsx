import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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

function Modal(props: MoadlProps) {
  const teamUrl = props.player.college.$ref;
  console.log(teamUrl);
  const [college, setCollege] = useState("");
  if (!props.player.draft) {
    props.player.draft = {
      year: props.player.debutYear.toString(),
      selection: "UDFA",
    };
  }
  const fetchTeamUrl = async () => {
    try {
      const response = await fetch(teamUrl);
      const result = await response.json();
      setCollege(result.abbrev);
    } catch (error) {
      console.error("Error fetching initial URL:", error);
    }
  };
  fetchTeamUrl();
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
        <div className="flex justify-start">
          <div className="w-1/3">
            <div className="rounded-t-xl mx-4 pb-4 pt-2 -my-2 bg-[rgba(255,255,255,0.5)] font-medium">
              <p className="text-center text-3xl text-white">Draft Profile</p>
            </div>
            <div className="rounded-xl bg-gray-200 mx-4 p-4 pt-2">
              <div className="grid grid-cols-3 p-2 font-semibold opacity-60 text-3xl">
                <p className="text-center">College</p>
                <p className="text-center">Year</p>
                <p className="text-center">Pick</p>
              </div>
              <div className="grid grid-cols-3 p-2 font-semibold text-4xl">
                <p className="text-center">{college}</p>
                <p className="text-center">{props.player.draft.year}</p>
                <p className="text-center">{props.player.draft.selection}</p>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="rounded-t-xl mx-4 pb-4 pt-2 -my-2 bg-[rgba(255,255,255,0.5)] font-medium">
              <p className="text-center text-3xl text-white">Player Profile</p>
            </div>
            <div className="rounded-xl bg-gray-200 mx-4 p-4 pt-2">
              <div className="grid grid-cols-3 p-2 font-semibold opacity-60 text-3xl">
                <p className="text-center">Weight</p>
                <p className="text-center">Height</p>
                <p className="text-center">Age</p>
              </div>
              <div className="grid grid-cols-3 p-2 font-semibold text-4xl">
                <p className="text-center">{props.player.weight}</p>
                <p className="text-center">{props.player.displayHeight}</p>
                <p className="text-center">{props.player.age}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="rounded-xl bg-gray-200 mx-4 p-4 pt-2 w-1/2"></div>
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
