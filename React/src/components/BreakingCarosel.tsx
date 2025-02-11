import { Temporal } from "@js-temporal/polyfill";
import { FeedViewPostWithRecord } from "../pages/FrontPage";
import LiveCard from "./LiveCard";

function BreakingCarosel(props: { likes: FeedViewPostWithRecord[] }) {
  return (
    <div className="flex animate-loop-scroll group-hover:[animation-play-state:paused]">
      {props.likes?.map((like, index) => {
        const postDate = Temporal.ZonedDateTime.from(
          like.post.record.createdAt + "[America/New_York]"
        );
        const now = Temporal.Now.zonedDateTimeISO("America/New_York");
        const diff = now.since(postDate, { largestUnit: "days" });

        return diff.days < 3 || index < 5 ? (
          <LiveCard
            key={index}
            text={like.post.record.text}
            image={
              like.post.embed?.images?.[0]?.fullsize ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
            }
            date={like.post.record.createdAt}
          ></LiveCard>
        ) : null;
      })}
    </div>
  );
}
export default BreakingCarosel;
