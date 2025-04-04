import { IconType } from "react-icons/lib";
import { TbFaceIdError } from "react-icons/tb";
import { TbTargetArrow } from "react-icons/tb";
import { LuBicepsFlexed } from "react-icons/lu";
import { TbRun } from "react-icons/tb";
import { TbBrain } from "react-icons/tb";
import { PiFootballHelmet } from "react-icons/pi";

export const traitIcons: Record<string, IconType> = {
  "pocket passer": PiFootballHelmet,
  gunslinger: PiFootballHelmet,
  "dual threat": PiFootballHelmet,
  deep: TbTargetArrow,
  medium: TbTargetArrow,
  sideline: TbTargetArrow,
  intermediate: TbTargetArrow,
  pressure: TbBrain,
  processor: TbBrain,
  "decision maker": TbBrain,
  "pocket presence": TbBrain,
  power: LuBicepsFlexed,
  versitility: LuBicepsFlexed,
  velocity: LuBicepsFlexed,
  rushing: TbRun,
  elusiveness: TbRun,
  "play extension": TbRun,
  error: TbFaceIdError,
};

export const getTraitIcon = (trait: string): IconType => {
  return traitIcons[trait as string] || traitIcons.error;
};
