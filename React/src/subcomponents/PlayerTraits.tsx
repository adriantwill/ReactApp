import React from "react";

type TraitProps = {
  name: string;
  grade: string;
};

const Trait: React.FC<TraitProps> = ({ name, grade }) => {
  return (
    <div>
      <div className="text-lg text-center">{name}</div>
      <div className="text-xs text-center">Tier</div>
      <div className="text-3xl text-center font-medium ">{grade}</div>
    </div>
  );
};

function PlayerTraits() {
  return (
    <>
      {[
        { name: "Deep", grade: "1" },
        { name: "Intermediate", grade: "2" },
        { name: "Rushing", grade: "3" },
        { name: "Pocket", grade: "3" },
      ].map((trait, index) => (
        <Trait key={index} name={trait.name} grade={trait.grade} />
      ))}
    </>
  );
}
export default PlayerTraits;
