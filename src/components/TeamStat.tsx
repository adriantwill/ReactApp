type Props = {
  item: Item;
  color: string;
};

type Item = {
  summary: string;
  stats: Stats[];
};

type Stats = {
  value: number;
};

function TeamStat(props: Props) {
  return (
    <div className="my-6 bg-primary rounded-md shadow-lg">
      <h3 className="text-center text-3xl font-medium m-2">Team Stats</h3>
      <div
        style={{ backgroundColor: `#${props.color}` }}
        className="h-2 rounded-sm"
      ></div>
      <div className="grid grid-cols-3 gap-0 p-4 items-center">
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">Overall Record</p>
          <p className="text-center text-lg">{props.item.summary}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">Avg Pts Against</p>
          <p className="text-center text-lg">{props.item.stats[2].value}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center text-2xl">Avg Pts For</p>
          <p className="text-center text-lg">{props.item.stats[3].value}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamStat;
