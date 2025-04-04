export const passingStats = [
  {
    label: "EPA per Play",
    description:
      "EPA stands for expected points added and compares the players drive by drive result to what would be expected on a play based on the field positioning. It is an effective way to weight how successful a play was as a 5 yard gain can be dramtically more difficult if depending on the amount of downs for example. ",
  },
  {
    label: "Time to Throw",
    description:
      "The average amount of time between when the ball is snapped and thrown. Generally lower is better as it is indicative of a better processer, but there are expections for effective play extenders.",
  },
  {
    label: "Yards per Attempt",
    description:
      "The average amount of yards gained on every dropback. Generally higher is better as more of a quarterbacks dropbacks are being completed and for more substancial yardage",
  },
  {
    label: "Touchdown Rate by Interception Rate",
    description:
      "The percentage of throws that were inercepted. Lower is better, however not a flawless stat as not all interceptions are the fault of the quarterback, as a throw bobbled by the receiver and intercepted being an example",
  },
  {
    label: "Pressure to Sack Rate",
    description:
      "The percentage of times a quarterback is sacked when attempting to pass. Lower is better and it generally an indicator of how a quarterback deals with pressure, but sometimes a sign of poor offensive line play",
  },
  {
    label: "Completion Percentage over Expected",
    description:
      "The percentage of plays that were accurate and on target, removing throwaways and spikes. Higher is better and this is a generally a better indicator than completion percentage, as accurate throws which were dropeed do not reflect poorly on the quarterback",
  },
];

export const rushingStats = [
  {
    label: "Yards After Contact",
    description:
      "Expected Points Added (EPA) measures the value of each play based on down, distance, and field position. Positive EPA indicates an above-average play that improved the team's scoring chances.",
  },
  { label: "Broken Tackles", description: "Real" },
  { label: "Fumbles", description: "Real" },
  { label: "Explosive Run Rate", description: "Real" },
  { label: "EPA per Rush", description: "Real" },
  { label: "Success Rate", description: "Real" },
  { label: "Attempts", description: "Real" },
];
