import { useState } from "react";
import { Temporal } from "@js-temporal/polyfill";
import TeamButton from "./TeamButton";
import PlayerModalCardSubTitle from "../subcomponents/PlayerModalCardSubTitle";
import { CategoriesLabels, GameLog } from "../lib/types";

function StatsTable(props: { gameLog: GameLog; color: string }) {
  const opponents: CategoriesLabels = {
    name: "opponents",
    displayName: "Opponents",
    count: 3,
  };
  const label = ["DATE", "OPP", "RES"];
  let allCategories: CategoriesLabels[] = [opponents];
  if (props.gameLog?.categories) {
    allCategories.push(...props.gameLog.categories);
  }
  const [activeStats, setActiveStats] = useState(opponents);
  let totalCount = 0;
  if (props.gameLog.categories) {
    for (const category of props.gameLog.categories) {
      if (category.name === activeStats.name) {
        break;
      }
      totalCount += category.count;
    }
  }
  const formatDate = (dateString: string): string => {
    const date = Temporal.PlainDate.from(dateString);
    return `${date.month}/${date.day}`;
  };
  return (
    <>
      <PlayerModalCardSubTitle title={"2024 Season Statistics"} />

      <div className=" rounded-md bg-primary p-4 ">
        <div className="flex gap-4 mb-4 justify-center">
          {allCategories.map((category) => (
            <TeamButton
              key={category.name}
              onClick={() => setActiveStats(category)}
              title={category.name}
              selected={activeStats.name === category.name}
              color={props.color}
            />
          ))}
        </div>
        <div className="relative overflow-auto border rounded-sm h-48">
          <table className="w-full text-sm text-center text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
              <tr>
                <th className="px-4 py-2">WK</th>
                {Array.from({ length: activeStats.count }).map((_, index) => (
                  <th key={index} className="px-4 py-3">
                    {activeStats.name === "opponents"
                      ? label[index]
                      : props.gameLog.labels[index + totalCount]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 18 }).map((_, index) => {
                if (!props.gameLog.events) {
                  return null;
                }
                const event = Object.values(props.gameLog.events).find(
                  (event) => event.week === index + 1 && !event.eventNote
                );
                return (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-gray-100 border-b "
                  >
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{`Week ${
                      index + 1
                    }`}</th>
                    {event && activeStats.name === "opponents" ? (
                      <>
                        <td className="border text-center px-6 py-4">
                          {formatDate(event.gameDate)}
                        </td>
                        <td className="border text-center px-6 py-4">
                          {event.atVs === "vs"
                            ? event.opponent.abbreviation
                            : "@" + event.opponent.abbreviation}
                        </td>
                        <td className="border text-center px-6 py-4">
                          {event.gameResult +
                            " " +
                            event.homeTeamScore +
                            "-" +
                            event.awayTeamScore}
                        </td>
                      </>
                    ) : (
                      Array.from({ length: activeStats.count }).map(
                        (_, weeklyIndex) => (
                          <td
                            className="border text-center px-6 py-4"
                            key={weeklyIndex}
                          >
                            {(event &&
                              props.gameLog.seasonTypes[
                                props.gameLog.seasonTypes.length - 1
                              ].categories[0]?.events.length > 0 &&
                              props.gameLog.seasonTypes[
                                props.gameLog.seasonTypes.length - 1
                              ].categories[0]?.events.find(
                                (e) => e.eventId === event.id
                              )?.stats[weeklyIndex + totalCount]) ||
                              "-"}
                          </td>
                        )
                      )
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StatsTable;
