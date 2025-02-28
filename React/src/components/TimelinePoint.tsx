import logo from "../assets/DET.webp";

function TimelinePoint(props: { index: number }) {
  return (
    <>
      {props.index > 1 && <div className="w-1 h-24 bg-black mx-auto"></div>}
      <div className="flex justify-center items-center relative">
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full justify-center relative"
            style={{ backgroundColor: `#${"0076B6"}` }}
          />
          <img src={logo} className="absolute top-0 bottom-0" />
        </div>

        <div
          className={`bg-white rounded-lg p-2 shadow-lg w-52 h-20 absolute ${
            props.index % 2 === 0 ? "translate-x-44" : "-translate-x-44"
          }`}
        >
          <p className="font-medium">{"Signs with the golden bears  "}</p>
          <p className="text-gray-500 text-right mt-1 text-sm absolute bottom-2 right-4">
            {"year"}
          </p>
        </div>
      </div>
    </>
  );
}
export default TimelinePoint;
