interface PlayerPageSmallCardProps {
  children: React.ReactNode;
  title: string;
  tailwind: string;
}

function PlayerPageSmallCard(props: PlayerPageSmallCardProps) {
  return (
    <div className=" w-[28rem] shadow-[0_0_8px_0_rgba(0,0,0,0.2)] rounded-md ">
      <div className="text-center font-medium text-2xl p-1">{props.title}</div>
      <div className="h-1 bg-slate-600"></div>
      <div className={`flex h-24 overflow-auto ${props.tailwind} items-center`}>
        {props.children}
      </div>
    </div>
  );
}
export default PlayerPageSmallCard;
