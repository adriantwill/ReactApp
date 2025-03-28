import { useNavigate } from "react-router";
import { Database } from "../lib/database.types";

type Team = Database["public"]["Tables"]["Team"]["Row"];

function TeamCard(props: { team: Team }) {
  const navigate = useNavigate();
  return (
    <div
      className="h-40 w-[38rem] rounded-md shadow-surround group cursor-pointer"
      style={{ backgroundColor: `#${props.team.color}` }}
      onClick={() => navigate(`/teams/${props.team.espnid}`)}
    >
      <div className="flex overflow-hidden pl-5">
        <img
          src={`https://a.espncdn.com/i/teamlogos/nfl/500-dark/${props.team.abbreviation}.png`}
          className="h-40 group-hover:scale-110 transform transition-transform duration-500 ease-in-out "
        />
        <div className="justify-center mx-auto flex flex-col text-white">
          <div
            style={
              {
                "--hover-color": `#${props.team.secondary_color}`,
              } as React.CSSProperties
            }
            className="text-3xl font-bold relative group-hover:text-[--hover-color] transition-colors duration-500 ease-in-out"
          >
            {props.team.name}
          </div>
          <div className="h-[2px] my-3 relative mx-auto w-1/5">
            <div className="absolute inset-0 bg-white w-full"></div>
            <div
              style={{ backgroundColor: `#${props.team.secondary_color}` }}
              className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 ease-in-out"
            ></div>
          </div>
          <div
            style={
              {
                "--hover-color": `#${props.team.secondary_color}`,
              } as React.CSSProperties
            }
            className="group-hover:text-[--hover-color] text-2xl font-medium text-center transition-colors duration-500 ease-in-out"
          >
            {props.team.division}
          </div>
        </div>
      </div>
    </div>
  );
}
export default TeamCard;
