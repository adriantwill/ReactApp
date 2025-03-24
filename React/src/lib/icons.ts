import { IconType } from "react-icons/lib";
import { TbFaceIdError } from "react-icons/tb";
import { TbTargetArrow } from "react-icons/tb";
import { LuBicepsFlexed } from "react-icons/lu";
import { TbRun } from "react-icons/tb";
import { TbBrain } from "react-icons/tb";
import { PiFootballHelmet } from "react-icons/pi";

// Type for trait names to ensure type safety
export type TraitName = string;
// Add other traits as needed

// Map of trait names to their corresponding icon components
export const traitIcons: Record<TraitName, IconType> = {
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
  strength: LuBicepsFlexed,
  versitility: LuBicepsFlexed,
  velocity: LuBicepsFlexed,
  rushing: TbRun,
  elusiveness: TbRun,
  "play extension": TbRun,
  error: TbFaceIdError,
};

// Helper function to get an icon component by trait name
export const getTraitIcon = (trait: string): IconType => {
  // Check if the trait exists in our mapping, otherwise return the error icon
  console.log(trait);
  return traitIcons[trait as TraitName] || traitIcons.error;
};
