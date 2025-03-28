function PlayerInfo(props: {
  age: number;
  salary: number;
  height: number;
  weight: number;
}) {
  return (
    <>
      <div className="flex flex-col ">
        <div className="text-lg text-center text-gray-600 ">Age</div>
        <p className="text-3xl font-medium text-center">{props.age}</p>
      </div>
      <div className="flex flex-col ">
        <div className="text-lg text-center text-gray-600 ">Contract</div>
        <p className="text-3xl font-medium text-center">${props.salary}M</p>
      </div>
      <div className="flex flex-col ">
        <div className="text-lg text-center text-gray-600 ">Height</div>
        <p className="text-3xl font-medium text-center">
          {Math.floor(props.height / 12)}'{props.height % 12}
        </p>
      </div>
      <div className="flex flex-col ">
        <div className="text-lg text-center text-gray-600 ">Weight</div>
        <p className="text-3xl font-medium text-center">{props.weight}</p>
      </div>
    </>
  );
}
export default PlayerInfo;
