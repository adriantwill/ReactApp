import React from "react";
import headshot from "./../assets/i.png";
import logo from "./../assets/min.png";
import RankingStats from "../components/RankingStats";

type Props = {};

function Rankings(teamInfo: Props) {
  return (
    <div>
      <div className="m-6 bg-primary rounded-sm shadow-lg w-[55rem]">
        <div className="flex justify-between p-2 px-4 items-center">
          <div className="text-2xl font-medium ">#1</div>
          <h3 className="text-3xl font-bold ">Justin Jefferson</h3>
          <div className="text-2xl font-medium ">WR</div>
        </div>
        <div style={{ backgroundColor: `#4F2683` }} className="h-1"></div>
        <p className="text-center text-2xl font-medium m-2">Vikings</p>
        <div className="flex justify-between">
          <RankingStats></RankingStats>
          <RankingStats></RankingStats>
          <div className="relative w-48 bottom-0 right-0 overflow-hidden">
            <img src={logo} className="absolute opacity-50 -bottom-10" />
            <img src={headshot} className="relative z-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rankings;
