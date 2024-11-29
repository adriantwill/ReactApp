import React from "react";

type PropsState = {
  setTableButton: React.Dispatch<React.SetStateAction<CategoriesLabels>>;
  allCategories: [CategoriesLabels];
  activeStats: CategoriesLabels;
};

type CategoriesLabels = {
  name: string;
  displayName: string;
  count: number;
};

function TableButton(props: PropsState) {
  return (
    <div className="flex gap-4 mb-4 justify-center">
      {props.allCategories.map((category) => (
        <button
          key={category.name}
          onClick={() => props.setTableButton(category)}
          className="px-10 py-2 rounded-xl text-lg font-medium
          transition-all duration-200 ease-in-out
          hover:scale-105 active:scale-95
          hover:shadow-md active:shadow-sm"
          style={{
            backgroundColor:
              props.activeStats.name === category.name ? "#cbd5e1" : "",
          }}
        >
          {category.displayName}
        </button>
      ))}
    </div>
  );
}

export default TableButton;
