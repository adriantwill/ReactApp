type Props = {
  values: string[];
  type: string;
};

function RankingStats(props: Props) {
  return (
    <div className="rounded-lg bg-white border border-solid border-black mx-4 mt-0 mb-1 self-start">
      <div className="text-center font-semibold">
        {props.type} Stats
      </div>
      <div className="bg-black h-[1px]"></div>
      <div className="flex justify-between items-center font-medium px-10 py-1">
        <div className="flex flex-col items-center">
          <div className="text-center">YDS</div>
          <div className="text-center">{props.values[2]}</div>
        </div>
        <div className="flex flex-col items-center px-10">
          <div className="text-center">RECS</div>
          <div className="text-center">{props.values[0]}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-center">TDS</div>
          <div className="text-center">{props.values[4]}</div>
        </div>
      </div>
    </div>
  );
}

export default RankingStats;
