import { useEffect, useState } from "react";
import "./index.css";
import Card from "./components/Players";
import Title from "./components/Title";

function App() {
  const [modal, setModal] = useState(false);
  const [initialUrl] = useState(
    "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/8/depthcharts"
  );
  const [teamUrl] = useState(
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/8"
  );
  const [fetchedUrl, setFetchedUrl] = useState();
  const [data, setData] = useState<any[]>([]);
  const [teamData, setTeamData] = useState<any>(null);
  const positions = ["qb", "rb", "wr", "te", "lt", "lg", "c", "rg", "rt"];
  const toggleModal = () => {
    setModal(!modal);
  };
  useEffect(() => {
    const fetchInitialUrl = async () => {
      try {
        const response = await fetch(initialUrl);
        const result = await response.json();
        setFetchedUrl(result.items[2].positions);
      } catch (error) {
        console.error("Error fetching initial URL:", error);
      }
    };
    fetchInitialUrl();
  }, [initialUrl]);

  useEffect(() => {
    const fetchTeamUrl = async () => {
      try {
        const response = await fetch(teamUrl);
        const result = await response.json();
        setTeamData(result.team);
      } catch (error) {
        console.error("Error fetching initial URL:", error);
      }
    };
    fetchTeamUrl();
  }, [teamUrl]);

  useEffect(() => {
    if (!fetchedUrl) return;

    const fetchData = async () => {
      const allResults: any[] = [];
      for (const element of positions) {
        const response = await fetch(
          fetchedUrl[element].athletes[0].athlete.$ref
        );
        const result = await response.json();
        allResults.push(result);
        if (element === "wr") {
          for (let i = 3; i < 6; i += 2) {
            if (fetchedUrl[element].athletes[i]) {
              const response = await fetch(
                fetchedUrl[element].athletes[i].athlete.$ref
              );
              const result = await response.json();
              allResults.push(result);
            }
          }
        }
      }
      setData((prevData) => [...prevData, ...allResults]);
    };

    fetchData();
  }, [fetchedUrl]);

  return (
    <>
      {modal && (
        <div className="w-full h-full">
          <h1>Test</h1>
          <button onClick={toggleModal}>Close</button>
        </div>
      )}
      {data.length > 0 && (
        <div className="flex justify-center ">
          <div className="w-11/12">
            <Title teamName={teamData} />
            <div className="bg-[url('./assets/background.jpg')] bg-cover bg-center">
              <div className="flex justify-center">
                <Card
                  team={teamData}
                  data={data[3]}
                  tailwind="top-6 mr-auto"
                  handleClick={toggleModal}
                />
                <Card
                  team={teamData}
                  data={data[4]}
                  tailwind="top-10 right-10"
                  handleClick={toggleModal}
                />
                <Card
                  team={teamData}
                  data={data[6]}
                  tailwind="top-6"
                  handleClick={toggleModal}
                />
                <Card
                  team={teamData}
                  data={data[7]}
                  tailwind="top-3"
                  handleClick={toggleModal}
                />
                <Card
                  team={teamData}
                  data={data[8]}
                  handleClick={toggleModal}
                />
                <Card
                  team={teamData}
                  data={data[9]}
                  tailwind="top-3"
                  handleClick={toggleModal}
                />
                <Card
                  team={teamData}
                  data={data[10]}
                  tailwind="top-6"
                  handleClick={toggleModal}
                />
                <Card
                  team={teamData}
                  data={data[5]}
                  tailwind="top-16"
                  handleClick={toggleModal}
                />
                <Card
                  team={teamData}
                  data={data[2]}
                  tailwind="top-6 ml-auto"
                  handleClick={toggleModal}
                />
              </div>
              <div className="flex justify-center">
                <Card
                  team={teamData}
                  data={data[0]}
                  tailwind="mb-14"
                  handleClick={toggleModal}
                />
                <div className="flex absolute ml-64 mt-8">
                  <Card
                    team={teamData}
                    data={data[1]}
                    handleClick={toggleModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
