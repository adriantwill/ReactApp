function TeamStat(props: { title: string; summary: string; rank?: number }) {
  return (
    <div
      className={`flex flex-col items-center gap-1  ${
        props.title !== "Head Coach" &&
        props.title !== "EPA Per Play" &&
        props.title !== "College" &&
        props.title !== "Weight"
          ? "border-l-2"
          : ""
      }`}
    >
      <p className=" text-gray-600">{props.title}</p>
      <div className="flex items-center gap-2">
        <p className="text-3xl font-semibold   ">{props.summary}</p>
        {props.rank && (
          <p className="font-medium text-2xl text-gray-700 items-center justify-center ">
            {props.rank}
            <sup>th</sup>
          </p>
        )}
      </div>
    </div>
  );
}
export default TeamStat;
