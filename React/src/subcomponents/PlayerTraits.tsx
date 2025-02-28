import { faGaugeHigh, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PlayerTraits() {
  return (
    <>
      <div className="flex flex-col ">
        <FontAwesomeIcon icon={faLightbulb} className="fa-2xl " />
        <p className="text-xl">Accuracy</p>
      </div>
      <div className="flex flex-col ">
        <FontAwesomeIcon icon={faGaugeHigh} className="fa-2xl " />
        <p className="text-xl">Speed</p>
      </div>
    </>
  );
}
export default PlayerTraits;
