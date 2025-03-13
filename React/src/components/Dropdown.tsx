import { useState } from "react";
import { useNavigate } from "react-router";

function Dropdown() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.split("/")[1];
  const [selected] = useState(currentPath);

  return (
    <header className="relative flex justify-center font-medium text-2xl tracking-wider gap-16 py-4 mb-1">
      <button
        className={
          selected === ""
            ? "relative after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-10/12 after:bg-blue-500 after:-translate-x-1/2"
            : "hover:relative hover:after:absolute hover:after:-bottom-2 hover:after:left-1/2 hover:after:h-0.5 hover:after:w-10/12 hover:after:bg-blue-500 hover:after:-translate-x-1/2 "
        }
        onClick={() => {
          navigate(`/`);
        }}
      >
        Home
      </button>
      <button
        className={
          selected === "rankings"
            ? "relative after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-10/12 after:bg-blue-500 after:-translate-x-1/2"
            : "hover:relative hover:after:absolute hover:after:-bottom-2 hover:after:left-1/2 hover:after:h-0.5 hover:after:w-10/12 hover:after:bg-blue-500 hover:after:-translate-x-1/2 "
        }
        onClick={() => {
          navigate(`/rankings`);
        }}
      >
        Rankings
      </button>
      <button
        onClick={() => {
          navigate(`/teams`);
        }}
        className={
          selected === "teams"
            ? "relative after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-10/12 after:bg-blue-500 after:-translate-x-1/2"
            : "hover:relative hover:after:absolute hover:after:-bottom-2 hover:after:left-1/2 hover:after:h-0.5 hover:after:w-10/12 hover:after:bg-blue-500 hover:after:-translate-x-1/2 "
        }
      >
        Teams
      </button>
      <button
        className={
          selected === "players"
            ? "relative after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-10/12 after:bg-blue-500 after:-translate-x-1/2"
            : ""
        }
        onClick={() => {
          navigate(`/players`);
        }}
      >
        Players
      </button>
    </header>
  );
}

export default Dropdown;
