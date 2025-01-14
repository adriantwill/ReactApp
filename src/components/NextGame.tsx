import React from "react";

type NextEvent = {
  team1: string;
  team2: string;
  time: string;
};

function NextGame(props: NextEvent) {
  return (
    <div className="my-2 bg-slate-300 rounded-sm">
      <p className="text-center">Upcoming Game</p>
      <div className="h-2 bg-blue-800"></div>
      <div className="flex justify-around p-2 items-center">
        <div>
          <p className="text-center">Team 1</p>
          <p className="text-center">Team 1</p>
        </div>
        <p className="text-center">6:00</p>
        <div>
          <p className="text-center">Team 2</p>
          <p className="text-center">Team 2</p>
        </div>
      </div>
    </div>
  );
}

export default NextGame;
