import React from "react";

type Props = {
  values: string[];
  type: string;
};

function RankingStats(props: Props) {
  return (
    <div className="rounded-lg bg-white border border-solid border-black m-6 mt-0 self-start">
      <div className="text-center font-semibold text-lg">
        {props.type} Stats
      </div>
      <div className="bg-black h-[1px]"></div>
      <div className="flex justify-between items-center font-semibold opacity-60 px-10 py-1">
        <div className="flex flex-col items-center">
          <p className="text-center">YDS</p>
          <p className="text-center text-lg">{props.values[2]}</p>
        </div>
        <div className="flex flex-col items-center px-8">
          <p className="text-center">RECS</p>
          <p className="text-center text-lg">{props.values[0]}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center">TDS</p>
          <p className="text-center text-lg">{props.values[4]}</p>
        </div>
      </div>
    </div>
  );
}

export default RankingStats;
