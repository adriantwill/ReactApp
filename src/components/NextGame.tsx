import React from "react";
import log from "../assets/min.png";

type TeamEvent = {
  nextEvent: NextEvent[];
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

function NextGame(props: TeamEvent) {
  //test
  return (
    <div className="my-6 bg-primary rounded-md shadow-lg">
      <h3 className="text-center text-3xl font-medium m-2">Upcoming Game</h3>
      <div className="h-2 bg-blue-800 rounded-sm"></div>
      <div className="flex justify-around p-2 items-center">
        {props.nextEvent.length === 0 ? (
          <div></div>
        ) : (
          <>
            <div className="flex items-center text-2xl m-2">
              <img
                src={
                  props.nextEvent[0].competitions[0].competitors[1].team
                    .logos[0].href
                }
                className="w-16"
              />
              <p className="text-center font-normal m-2">
                {
                  props.nextEvent[0].competitions[0].competitors[1].team
                    .nickname
                }
              </p>
            </div>
            <div>
              <p className="text-center text-lg">
                {props.nextEvent[0].week.text}
              </p>
              <p className="text-center text-lg">
                {props.nextEvent[0].competitions[0].status.type.shortDetail}
              </p>
            </div>
            <div className="flex items-center text-2xl m-2">
              <p className="text-center font-normal m-2">
                {" "}
                {
                  props.nextEvent[0].competitions[0].competitors[0].team
                    .nickname
                }
              </p>
              <img
                src={
                  props.nextEvent[0].competitions[0].competitors[0].team
                    .logos[0].href
                }
                className="w-16"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NextGame;
