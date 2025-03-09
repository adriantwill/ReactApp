import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

type TraitProps = {
  name: string;
  grade: string;
};

const Trait: React.FC<TraitProps> = ({ name, grade }) => {
  return (
    <div className="">
      <div className="flex items-center ">
        <div className="text-lg text-center">{name}</div>
        <div className="relative group">
          <IoInformationCircleOutline className="ml-1 cursor-help " />
          <div className="absolute left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ">
            Information about {name} trait and its impact on gameplay
          </div>
        </div>
      </div>
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
