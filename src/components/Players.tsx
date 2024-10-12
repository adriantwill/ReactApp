type PlayerProp = {
  name: string;
  number: number;
  position: string; // Define the style prop type ded
  image: string;
  tailwind?: string;
};

function Card(props: PlayerProp) {
  const handleClick = () => console.log("test");
  return (
    <div
      className={`border shadow-[5px_5px_5px_hsla(0,0%,0%,0.1)] text-center w-24 h-44 inline bg-[#0076b6] relative m-4 p-[5px] rounded-[10px] border-solid border-[black] hover:cursor-pointer hover:scale-105 mt-14 ${props.tailwind}`}
      onClick={handleClick}
    >
      <img
        className=" shadow-[5px_5px_5px_hsla(0,0%,0%,0.1)] bg-[#b0b7bc] rounded-[10px] border-[0.5px] border-solid border-[black]˝"
        src={props.image}
      ></img>
      <div className="font-normal text-lg text-white mb-[5px]">{props.name}</div>
      <div className="text-3xl font-medium text-[white] mb-2.5">{props.number}</div>
      <div className="text-white text-lg font-normal">{props.position}</div>
    </div>
  );
}

export default Card;
