import React from "react";
import RankingStats from "./RankingStats";

type Props = {
  player: Player;
  team: TeamStats;
  data: Statistics;
  index: number;
};

type Statistics = {
  statistics: {
    labels: string[];
    splits: Split[];
  };
};

type Split = {
  stats: string[];
};

type Player = {
  team: Team;
  displayName: string;
  headshot: Headshot;
  position: Position;
};

type Team = {
  $ref: string;
};

type Headshot = {
  href: string;
};

type Position = {
  abbreviation: string;
};

type TeamStats = {
  displayName: string;
  logos: Logos[];
  color: string;
};

type Logos = {
  href: string;
};

function RankingCard(props: Props) {
  return (
    <div className="m-6 bg-primary rounded-md shadow-xl w-[50rem]">
      <div className="flex justify-between p-2 px-4 items-center">
        <div className="text-2xl font-semibold ">{props.index}</div>
        <h3 className="text-3xl font-bold ">{props.player?.displayName}</h3>
        <div className="text-2xl font-semibold ">
          {props.player?.position.abbreviation}
        </div>
      </div>
      <div
        style={{ backgroundColor: `#${props.team?.color}` }}
        className="h-1"
      ></div>
      <p className="text-center text-xl font-medium p-3">
        {props.team?.displayName}
      </p>
      <div className="flex justify-between">
        <RankingStats
          values={props.data?.statistics.splits[0]?.stats || []}
          type="2024"
        ></RankingStats>
        <RankingStats
          values={
            props.data?.statistics.splits[
              props.data.statistics.splits.length - 1
            ]?.stats || []
          }
          type="Career"
        ></RankingStats>
        <div className="relative w-40 overflow-hidden">
          <img
            src={props.team?.logos[0].href}
            className="absolute opacity-50 -bottom-8"
          />
          <img src={props.player?.headshot.href} className="relative" />
        </div>
      </div>
    </div>
  );
}

export default RankingCard;
