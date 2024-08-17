import Card from "./Players";
import "./index.css";
import frankRagnow from "./assets/frankragnow.jpeg";
import kevinZeitler from "./assets/kevinzeitler.jpg";
import peneiSewell from "./assets/peneisewell.jpg";
import taylorDecker from "./assets/taylordecker.jpg";
import grahamgLasgow from "./assets/grahamglasgow.jpg";

export default function App() {
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
        <Card name="Sewell" number={58} position="Right Tackle" image={peneiSewell} />
      </div>
    </div>
  );
}
