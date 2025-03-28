import { useState } from "react";
import { useNavigate } from "react-router";

function DropdownButton(props: { name: string }) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.split("/")[1];
  const [selected] = useState(currentPath);
  return (
    <button
      className={`after:h-0.5 after:w-0 hover:after:w-10/12 after:transition-all after:duration-300 after:bg-blue-700 after:-translate-x-1/2 after:left-1/2 after:-bottom-2 capitalize relative after:absolute ${
        selected === props.name ? "after:w-10/12" : ""
      }`}
      onClick={() => {
        navigate(`/${props.name}`);
      }}
    >
      {props.name === "" ? "home" : props.name}
    </button>
  );
}
export default DropdownButton;
