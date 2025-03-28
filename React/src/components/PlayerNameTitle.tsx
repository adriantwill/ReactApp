function PlayerNameTitle(props: {
  name: string;
  number: string;
  position: string;
}) {
  return (
    <div className="flex flex-col justify-center gap-4">
      <h1 className="text-white text-6xl font-bold ">{props.name}</h1>
      <h2 className="text-white text-2xl font-semibold">
        {props.position + " | " + (props.number || "00")}
      </h2>
    </div>
  );
}
export default PlayerNameTitle;
