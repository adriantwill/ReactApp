import GameCardInfo from "./GameCardInfo";
import { Competitors, Status } from "../pages/FrontPage";

function Gamecard(props: { event: Competitors[]; status: Status }) {
  return (
    <div className="shadow-[0_0_8px_0_rgba(0,0,0,0.2)] rounded-xl my-2 mx-4 relative w-52 flex-shrink-0">
      <GameCardInfo
        border={"rounded-tl-xl"}
        teamColor={props.event[1].team.color}
        teamAbbrev={props.event[1].team.abbreviation}
        teamImage={props.event[1].team.logo}
        teamScore={props.event[1].score}
        borderPos={[
          "borderBottomColor",
          "borderLeftWidth",
          "borderBottomWidth",
        ]}
      />
      <div className="absolute top-1/2 right-2 -translate-y-1/2 text-sm">
        {props.status.displayClock}
      </div>
      <GameCardInfo
        border={"rounded-bl-xl"}
        teamColor={props.event[0].team.color}
        teamAbbrev={props.event[0].team.abbreviation}
        teamImage={props.event[0].team.logo}
        teamScore={props.event[0].score}
        borderPos={["borderTopColor", "borderRightWidth", "borderTopWidth"]}
      />
    </div>
  );
}
export default Gamecard;
