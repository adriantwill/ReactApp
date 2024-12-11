import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const nflTeams = [
    { id: 22, name: "Arizona Cardinals" },
    { id: 1, name: "Atlanta Falcons" },
    { id: 33, name: "Baltimore Ravens" },
    { id: 2, name: "Buffalo Bills" },
    { id: 29, name: "Carolina Panthers" },
    { id: 3, name: "Chicago Bears" },
    { id: 4, name: "Cincinnati Bengals" },
    { id: 5, name: "Cleveland Browns" },
    { id: 6, name: "Dallas Cowboys" },
    { id: 7, name: "Denver Broncos" },
    { id: 8, name: "Detroit Lions" },
    { id: 9, name: "Green Bay Packers" },
    { id: 34, name: "Houston Texans" },
    { id: 11, name: "Indianapolis Colts" },
    { id: 30, name: "Jacksonville Jaguars" },
    { id: 12, name: "Kansas City Chiefs" },
    { id: 13, name: "Las Vegas Raiders" },
    { id: 24, name: "Los Angeles Chargers" },
    { id: 14, name: "Los Angeles Rams" },
    { id: 15, name: "Miami Dolphins" },
    { id: 16, name: "Minnesota Vikings" },
    { id: 17, name: "New England Patriots" },
    { id: 18, name: "New Orleans Saints" },
    { id: 19, name: "New York Giants" },
    { id: 20, name: "New York Jets" },
    { id: 21, name: "Philadelphia Eagles" },
    { id: 23, name: "Pittsburgh Steelers" },
    { id: 25, name: "San Francisco 49ers" },
    { id: 26, name: "Seattle Seahawks" },
    { id: 27, name: "Tampa Bay Buccaneers" },
    { id: 10, name: "Tennessee Titans" },
    { id: 28, name: "Washington Commanders" },
  ];

  return (
    <div className="relative flex flex-col items-center w-[340px] rounded-lg z-10">
      <button
        onClick={() => setIsOpen((prev: any) => !prev)}
        className="p-2 w-44 font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-200 active:text-white hover:bg-slate-300"
      >
        NFL Teams
      </button>
      {isOpen && (
        <div className="bg-blue-400 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full max-h-96 overflow-y-scroll">
          {nflTeams.map((item, i) => (
            <div
              onClick={() => {
                navigate(`/teams/${item.id}`);
                //   window.location.reload();
              }}
              className="flex w-full p-4 justify-between hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
              key={i}
            >
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
