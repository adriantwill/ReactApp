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
    <div style={divStyle} className="card" onClick={handleClick}>
      <img className="picture" src={props.image}></img>
      <div className="name">{props.name}</div>
      <div className="number">{props.number}</div>
      <div className="position">{props.position}</div>
    </div>
  );
}

export default Card;
