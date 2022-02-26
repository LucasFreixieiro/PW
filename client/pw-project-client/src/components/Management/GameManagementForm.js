import React from "react";
import GameTable from "../Table/GameTable";
import "./css/Management.css";

function GameManagementForm() {
  return (
    <div className="management_page">
      <div className=" title_card">Games</div>
      <GameTable tablename="games" />
    </div>
  );
}

export default GameManagementForm;
