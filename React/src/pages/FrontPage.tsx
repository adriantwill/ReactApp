import Dropdown from "../components/Dropdown";
import LiveCard from "../components/LiveCard";
import { useQuery } from "@tanstack/react-query";
import { AtpAgent } from "@atproto/api";

function FrontPage() {
  const agent = new AtpAgent({ service: "https://bsky.social" });
  const { data: likes } = useQuery({
    queryKey: ["likes"],
    queryFn: async () => {
      await agent.login({
        identifier: "bigdatapoints.bsky.social",
        password: "",
      });

      return agent.getActorLikes({
        actor: "did:plc:g7hm5kt7bfgdutda62pygdfk",
        limit: 50,
      });
    },
  });
  console.log(import.meta.env.VITE_BLUESKY_PASSWORD);
  console.log(likes);

  return (
    <>
      <Dropdown />
      <div className="">
        <p className="text-xl font-medium ">Breaking</p>
        <div className="flex group overflow-hidden">
          <div className="flex animate-loop-scroll group-hover:[animation-play-state:paused]">
            <LiveCard></LiveCard>
            <LiveCard></LiveCard>
            <LiveCard></LiveCard>
            <LiveCard></LiveCard>
          </div>
          <div className="flex animate-loop-scroll group-hover:[animation-play-state:paused] aria-hidden: true">
            <LiveCard></LiveCard>
            <LiveCard></LiveCard>
            <LiveCard></LiveCard>
            <LiveCard></LiveCard>
          </div>
        </div>
      </div>
    </>
  );
}

export default FrontPage;
