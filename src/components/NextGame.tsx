import React from "react";
import log from "../assets/min.png";

type Props = {
  nextEvent: NextEvent[];
  color: string;
};
type NextEvent = {
  competitions: Competitions[];
  week: Week;
};

type Week = {
  text: string;
};

type Competitions = {
  competitors: Competetors[];
  status: Status;
};

type Competetors = {
  team: Team;
};

type Team = {
  nickname: string;
  logos: Logos[];
};

type Logos = {
  href: string;
};

type Status = {
  type: Type;
};
type Type = {
  shortDetail: string;
  description: string;
};

function NextGame(props: Props) {
  //test
  let teamInfo: NextEvent = {
    competitions: [
      {
        competitors: [
          {
            team: { nickname: "", logos: [{ href: "" }] },
          },
          {
            team: { nickname: "", logos: [{ href: "" }] },
          },
        ],
        status: { type: { shortDetail: "", description: "" } },
      },
    ],
    week: { text: "" },
  };
  if (props.nextEvent.length > 0) {
    teamInfo = props.nextEvent[0];
  }
  return (
    <div className="my-6 bg-primary rounded-md shadow-lg">
      <h3 className="text-center text-3xl font-medium m-2">
        {teamInfo.competitions[0].status.type.description === "Scheduled"
          ? "Upcoming Game"
          : teamInfo.competitions[0].status.type.description === "In Progress"
          ? "Live Game"
          : "Final Game"}
      </h3>
      <div
        style={{ backgroundColor: `#${props.color}` }}
        className="h-2 rounded-sm"
      ></div>
      <div className="grid grid-cols-3 gap-0 p-2 items-center">
        <div className="flex items-center justify-center text-2xl m-2">
          <img
            src={teamInfo.competitions[0].competitors[1].team.logos[0].href}
            className="w-16"
          />
          <p className="text-center font-normal m-2">
            {teamInfo.competitions[0].competitors[1].team.nickname}
          </p>
        </div>
        <div>
          <p className="text-center text-lg">{teamInfo.week.text}</p>
          <p className="text-center text-lg">
            {teamInfo.competitions[0].status.type.shortDetail}
          </p>
        </div>
        <div className="flex items-center justify-center text-2xl m-2">
          <p className="text-center font-normal m-2">
            {" "}
            {teamInfo.competitions[0].competitors[0].team.nickname}
          </p>
          <img
            src={teamInfo.competitions[0].competitors[0].team.logos[0].href}
            className="w-16"
          />
        </div>
      </div>
    </div>
  );
}

export default NextGame;
