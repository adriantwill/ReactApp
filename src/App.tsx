import { useEffect, useState } from "react";
import "./index.css";
import Card from "./components/Players";
import Title from "./components/Title";
import Dropdown from "./components/Dropdown";

function App() {
  const [modal, setModal] = useState(false);
  const [initialUrl, setInitialUrl] = useState(
    "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/8/depthcharts"
  );
  const [teamUrl, setTeamUrl] = useState(
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/8"
  );
  const [fetchedUrl, setFetchedUrl] = useState<any>();
  const [data, setData] = useState<any[]>([]);
  const [teamData, setTeamData] = useState<any>(null);
  const positions = ["qb", "rb", "wr", "te", "lt", "lg", "c", "rg", "rt"];
  const toggleModal = () => {
    setModal(!modal);
  };
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
          for (let i = 0; i < fetchedUrl[element].athletes.length; i += 1) {
            if (
              fetchedUrl[element].athletes[i].rank == 2 ||
              fetchedUrl[element].athletes[i].rank == 3
            ) {
              const response = await fetch(
                fetchedUrl[element].athletes[i].athlete.$ref
              );
              const result = await response.json();
              allResults.push(result);
            }
          }
        }
      }
      setData(allResults);
    };

    fetchData();
  }, [fetchedUrl]);

  console.log(data);
  return (
    <>
      {modal && (
        <div className="flex items-center justify-center fixed inset-0 z-10">
          <div
            onClick={toggleModal}
            className="bg-black bg-opacity-30 w-screen h-screen absolute inset-0"
          ></div>
          <div className="relative p-8 rounded-lg bg-white w-1/2 h-2/3">
            <h2>Test</h2>
            <button
              className="absolute px-4 py-2 right-4 top-4"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div className="flex justify-center ">
          <div className="w-11/12">
            <Dropdown setTeamUrl={setTeamUrl} setInitialUrl={setInitialUrl} />
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

/*

  useEffect(() => {
    const fetchInitialUrl = async () => {
      try {
        const response = await fetch(selectUrl);
        const result = await response.json();
        setFetchedSelect(result.items);
      } catch (error) {
        console.error("Error fetching initial URL:", error);
      }
    };
    fetchInitialUrl();
  }, [selectUrl]);

  useEffect(() => {
    if (!fetchedSelect) return;

    const fetchData = async () => {
      const allResults: any[] = [];
      for (const element of fetchedSelect) {
        const response = await fetch(element.$ref);
        const result = await response.json();
        allResults.push(result);
      }
      setSelect((prevData) => [...prevData, ...allResults]);
    };

    fetchData();
  }, [fetchedSelect]);

  console.log(select);
*/
