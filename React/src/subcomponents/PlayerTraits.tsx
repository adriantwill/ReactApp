import React from "react";

type TraitProps = {
  name: string;
  grade: string;
};

const Trait: React.FC<TraitProps> = ({ name, grade }) => {
  return (
    <div>
      <div>{name}</div>
      <div className="text-3xl text-center font-medium pt-1">{grade}</div>
    </div>
  );
};

function PlayerTraits() {
  return (
    <>
      {[
        { name: "Accuracy", grade: "A+" },
        { name: "Speed", grade: "A+" },
        { name: "Power", grade: "A+" },
        { name: "Control", grade: "A+" },
        { name: "Agility", grade: "A+" },
      ].map((trait, index) => (
        <Trait key={index} name={trait.name} grade={trait.grade} />
      ))}
    </>
  );
}
export default PlayerTraits;
