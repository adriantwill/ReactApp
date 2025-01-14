import React, { useState } from "react";
import Dropdown from "../components/Dropdown";
import LiveCard from "../components/LiveCard";

function FrontPage() {
  return (
    <>
      <Dropdown />
      <div className="m-4">
        Live
        <div className="overflow-scroll flex">
          <LiveCard></LiveCard>
          <LiveCard></LiveCard>
        </div>
      </div>
    </>
  );
}

export default FrontPage;
