import React from "react";
import Teams from "./pages/Teams";
import FrontPage from "./pages/FrontPage";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Rankings from "./pages/Rankings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<FrontPage />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:id" element={<Teams />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
