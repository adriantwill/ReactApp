function PlayerCareerTableStat(props: { title: string; amount: number }) {
  return (
    <div>
      <div className="text-sm uppercase text-gray-600">{props.title}</div>
      <div className="text-lg font-medium ">{props.amount}</div>
    </div>
  );
}
export default PlayerCareerTableStat;
