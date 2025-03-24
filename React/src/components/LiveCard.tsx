import { Temporal } from "@js-temporal/polyfill";

function LiveCard(props: { image: string; text: string; date: string }) {
  const date = Temporal.ZonedDateTime.from(props.date + "[America/New_York]");
  const formattedDate = `${date.month}/${date.day}`;
  // The date is already properly formatted in the line above with `${date.month}/${date.day}`
  return (
    <div className="bg-white w-[25rem] h-[12.5rem] rounded-lg flex shadow-lg border flex-shrink-0 ml-12 relative">
      <img
        src={props.image}
        alt="temperature"
        className="w-2/5 h-full object-cover rounded-l-md"
      />
      <div className="w-3/5 overflow-auto -mb-2 p-2 flex flex-col justify-between">
        <div className=" text-sm font-light">{props.text}</div>
        <div className=" text-xs text-gray-500 text-right">{formattedDate}</div>
      </div>
    </div>
  );
}

export default LiveCard;
