import { IoMdOpen } from "react-icons/io";
import { useNavigate } from "react-router";
interface PlayerPageSmallCardProps {
  children: React.ReactNode;
  title: string;
  tailwind: string;
  color: string;
}

function PlayerPageSmallCard(props: PlayerPageSmallCardProps) {
  const navigate = useNavigate();
  return (
    <div className="w-full shadow-surround rounded-sm  bg-white">
      <div className="text-center  justify-center font-medium tracking-tighter text-2xl p-1 relative">
        {props.title}
        {props.title !== "Info" && (
          <IoMdOpen
            className="absolute top-2 right-3 cursor-pointer"
            onClick={() => navigate(`/key`)}
          />
        )}
      </div>
      <div className="h-1" style={{ backgroundColor: `#${props.color}` }}></div>
      <div className={`flex h-24 ${props.tailwind} items-center `}>
        {props.children}
      </div>
    </div>
  );
}
export default PlayerPageSmallCard;
