import { CollegePlayer } from "../lib/types";

function DraftFrontPageCard(props: {
  player: CollegePlayer;
  college: { name: string; logo?: string; color: string };
}) {
  console.log(props.college.color);
  return (
    <div className="w-[30rem] mx-auto bg-white rounded-md border overflow-hidden flex-shrink-0">
      <div
        className="text-white text-2xl flex items-center py-2 px-4"
        style={{ backgroundColor: `#${props.college.color}` }}
      >
        <div className=" font-semibold mr-3">{props.player.displayName}</div>
        <img src={props.college.logo} className="mr-auto size-12" />
        <div className="">{props.player.position}</div>
      </div>

      <div className="flex justify-between p-4">
        <div className=" flex flex-col justify-between">
          <div className="text-xl ">
            <span className="font-bold">School: </span> {props.college.name}
          </div>
          <div className="text-xl ">
            <span className="font-bold">Weight: </span> {props.player.weight}
          </div>
          <div className="text-xl ">
            <span className="font-bold">Height: </span> {props.player.height}
          </div>
          <div className="text-xl">
            <span className="font-bold">Class:</span>{" "}
            {props.player.experience.displayValue}
          </div>
        </div>

        <img
          src={props.player.headshot}
          className="object-cover size-36 border-2 rounded-full "
        />
      </div>
    </div>
  );
}
export default DraftFrontPageCard;
