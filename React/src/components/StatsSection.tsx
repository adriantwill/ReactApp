import { IoInformationCircleOutline } from "react-icons/io5";
import { useRef, useState } from "react";

type StatsSectionProps = {
  title: string;
  stats: StatItemProps[];
};
type StatItemProps = {
  label: string;
  value: number;
};

function StatsSection(props: StatsSectionProps) {
  const [info, setInfo] = useState(false);

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <>
      {info && (
        <>
          <div
            className="fixed bg-gray-100 border border-gray-300 p-2 rounded shadow-md text-sm"
            style={{
              left: mousePosition.x + 10,
              top: mousePosition.y - 15,
              pointerEvents: "none",
            }}
          >
            Hover over a stat label to see more information.
          </div>
        </>
      )}
      <div className="shadow-[0_0_8px_0_rgba(0,0,0,0.2)] rounded-lg p-6 bg-white h-70 overflow-auto">
        <h2 className="text-2xl font-bold mb-2">{props.title}</h2>
        <div className=" overflow-auto">
          {props.stats.map((stat, index) => (
            <div
              className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0 overflow-auto"
              key={index}
            >
              <div className="flex items-center">
                <span className="text-gray-700">{stat.label}</span>
                <IoInformationCircleOutline
                  className="inline ml-2"
                  size="20"
                  onMouseOut={() => {
                    setInfo(false);
                  }}
                  onMouseOver={(e) => {
                    setInfo(true);
                    handleMouseMove(e);
                  }}
                />
              </div>
              <span className="font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default StatsSection;
