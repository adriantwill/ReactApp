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
    <div className="w-11/12 h-5/6 m-auto">
      <Title teamName="Detroit Lions" />
      <div className="bg-[url('./assets/background.jpg')] bg-no-repeat bg-cover overflow-hidden">
        <div className="flex justify-center">
          <Card
            name="Decker"
            number={88}
            position="LT"
            image={taylorDecker}
            tailwind="top-6 mr-auto left-6"
          />
          <Card name="Decker" number={88} position="LT" image={taylorDecker} tailwind="top-12 right-14" />
          <Card name="Decker" number={88} position="LT" image={taylorDecker} tailwind="top-6" />
          <Card name="Glasgow" number={60} position="LG" image={grahamgLasgow} tailwind="top-3" />
          <Card name="Ragnow" number={77} position="C" image={frankRagnow} />
          <Card name="Zeitler" number={71} position="RG" image={kevinZeitler} tailwind="top-3" />
          <Card name="Sewell" number={58} position="RT" image={peneiSewell} tailwind="top-6" />
          <Card name="Sewell" number={58} position="RT" image={peneiSewell} tailwind="top-16" />
          <Card
            name="Sewell"
            number={58}
            position="RT"
            image={peneiSewell}
            tailwind="top-6 ml-auto right-6"
          />
        </div>
        <div className="flex justify-center">
          <Card name="Goff" number={16} position="QB" image={jaredGoff} tailwind="mb-14" />
          <div className="flex absolute ml-64 mt-10">
            <Card name="Goff" number={16} position="RB" image={jaredGoff} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
