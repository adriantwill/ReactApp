import { TeamInfo } from "../lib/types";

function Title(props: { teamName: TeamInfo }) {
  return (
    <div
      className="flex items-center gap-14 pl-10 h-56"
      style={{ backgroundColor: `#${props.teamName.color}` }}
    >
      <img
        src={`https://a.espncdn.com/i/teamlogos/nfl/500-dark/${props.teamName.abbreviation}.png`}
        alt="Team logo"
        className="h-5/6"
        onError={(e) => {
          e.currentTarget.src = `https://a.espncdn.com/i/teamlogos/nfl/500/${props.teamName.abbreviation}.png`;
        }}
      />
      <div
        className="h-full w-7 -skew-x-12"
        style={{ backgroundColor: `#${props.teamName.alternateColor}` }}
      ></div>
      <div className="flex flex-col gap-3">
        <h1 className="text-6xl font-bold text-white">
          {props.teamName.displayName}
        </h1>
        <div className="flex gap-3">
          <h2 className="text-2xl text-gray-200">
            {props.teamName.record.items[0].summary}
          </h2>
          <span className=" text-2xl text-gray-200">|</span>
          <h2 className="text-2xl text-gray-200">
            {props.teamName.standingSummary}
          </h2>
        </div>
      </div>
    </div>
  );
}
export default Title;
