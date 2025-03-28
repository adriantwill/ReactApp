import Dropdown from "../components/Dropdown";
import TeamCard from "../components/TeamCard";
import InfoSubHeader from "../subcomponents/InfoSubHeader";
import { Database } from "../lib/database.types";
import { supabase } from "../supabase-client";
import { useQuery } from "@tanstack/react-query";
import MainPageTitle from "../subcomponents/MainPageTitle";

type Team = Database["public"]["Tables"]["Team"]["Row"];

function AllTeams() {
  const fetchNfcTeams = async () => {
    const { data, error } = await supabase
      .from("Team")
      .select("*")
      .in("division", ["NFC North", "NFC South", "NFC East", "NFC West"]);
    if (error) {
      console.log("error", error);
      throw error;
    }
    return data;
  };

  const {
    data: NfcTeams,
    isLoading,
    isError,
  } = useQuery<Team[]>({
    queryKey: ["nfcTeams"],
    queryFn: fetchNfcTeams,
  });
  const fetchAfcTeams = async () => {
    const { data, error } = await supabase
      .from("Team")
      .select("*")
      .in("division", ["AFC North", "AFC South", "AFC East", "AFC West"]);
    if (error) {
      console.log("error", error);
      throw error;
    }
    return data;
  };
  const { data: AfcTeams } = useQuery<Team[]>({
    queryKey: ["afcTeams"],
    queryFn: fetchAfcTeams,
  });
  if (isLoading) {
    return <div className="text-center p-10">Loading teams...</div>;
  }
  if (isError || !NfcTeams || !AfcTeams) {
    return (
      <div className="text-center p-10 text-red-500">Error loading teams!</div>
    );
  }
  console.log(NfcTeams);
  console.log(AfcTeams);
  return (
    <>
      <Dropdown />
      <div className="animate-fade-in-down bg-primary">
        <MainPageTitle title="Teams" />
        <div className="flex justify-center gap-20">
          <div className="">
            <InfoSubHeader text="NFC" />
            <div className="flex flex-col gap-10">
              {NfcTeams.map((team: Team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </div>
          <div className="">
            <InfoSubHeader text="AFC" />
            <div className="flex flex-col gap-10">
              {AfcTeams.map((team: Team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AllTeams;
