import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import teams from "../assets/Teams.json";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="py-2 px-6 font-bold rounded-md tracking-wider border-4 border-transparent active:border-white duration-200 hover:text-white hover:bg-slate-300 active:text-black "
      >
        Teams
      </button>

      {isOpen && (
        <div className="absolute mt-12 z-20">
          <div
            className="rounded-md grid grid-flow-row grid-cols-4 bg-primary p-2"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {teams.teams.map((item, i) => (
              <div
                onClick={() => {
                  navigate(`/teams/${item.team.id}`);
                  window.location.reload();
                }}
                className="py-4 px-2 mx-2 my-1 hover:bg-slate-300 cursor-pointer rounded-sm border-l-transparent hover:border-l-white text-center"
                key={i}
              >
                {item.team.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Dropdown;
