interface PlayerPageSmallCardProps {
  children: React.ReactNode;
  title: string;
  tailwind: string;
  color: string;
}

function PlayerPageSmallCard(props: PlayerPageSmallCardProps) {
  return (
    <div className=" w-[28rem] shadow-surround rounded-md  bg-white">
      <div className="text-center font-medium text-2xl p-1">{props.title}</div>
      <div className="h-1" style={{ backgroundColor: `#${props.color}` }}></div>
      <div className={`flex h-24 ${props.tailwind} items-center `}>
        {props.children}
      </div>
    </div>
  );
}
export default PlayerPageSmallCard;
