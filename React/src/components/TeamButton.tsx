function TeamButton(props: {
  title: string;
  selected: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={props.onClick}
      style={{ backgroundColor: props.selected ? `#${props.color}` : "" }}
      className={`px-6 py-2 text-xl font-medium rounded-md transition-all duration-200 capitalize  ${
        props.selected ? " text-white" : "text-black hover:bg-gray-200 "
      }`}
    >
      {props.title}
    </button>
  );
}
export default TeamButton;
