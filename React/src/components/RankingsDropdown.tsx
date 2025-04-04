import { useState } from "react";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";

function RankingsDropdown(props: { title: string; options: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(props.options[0]);

  return (
    <div className="relative inline-block text-left">
      <div className="font-semibold pb-1 pl-1">Type</div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between px-2 py-1 bg-white border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
      >
        <span className="mr-2">{selected}</span>
        {isOpen ? <TbChevronUp /> : <TbChevronDown />}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-40 mt-1 bg-white border rounded-md shadow-lg">
          <ul className="py-1">
            {props.options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-sm text-gray-700 text-left hover:bg-gray-100"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default RankingsDropdown;
