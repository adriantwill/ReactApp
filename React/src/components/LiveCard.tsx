import temp from "../assets/temp.jpg";

function LiveCard() {
  return (
    <div className="bg-primary w-[25rem] h-[12.5rem] rounded-lg flex shadow-xl flex-shrink-0 ml-12">
      <img
        src={temp}
        alt="temperature"
        className="w-2/5 h-full object-cover rounded-l-md"
      />
      <div className="w-3/5 overflow-scroll text-sm font-light -mb-2 p-2">
        The Los Angeles Lakers have acquired Luka Doncic, sources confirm to The
        Athletic. LA is sending Anthony Davis, Max Christie and a 2029
        first-round pick to the Mavericks for Doncic, Maxi Kleber and Markieff
        Morris in a three-team deal involving the Jazz.
      </div>
    </div>
  );
}

export default LiveCard;
