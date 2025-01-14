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
    <header className="flex justify-center bg-slate-200">
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
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="py-2 px-6 font-bold rounded-md tracking-wider border-4 border-transparent active:border-white duration-200 hover:text-white hover:bg-slate-300 active:text-black "
      >
        Teams
      </button>

      {isOpen && (
        <div className="absolute mt-12 z-20">
          <div
            className="rounded-md grid grid-flow-row grid-cols-4 bg-slate-100 p-2"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {nflTeams.map((item, i) => (
              <div
                onClick={() => {
                  navigate(`/teams/${item.id}`);
                  //   window.location.reload();
                }}
                className="py-4 px-2 mx-2 my-1 hover:bg-slate-300 cursor-pointer rounded-sm border-l-transparent hover:border-l-white text-center"
                key={i}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Dropdown;
