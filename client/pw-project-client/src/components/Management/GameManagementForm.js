import React, { useState } from "react";
import GameTable from "./Managers/GameManager/GameTable";
import "./css/Management.css";
import CategoryTable from "./Managers/CategoryManager/CategoryTable";
import { useUserValue } from "../UserState/UserProvider";
import { Navigate } from "react-router-dom";

function GameManagementForm() {
  const [reload, setReload] = useState(0);
  const [{ user }, dispatch] = useUserValue();
  if (user.role_id !== 1) {
    return <Navigate replace="true" to={`/403`} />;
  }

  const update = () => {
    setReload((reload) => reload + 1);
  };

  return (
    <div className="management_page">
      <GameTable key={Math.floor(Math.random() * 1000)} updateAll={update} />
      <CategoryTable
        key={Math.floor(Math.random() * 1000)}
        updateAll={update}
      />
    </div>
  );
}

export default GameManagementForm;
