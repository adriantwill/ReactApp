import Card from "./components/Players";
import Title from "./components/Title";
import "./index.css";
import frankRagnow from "./assets/frankheadshot.png";
import kevinZeitler from "./assets/kevinheadshot.png";
import peneiSewell from "./assets/peneiheadshot.png";
import taylorDecker from "./assets/taylorheadshot.png";
import grahamgLasgow from "./assets/grahamheadshot.png";
import jaredGoff from "./assets/goffheadshot.png";

function App() {
  return (
    <>
      <Title />
      <div>
        <div className="flex justify-center items-center">
          <Card name="Decker" number={88} position="Left Tackle" image={taylorDecker} tailwind="top-6" />
          <Card name="Decker" number={88} position="Left Tackle" image={taylorDecker} tailwind="top-8" />
          <Card name="Decker" number={88} position="Left Tackle" image={taylorDecker} tailwind="top-6" />
          <Card name="Glasgow" number={60} position="Left Guard" image={grahamgLasgow} tailwind="top-3" />
          <Card name="Ragnow" number={77} position="Center" image={frankRagnow} />
          <Card name="Zeitler" number={71} position="Right Guard" image={kevinZeitler} tailwind="top-3" />
          <Card name="Sewell" number={58} position="Right Tackle" image={peneiSewell} tailwind="top-6" />
          <Card name="Sewell" number={58} position="Right Tackle" image={peneiSewell} tailwind="top-9" />
          <Card name="Sewell" number={58} position="Right Tackle" image={peneiSewell} tailwind="top-6" />
        </div>
        <div className="flex justify-center items-center">
          <Card name="Goff" number={16} position="Quarterback" image={jaredGoff} />
        </div>
        <div className="flex justify-center items-center">
          <Card name="Goff" number={16} position="Quarterback" image={jaredGoff} tailwind="left-30" />
        </div>
      </div>
    </>
  );
}

export default App;
