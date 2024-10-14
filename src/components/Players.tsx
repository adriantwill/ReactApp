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
      className={`border-black border drop-shadow-xl text-center w-24 h-44 inline bg-[#0076b6] relative m-4 p-1.5 rounded-xl border-solid hover:cursor-pointer hover:scale-110 transition duration-500 ease-in-out mt-20 ${props.tailwind}`}
      onClick={handleClick}
    >
      <img
        className=" drop-shadow-xl bg-[#b0b7bc] rounded-xl border-[0.5px] border-solid border-black"
        src={props.image}
      ></img>
      <div className="font-normal text-lg text-white mb-1.5">{props.name}</div>
      <div className="text-3xl font-medium text-white mb-2.5">{props.number}</div>
      <div className="text-white text-lg font-normal">{props.position}</div>
    </div>
  );
}

export default Card;
