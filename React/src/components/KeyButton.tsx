function KeyButton(props: {
  title: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={props.onClick}
      className={`px-6 py-2 text-xl font-medium rounded-lg border transition-all duration-300 transform hover:scale-105 active:scale-95 ${
        props.selected
          ? "bg-blue-500 text-white border-slate-500 hover:bg-blue-gray-700 active:bg-blue-gray-800"
          : "bg-white text-black border-gray-300 hover:border-gray-400 hover:shadow-md active:bg-gray-100"
      }`}
    >
      {props.title}
    </button>
  );
}
export default KeyButton;
