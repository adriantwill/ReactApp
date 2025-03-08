import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

type ApiResponse = {
  sports: Sport[];
};

type Sport = {
  id: string;
  uid: string;
  name: string;
  slug: string;
  leagues: League[];
};

type League = {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  shortName: string;
  slug: string;
  teams: Team[];
};

type Team = {
  team: TeamDetails;
};

type TeamDetails = {
  id: string;
  uid: string;
  slug: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  name: string;
  nickname: string;
  location: string;
  color: string;
  alternateColor: string;
  isActive: boolean;
  isAllStar: boolean;
  logos: {
    href: string;
  }[];
};

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const currentPath = window.location.pathname.split("/")[1];
  const [selected] = useState(currentPath);

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["teams"],
    queryFn: async () => {
      console.log("Fetching teams data...");
      const response = await fetch(
        "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
      );
      return await response.json();
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading teams</div>; //
  return (
    <header className="relative flex justify-center font-medium text-2xl tracking-wider gap-16 py-4 mb-1">
      <button
        className={
          selected === ""
            ? "relative after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-10/12 after:bg-blue-500 after:-translate-x-1/2"
            : "hover:relative hover:after:absolute hover:after:-bottom-2 hover:after:left-1/2 hover:after:h-0.5 hover:after:w-10/12 hover:after:bg-blue-500 hover:after:-translate-x-1/2 "
        }
        onClick={() => {
          navigate(`/`);
        }}
      >
        Home
      </button>
      <button
        className={
          selected === "rankings"
            ? "relative after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-10/12 after:bg-blue-500 after:-translate-x-1/2"
            : "hover:relative hover:after:absolute hover:after:-bottom-2 hover:after:left-1/2 hover:after:h-0.5 hover:after:w-10/12 hover:after:bg-blue-500 hover:after:-translate-x-1/2 "
        }
        onClick={() => {
          navigate(`/rankings`);
        }}
      >
        Rankings
      </button>
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        //  onClick={addAllTeams}
        onClick={() => {
          navigate(`/teams`);
        }}
        className={
          selected === "teams"
            ? "relative after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-10/12 after:bg-blue-500 after:-translate-x-1/2"
            : "hover:relative hover:after:absolute hover:after:-bottom-2 hover:after:left-1/2 hover:after:h-0.5 hover:after:w-10/12 hover:after:bg-blue-500 hover:after:-translate-x-1/2 "
        }
      >
        Teams
      </button>
      <button
        className={
          selected === "players"
            ? "relative after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-10/12 after:bg-blue-500 after:-translate-x-1/2"
            : ""
        }
        onClick={() => {
          navigate(`/players`);
        }}
      >
        Players
      </button>
      {/* {isOpen && (
        <div className="absolute mt-12 z-20">
          <div
            className="rounded-md bg-primary p-2 shadow-lg"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="grid grid-flow-row grid-cols-4">
              {data?.sports[0].leagues[0].teams.map((item, i) => (
                <div
                  onClick={() => {
                    navigate(`/teams/${item.team.id}`);
                    window.location.reload();
                  }}
                  className="py-4 px-2 mx-2 my-1 hover:bg-slate-300 cursor-pointer rounded-sm transition duration-300 ease-in-out transform hover:scale-105"
                  key={i}
                >
                  <div className="flex items-center justify-center text-xl">
                    {item.team.displayName}
                    <img src={item.team.logos[0].href} width={40} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
    </header>
  );
}

export default Dropdown;
