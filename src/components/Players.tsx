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
};

function Card(props: PlayerProp) {
  return (
    <div
      className={`border-black border drop-shadow-xl text-center w-24 h-44 inline bg-[#${props.team.color}] relative m-4 p-1.5 rounded-xl border-solid hover:cursor-pointer hover:scale-110 transition duration-500 ease-in-out mt-20 ${props.tailwind}`}
      onClick={props.handleClick}
    >
      <img
        className={`drop-shadow-xl bg-[#${props.team.alternateColor}] rounded-xl border-[0.5px] border-solid border-black`}
        src={props.data.headshot.href}
      ></img>
      <div className="font-normal text-lg text-white mb-1.5">
        {props.data.lastName}
      </div>
      <div className="text-3xl font-medium text-white mb-2.5">
        {props.data.jersey}
      </div>
      <div className="text-white text-lg font-normal">
        {props.data.position.abbreviation}
      </div>
    </div>
  );
}

export default Card;
