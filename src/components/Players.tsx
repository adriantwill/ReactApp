type PlayerInfo = {
  lastName: string;
  jersey: string;
  position: Position;
  headshot: Headshot;
};

type Headshot = {
  href: string;
};

type Position = {
  abbreviation: string;
};

type TeamInfo = {
  color: string;
  alternateColor: string;
};

type PlayerProp = {
  tailwind?: string;
  data: PlayerInfo;
  team: TeamInfo;
  handleClick: () => void;
  setCurrentPlayer: () => void;
};

function Card(props: PlayerProp) {
  return (
    <div
      style={{ backgroundColor: `#${props.team.color}` }}
      className={`drop-shadow-xl text-center min-w-24 max-w-24 h-44 relative m-4 p-2 rounded-xl hover:cursor-pointer hover:scale-110 transition duration-500 ease-in-out mt-20 ${props.tailwind}`}
      onClick={() => {
        props.handleClick();
        props.setCurrentPlayer();
      }}
    >
      <img
        style={{ backgroundColor: `#${props.team.alternateColor}` }}
        className={`drop-shadow-xl rounded-xl border-[0.5px] border-solid border-black`}
        src={props.data.headshot.href}
      ></img>
      <div className="font-normal text-white my-1 overflow-hidden whitespace-nowrap">
        {props.data.lastName}
      </div>
      <div className="text-3xl font-medium text-white mb-2">
        {props.data.jersey}
      </div>
      <div className="text-white text-lg font-normal">
        {props.data.position.abbreviation}
      </div>
    </div>
  );
}

export default Card;
