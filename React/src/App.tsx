import Teams from "./pages/Teams";
import FrontPage from "./pages/FrontPage";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Rankings from "./pages/Rankings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Players from "./pages/Players";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<FrontPage />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<Teams />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:id" element={<Players />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
