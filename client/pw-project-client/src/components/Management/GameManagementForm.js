import React from "react";
import GameTable from "../Table/GameTable";
import "./css/Management.css";
import CategoryTable from "../Table/CategoryTable";

function GameManagementForm() {
  return (
    <div className="management_page">
      <GameTable />
      <CategoryTable />
    </div>
  );
}

export default GameManagementForm;
