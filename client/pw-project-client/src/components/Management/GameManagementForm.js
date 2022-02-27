import React from "react";
import GameTable from "./Managers/GameManager/GameTable";
import "./css/Management.css";
import CategoryTable from "./Managers/CategoryManager/CategoryTable";

function GameManagementForm() {
  return (
    <div className="management_page">
      <GameTable />
      <CategoryTable />
    </div>
  );
}

export default GameManagementForm;
