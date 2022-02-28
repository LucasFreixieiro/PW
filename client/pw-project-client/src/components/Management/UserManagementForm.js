import React, { useState } from "react";
import "./css/Management.css";
import { ToastContainer } from "../AuxilaryPages/ToastContainer";
import UserTable from "./Managers/UserManager/UserTable";
import RoleTable from "./Managers/RoleManager/RoleTable";

function UserManagementForm() {
  return (
    <div className="management_page">
      <ToastContainer />
      <UserTable />
      <RoleTable />
    </div>
  );
}

export default UserManagementForm;
