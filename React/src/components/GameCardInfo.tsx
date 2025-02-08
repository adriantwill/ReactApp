function GameCardInfo(props: {
  border: string;
  teamColor: string;
  teamAbbrev: string;
  teamImage: string;
  teamScore: string;
  borderPos: string[];
}) {
  return (
    <div className="flex justify-between h-1/2 items-center">
      <div className={`flex overflow-hidden ${props.border}`}>
        <div
          className="border-solid"
          style={{
            borderColor: `#${props.teamColor}`,
            [props.borderPos[0]]: "transparent",
            [props.borderPos[1]]: "12px",
            [props.borderPos[2]]: "8px",
          }}
        ></div>
        <img src={props.teamImage} className="h-10 mx-1 my-3"></img>
        <div className="flex items-center font-medium text-xl">
          {props.teamAbbrev}
        </div>
      </div>
      <div className="text-xl font-semibold px-2">{props.teamScore}</div>
    </div>
  );
}
export default GameCardInfo;
