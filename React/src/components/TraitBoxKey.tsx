import React from "react";
import { getTraitIcon } from "../lib/icons";

function TraitBoxKey(props: { title: string; description: string }) {
  return (
    <div className="border rounded-lg p-4 flex-shrink-0 w-72">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-medium capitalize">{props.title}</h2>
        {React.createElement(getTraitIcon(String(props.title)), {
          size: 34,
        })}
      </div>
      <p>{props.description}</p>
    </div>
  );
}
export default TraitBoxKey;
