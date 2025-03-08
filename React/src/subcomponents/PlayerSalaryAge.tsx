function PlayerInfo(props: {
  age: number;
  salary: number;
  height: number;
  weight: number;
}) {
  return (
    <>
      <div className="flex flex-col ">
        <div className="text-xl text-center ">Age</div>
        <p className="text-3xl font-medium text-center">{props.age}</p>
      </div>
      <div className="flex flex-col ">
        <div className="text-xl text-center ">Contract</div>
        <p className="text-3xl font-medium text-center">${props.salary}M</p>
      </div>
      <div className="flex flex-col ">
        <div className="text-xl text-center ">Height</div>
        <p className="text-3xl font-medium text-center">
          {Math.floor(props.height / 12)}'{props.height % 12}''
        </p>
      </div>
      <div className="flex flex-col ">
        <div className="text-xl text-center ">Weight</div>
        <p className="text-3xl font-medium text-center">{props.weight}</p>
      </div>
    </>
  );
}
export default PlayerInfo;
