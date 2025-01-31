import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["teams"],
    queryFn: async () => {
      console.log("Fetching teams data...");
      const response = await axios.get(
        "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading teams</div>;
  return (
    <header className="flex justify-center bg-primary">
      <div className="py-2 px-6 font-bold rounded-md tracking-wider border-4 border-transparent absolute left-0 cursor-pointer">
        Adrian
      </div>
      <button
        className="py-2 px-6 font-bold rounded-md tracking-wider border-4 border-transparent active:border-white duration-200 hover:text-white hover:bg-slate-300 active:text-black "
        onClick={() => {
          navigate(`/`);
        }}
      >
        Home
      </button>
      <button
        className="py-2 px-6 font-bold rounded-md tracking-wider border-4 border-transparent active:border-white duration-200 hover:text-white hover:bg-slate-300 active:text-black "
        onClick={() => {
          navigate(`/rankings`);
        }}
      >
        Rankings
      </button>
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="py-2 px-6 font-bold rounded-md tracking-wider border-4 border-transparent active:border-white duration-200 hover:text-white hover:bg-slate-300 active:text-black "
      >
        Teams
      </button>

      {isOpen && (
        <div className="absolute mt-12 z-20">
          <div
            className="rounded-md grid grid-flow-row grid-cols-4 bg-slate-50 p-2 shadow-sm"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
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
      )}
    </header>
  );
}

export default Dropdown;
