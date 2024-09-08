type PlayerProp = {
  name: string;
  number: number;
  position: string; // Define the style prop type ded
  top?: string;
  image: string;
};

function Card(props: PlayerProp) {
  const handleClick = () => console.log("test");
  const divStyle = {
    top: props.top,
  };
  return (
    <div
      style={divStyle}
      className="border shadow-[5px_5px_5px_hsla(0,0%,0%,0.1)] text-center max-w-[120px] min-w-[120px] max-h-[360px] inline-block bg-[#0076b6] relative m-[15px] p-[5px] rounded-[10px] border-solid border-[black] hover:cursor-pointer hover:scale-105"
      onClick={handleClick}
    >
      <img
        className=" max-w-[95%] shadow-[5px_5px_5px_hsla(0,0%,0%,0.1)] bg-[#b0b7bc] rounded-[10px] border-[0.5px] border-solid border-[black]˝"
        src={props.image}
      ></img>
      <div className="name">{props.name}</div>
      <div className="number">{props.number}</div>
      <div className="position">{props.position}</div>
    </div>
  );
}

export default Card;
