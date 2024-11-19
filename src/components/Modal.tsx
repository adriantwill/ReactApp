import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Goff from "./../assets/gettyimages-2175763367.png";
import Herbert from "./../assets/240922-Justin-Herbert-vl-442p-4e2e5f copy.png";

const playerImages: { [key: string]: string } = {
  "4038941": Herbert,
  "3046779": Goff,
};

type PlayerInfo = {
  id: string;
  lastName: string;
  jersey: string;
  displayName: string;
  position: Position;
  headshot: Headshot;
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
        <div className="absolute top-1/3 left-[70%] w-1/3 flex justify-center items-center ">
          {playerImages[props.player.id] ? (
            <img
              src={playerImages[props.player.id]}
              className="rounded-lg h-[36rem]"
            />
          ) : (
            <img src={props.player.headshot.href} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
