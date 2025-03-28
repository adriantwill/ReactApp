type PlayerInfo = {
  items: string[];
  info: string[];
  title: string;
};

function PlayerModalMediumCard(props: PlayerInfo) {
  return (
    <div className={`w-full`}>
      <div className="text-center text-3xl text-white rounded-t-xl p-3 pb-5 -mb-2 bg-white bg-opacity-25 font-medium ">
        {props.title}
      </div>
      <div className="rounded-xl bg-primary">
        <div className="grid grid-cols-3 p-4">
          {props.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className="text-lg text-gray-600 font-medium">
                {props.info[index]}
              </div>
              <div className="text-3xl font-bold">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayerModalMediumCard;
