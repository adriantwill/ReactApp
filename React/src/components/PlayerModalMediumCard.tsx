type PlayerInfo = {
  item1: string;
  item2: string;
  item3: string;
  style: string;
};

function PlayerModalMediumCard(props: PlayerInfo) {
  return (
    <div className={`drop-shadow-sm w-[55vh]`}>
      <div className="rounded-t-xl p-3 pb-5 -mb-2 bg-[rgba(255,255,255,0.25)] font-medium ">
        <p className="text-center text-3xl text-white">
          {props.style === "mr-4" ? "Draft Profile" : "Player Information"}
        </p>
      </div>
      <div className="rounded-xl bg-primary">
        <div className="grid grid-cols-3 font-semibold opacity-60 text-3xl p-4 pb-2">
          <p className="text-center">
            {props.style === "mr-4" ? "College" : "Weight"}
          </p>
          <p className="text-center">
            {props.style === "mr-4" ? "Year" : "Height"}
          </p>
          <p className="text-center">
            {props.style === "mr-4" ? "Pick" : "Age"}
          </p>
        </div>
        <div className="grid grid-cols-3 font-semibold text-4xl p-4 pt-2">
          <p className="text-center">{props.item1}</p>
          <p className="text-center">{props.item2}</p>
          <p className="text-center">{props.item3}</p>
        </div>
      </div>
    </div>
  );
}

export default PlayerModalMediumCard;
