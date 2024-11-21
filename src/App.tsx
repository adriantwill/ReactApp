import { useEffect, useState } from "react";
import "./index.css";
import Card from "./components/Players";
import Title from "./components/Title";
import Dropdown from "./components/Dropdown";
import Modal from "./components/Modal";

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
  const [currentPlayer, setCurrentPlayer] = useState<any>(null);
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
        console.log("team");
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
        console.log(element);

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

  return (
    <>
      {modal && (
        <Modal
          toggleModal={toggleModal}
          team={teamData}
          player={currentPlayer}
        ></Modal>
      )}
      {data.length > 0 && teamData && (
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
                  setCurrentPlayer={() => setCurrentPlayer(data[3])}
                />
                <Card
                  team={teamData}
                  data={data[4]}
                  tailwind="top-10 right-10"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[4])}
                />
                <Card
                  team={teamData}
                  data={data[6]}
                  tailwind="top-6"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[6])}
                />
                <Card
                  team={teamData}
                  data={data[7]}
                  tailwind="top-3"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[7])}
                />
                <Card
                  team={teamData}
                  data={data[8]}
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[8])}
                />
                <Card
                  team={teamData}
                  data={data[9]}
                  tailwind="top-3"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[9])}
                />
                <Card
                  team={teamData}
                  data={data[10]}
                  tailwind="top-6"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[10])}
                />
                <Card
                  team={teamData}
                  data={data[5]}
                  tailwind="top-16"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[5])}
                />
                <Card
                  team={teamData}
                  data={data[2]}
                  tailwind="top-6 ml-auto"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[2])}
                />
              </div>
              <div className="flex justify-center">
                <Card
                  team={teamData}
                  data={data[0]}
                  tailwind="mb-14"
                  handleClick={toggleModal}
                  setCurrentPlayer={() => setCurrentPlayer(data[0])}
                />
                <div className="flex absolute ml-64 mt-8">
                  <Card
                    team={teamData}
                    data={data[1]}
                    handleClick={toggleModal}
                    setCurrentPlayer={() => setCurrentPlayer(data[1])}
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
