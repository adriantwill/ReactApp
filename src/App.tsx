import React from "react";
import Teams from "./pages/Teams";
import FrontPage from "./pages/FrontPage";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<FrontPage />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<Teams />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
