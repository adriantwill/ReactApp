import "./index.css";
import Card from "./components/Players";
import Title from "./components/Title";
import frankRagnow from "./assets/frankheadshot.png";
import kevinZeitler from "./assets/kevinheadshot.png";
import peneiSewell from "./assets/peneiheadshot.png";
import taylorDecker from "./assets/taylorheadshot.png";
import grahamgLasgow from "./assets/grahamheadshot.png";
import jaredGoff from "./assets/goffheadshot.png";
import samlaporta from "./assets/samlaporta.png";
import amonrastbrown from "./assets/amonrastbrown.png";
import jamesonwilliams from "./assets/jamesonwilliams.png";
import jahmyrgibbs from "./assets/jahmyrgibbs.png";
import timpatrick from "./assets/timpatrick.png";

function App() {
  return (
    <div className=" m-auto">
      <Title teamName="Detroit Lions" />
      <div className="bg-[url('./assets/background.jpg')] bg-cover ">
        <div className="flex justify-center">
          <Card name="Williams" number={9} position="WR" image={jamesonwilliams} tailwind="top-6 mr-auto" />
          <Card name="St Brown" number={14} position="WR" image={amonrastbrown} tailwind="top-10 right-12" />
          <Card name="Decker" number={88} position="LT" image={taylorDecker} tailwind="top-6" />
          <Card name="Glasgow" number={60} position="LG" image={grahamgLasgow} tailwind="top-3" />
          <Card name="Ragnow" number={77} position="C" image={frankRagnow} />
          <Card name="Zeitler" number={71} position="RG" image={kevinZeitler} tailwind="top-3" />
          <Card name="Sewell" number={58} position="RT" image={peneiSewell} tailwind="top-6" />
          <Card name="Laporta" number={87} position="TE" image={samlaporta} tailwind="top-16" />
          <Card name="Patrick" number={81} position="WR" image={timpatrick} tailwind="top-6 ml-auto" />
        </div>
        <div className="flex justify-center">
          <Card name="Goff" number={16} position="QB" image={jaredGoff} tailwind="mb-14" />
          <div className="flex absolute ml-64 mt-8">
            <Card name="Gibbs" number={26} position="RB" image={jahmyrgibbs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
