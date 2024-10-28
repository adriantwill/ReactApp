import logo from "./../assets/lionslogo.png";

type PlayerProp = {
  teamName: string;
};

function Title(props: PlayerProp) {
  return (
    <div className="relative bg-[#0076b6] p-16 mt-8 overflow-hidden flex justify-center items-center">
      <h1 className=" text-white font-bold text-7xl z-10">{props.teamName}</h1>
      <img
        src={logo}
        className="absolute w-1/3 opacity-50"
      />
    </div>
  );
}
export default Title;
