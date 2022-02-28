import React, { useState } from "react";
import GameTable from "./Managers/GameManager/GameTable";
import "./css/Management.css";
import CategoryTable from "./Managers/CategoryManager/CategoryTable";
import { ToastContainer } from "../AuxilaryPages/ToastContainer";

function GameManagementForm() {
  return (
    <div className="management_page">
      <ToastContainer />
      <GameTable />
      <CategoryTable />
    </div>
  );
}

export default GameManagementForm;
