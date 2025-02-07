import Dropdown from "../components/Dropdown";
import LiveCard from "../components/LiveCard";
import { useQuery } from "@tanstack/react-query";
import { AtpAgent } from "@atproto/api";
import { Temporal } from "@js-temporal/polyfill";

function FrontPage() {
  const agent = new AtpAgent({ service: "https://bsky.social" });
  const { data: likes } = useQuery({
    queryKey: ["likes"],
    queryFn: async () => {
      await agent.login({
        identifier: "bigdatapoint.bsky.social",
        password: import.meta.env.VITE_BLUESKY_PASSWORD,
      });

      const response = await agent.getActorLikes({
        actor: "did:plc:g7hm5kt7bfgdutda62pygdfk",
        limit: 7,
      });
      return response.data.feed;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  console.log(likes);
  return (
    <>
      <Dropdown />
      <div className="">
        <p className="text-xl font-medium ">Breaking</p>
        <div className="flex group overflow-hidden">
          <div className="flex animate-loop-scroll group-hover:[animation-play-state:paused]">
            {likes?.map((like) => {
              const postDate = Temporal.ZonedDateTime.from(
                like.post.record.createdAt + "[America/New_York]"
              );
              const now = Temporal.Now.zonedDateTimeISO("America/New_York");
              const diff = now.since(postDate, { largestUnit: "days" });

              return diff.days < 3 ? (
                <LiveCard
                  key={like.post.uri}
                  text={like.post.record.text}
                  image={like.post.embed?.images[0].fullsize}
                  date={like.post.record.createdAt}
                ></LiveCard>
              ) : null;
            })}
          </div>
          <div className="flex animate-loop-scroll group-hover:[animation-play-state:paused]">
            {likes?.map((like) => {
              const postDate = Temporal.ZonedDateTime.from(
                like.post.record.createdAt + "[America/New_York]"
              );
              const now = Temporal.Now.zonedDateTimeISO("America/New_York");
              const diff = now.since(postDate, { largestUnit: "days" });

              return diff.days < 3 ? (
                <LiveCard
                  key={like.post.uri}
                  text={like.post.record.text}
                  image={like.post.embed?.images[0].fullsize}
                  date={like.post.record.createdAt}
                ></LiveCard>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default FrontPage;
