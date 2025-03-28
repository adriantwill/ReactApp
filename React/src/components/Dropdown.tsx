import DropdownButton from "./DropdownButton";

function Dropdown() {
  return (
    <header className="sticky top-0 flex justify-center font-medium text-2xl tracking-wider gap-16 py-5 bg-primary  border-blue-500 z-10">
      <DropdownButton name="" />
      <DropdownButton name="rankings" />
      <DropdownButton name="players" />
      <DropdownButton name="teams" />
    </header>
  );
}

export default Dropdown;
