type PlayerInfo = {
  item1: string;
  item2: string;
  item3: string;
};

function InfoBox(props: PlayerInfo) {
  return (
    <div className="w-1/3 m-4">
      <div className="rounded-t-xl pb-4 pt-2 -my-2 bg-[rgba(255,255,255,0.5)] font-medium">
        <p className="text-center text-3xl text-white">Draft Profile</p>
      </div>
      <div className="rounded-xl bg-gray-200">
        <div className="grid grid-cols-3 p-2 font-semibold opacity-60 text-3xl">
          <p className="text-center">College</p>
          <p className="text-center">Year</p>
          <p className="text-center">Pick</p>
        </div>
        <div className="grid grid-cols-3 font-semibold text-4xl pb-4">
          <p className="text-center">{props.item1}</p>
          <p className="text-center">{props.item2}</p>
          <p className="text-center">{props.item3}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoBox;
