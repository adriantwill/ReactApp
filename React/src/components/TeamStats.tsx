function TeamStats(props: {
  title: string;
  color: string;
  tailwind?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={` bg-white rounded-sm shadow-surround  ${props.tailwind}`}>
      <h3 className="text-center text-3xl tracking-tighter font-medium p-3">
        {props.title}
      </h3>
      <div style={{ backgroundColor: `#${props.color}` }} className="h-2"></div>
      <div className="p-3 grid grid-flow-col auto-cols-fr ">
        {props.children}
      </div>
    </div>
  );
}

export default TeamStats;
