type TeamInfo = {
  color: string;
  alternateColor: string;
  logos: [Logos];
  displayName: string;
};

type Logos = {
  href: string;
};

type PlayerProp = {
  teamName: TeamInfo;
};

function Title(props: PlayerProp) {
  return (
    <div
      style={{ backgroundColor: `#${props.teamName.color}` }}
      className={`relative p-16 mt-8 overflow-hidden flex justify-center items-center`}
    >
      <h1 className=" text-white font-bold text-7xl z-10">
        {props.teamName.displayName}
      </h1>
      <img
        src={props.teamName.logos[0].href}
        className="absolute w-[500px] opacity-50"
      />
    </div>
  );
}
export default Title;
