import PlayerModalCardSubTitle from "../subcomponents/PlayerModalCardSubTitle";
import TeamStat from "../subcomponents/TeamStat";

function PlayerModalMediumCard(props: {
  items: string[];
  info: string[];
  title: string;
}) {
  return (
    <div className={`w-full`}>
      <PlayerModalCardSubTitle title={props.title} />
      <div className="rounded-md bg-primary">
        <div className="grid grid-cols-3 p-4">
          {props.items.map((item, index) => (
            <TeamStat key={index} title={props.info[index]} summary={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayerModalMediumCard;
