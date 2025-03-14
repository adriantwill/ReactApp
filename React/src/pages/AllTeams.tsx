import Dropdown from "../components/Dropdown";
import TeamCard from "../components/TeamCard";
import InfoSubHeader from "../subcomponents/InfoSubHeader";

function AllTeams() {
  return (
    <>
      <Dropdown />
      <div className="flex justify-center gap-12">
        <div className="animate-fade-in-down">
          <InfoSubHeader text="NFC" />
          <TeamCard />
        </div>
        <div className="animate-fade-in-down">
          <InfoSubHeader text="AFC" />
          <TeamCard />
        </div>
      </div>
    </>
  );
}
export default AllTeams;
