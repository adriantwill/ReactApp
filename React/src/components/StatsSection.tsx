type StatsSectionProps = {
  title: string;
  stats: StatItemProps[];
};
type StatItemProps = {
  label: string;
  value: number;
};

function StatsSection(props: StatsSectionProps) {
  return (
    <div className="shadow-[0_0_8px_0_rgba(0,0,0,0.2)] rounded-lg p-6 bg-white h-70 overflow-auto">
      <h2 className="text-2xl font-bold mb-2{">{props.title}</h2>
      <div className=" overflow-auto">
        {props.stats.map((stat, index) => (
          <div
            className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0 overflow-auto"
            key={index}
          >
            <span className="text-gray-700">{stat.label}</span>
            <span className="font-medium">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default StatsSection;
