import { Temporal } from "@js-temporal/polyfill";
import { FeedViewPostWithRecord } from "../lib/types";

function BreakingCarosel(props: { likes: FeedViewPostWithRecord[] }) {
  return (
    <div className="flex animate-loop-scroll group-hover:[animation-play-state:paused]">
      {props.likes?.map((like, index) => {
        const postDate = Temporal.ZonedDateTime.from(
          like.post.record.createdAt + "[America/New_York]"
        );
        const now = Temporal.Now.zonedDateTimeISO("America/New_York");
        const diff = now.since(postDate, { largestUnit: "days" });
        const date = Temporal.ZonedDateTime.from(
          like.post.record.createdAt + "[America/New_York]"
        );
        const formattedDate = `${date.month}/${date.day}`;
        return diff.days < 3 || index < 4 ? (
          <div
            className="bg-white w-[25rem] h-[12.5rem] rounded-lg flex border flex-shrink-0 ml-10 relative"
            key={like.post.cid}
          >
            <img
              src={
                like.post.embed?.images?.[0]?.fullsize ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
              }
              alt="temperature"
              className="w-2/5 h-full object-cover rounded-l-md"
            />
            <div className="w-3/5 overflow-auto -mb-2 p-2 flex flex-col justify-between">
              <div className=" text-sm font-light">{like.post.record.text}</div>
              <div className=" text-xs text-gray-500 text-right">
                {formattedDate}
              </div>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
}
export default BreakingCarosel;
