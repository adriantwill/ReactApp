import logo from "./../assets/lionslogo.png";

type PlayerProp = {
  teamName: string;
};

function Title(props: PlayerProp) {
  return (
    <div className="relative bg-[#0076b6] -z-20 p-16 mt-8">
      <h1 className=" text-white font-bold text-7xl text-center">{props.teamName}</h1>
      <img
        src={logo}
        className="absolute left-2/4 top-2/4 -translate-y-1/2 -translate-x-1/2 w-1/3 -z-10 opacity-50"
      />
    </div >
  );
}
export default Title;
