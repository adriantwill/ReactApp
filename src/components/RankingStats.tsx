import React from "react";

function RankingStats() {
  return (
    <div className="rounded-lg bg-white border border-solid border-black m-5 mt-0">
      <div className="text-center font-semibold p-1">2024 Stats</div>
      <div className="bg-black h-[1px]"></div>
      <div className="grid grid-cols-3 gap-12 font-semibold opacity-60 py-1 px-8">
        <p className="text-center">Wins</p>
        <p className="text-center">Wins</p>
        <p className="text-center">Wins</p>
      </div>
      <div className="grid grid-cols-3 gap-12 font-semibold px-8">
        <p className="text-center">test</p>
        <p className="text-center">test</p>
        <p className="text-center">test</p>
      </div>
    </div>
  );
}

export default RankingStats;
