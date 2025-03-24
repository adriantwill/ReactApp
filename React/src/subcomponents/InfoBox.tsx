import { IoInformationCircleOutline } from "react-icons/io5";

function InfoBox(props: { info: string; tailwind?: string }) {
  return (
    <div className="relative group">
      <IoInformationCircleOutline
        className={`ml-1 cursor-help ${props.tailwind}`}
      />
      <div className="absolute left-9 top-1/2 -translate-y-1/2 w-64 p-2 bg-white rounded-md shadow-surround opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
        {props.info}
      </div>
    </div>
  );
}
export default InfoBox;
