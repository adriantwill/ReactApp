import { Player } from "../pages/FrontPage";

function DraftFrontPageCard(props: {
  player: Player & {
    fullName: string;
    headshot?: string;
    college?: { name: string; logo?: string; color: string };
  };
  college: { name: string; logo?: string; color: string };
}) {
  console.log(props.college.color);
  return (
    <div className="w-[30rem] mx-auto bg-white rounded-md shadow-surround overflow-hidden flex-shrink-0">
      <div
        className="text-white text-2xl flex items-center py-2 px-6"
        style={{ backgroundColor: `#${props.college.color}` }}
      >
        <div className=" font-semibold mr-3">{props.player.displayName}</div>
        <img src={props.college.logo} className="mr-auto size-12" />
        <div className="">{props.player.position}</div>
      </div>

      <div className="flex">
        <div className="m-6 flex-1">
          <div className="text-xl mb-2">
            <span className="font-bold">School: </span> {props.college.name}
          </div>
          <div className="text-xl mb-2">
            <span className="font-bold">Weight: </span> {props.player.weight}
          </div>
          <div className="text-xl mb-2">
            <span className="font-bold">Height: </span> {props.player.height}
          </div>
          <div className="text-xl">
            <span className="font-bold">Class:</span>{" "}
            {props.player.experience.displayValue}
          </div>
        </div>

        <img
          src={props.player.headshot}
          className="object-cover size-36 border-2 rounded-full mt-auto mb-3 mr-3"
        />
      </div>
    </div>
  );
}
export default DraftFrontPageCard;
