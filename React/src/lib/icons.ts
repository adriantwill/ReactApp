import { IconType } from "react-icons/lib";
import { TbTargetArrow } from "react-icons/tb";
import { TbFaceIdError } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";
import { TbBrain } from "react-icons/tb";
import { FaFootballBall } from "react-icons/fa";

// Type for trait names to ensure type safety
export type TraitName = "accurate" | "error" | "strong team" | "processor";
// Add other traits as needed

// Map of trait names to their corresponding icon components
export const traitIcons: Record<TraitName, IconType> = {
  accurate: TbTargetArrow,
  error: TbFaceIdError,
  "strong team": TbUsersGroup,
  processor: TbBrain,
  // Add other trait-icon mappings as needed
};

// Helper function to get an icon component by trait name
export const getTraitIcon = (trait: string): IconType => {
  // Check if the trait exists in our mapping, otherwise return the error icon
  console.log(trait);
  return traitIcons[trait as TraitName] || traitIcons.error;
};
