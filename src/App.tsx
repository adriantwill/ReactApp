import Card from "./components/Players";
import "./index.css";
import frankRagnow from "./assets/frankheadshot.png";
import kevinZeitler from "./assets/kevinheadshot.png";
import peneiSewell from "./assets/peneiheadshot.png";
import taylorDecker from "./assets/taylorheadshot.png";
import grahamgLasgow from "./assets/grahamheadshot.png";
import jaredGoff from "./assets/goffheadshot.png";

function App() {
  return (
    <div className="offense">
      <div className="onLine">
        <Card name="Decker" number={88} position="Left Tackle" top={"20px"} image={taylorDecker} />
        <Card name="Glasgow" number={60} position="Left Guard" top={"10px"} image={grahamgLasgow} />
        <Card name="Ragnow" number={77} position="Center" image={frankRagnow} />
        <Card name="Zeitler" number={71} position="Right Guard" top={"10px"} image={kevinZeitler} />
        <Card name="Sewell" number={58} position="Right Tackle" top={"20px"} image={peneiSewell} />
      </div>
      <div className="quarterback">
        <Card name="Goff" number={16} position="Quarterback" image={jaredGoff} />
      </div>
      <div className="runningback">
        <Card name="Goff" number={16} position="Quarterback" image={jaredGoff} />
      </div>
    </div>
  );
}

export default App;
