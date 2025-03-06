import React from "react";

type TraitProps = {
  name: string;
  grade: string;
};

const Trait: React.FC<TraitProps> = ({ name, grade }) => {
  return (
    <div>
      <div className="text-lg">{name}</div>
      <div className="text-xs text-center">Tier</div>
      <div className="text-3xl text-center font-medium ">{grade}</div>
    </div>
  );
};

function PlayerTraits() {
  return (
    <>
      {[
        { name: "Accuracy", grade: "1" },
        { name: "Speed", grade: "2" },
        { name: "Power", grade: "3" },
        { name: "Control", grade: "4" },
        { name: "Agility", grade: "5" },
      ].map((trait, index) => (
        <Trait key={index} name={trait.name} grade={trait.grade} />
      ))}
    </>
  );
}
export default PlayerTraits;
