import React, { useState, useEffect } from "react";
import { useUserValue } from "../../../UserState/UserProvider";

function PermissionTable(permissions) {
    const loadBody = () => {
        let i = 0;
        return (
          <tbody>
            {permissions.map((item) => {
              i++;
              return (
                <React.Fragment key={item.id}>
                  <tr className={i % 2 == 0 ? "even" : ""}>
                    <td>{item.id}</td>
                    <td>{item.description}</td>
                    <>{item.id > 3 ?
                      <td className="action_cols">
                        <button type="button">Delete</button>
                      </td>
                    : null}</>
                    <td className="action_cols">
                        <button type="button">Show Permissions</button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        );
    };

    if(permissions.length < 1){ 
        return(
            <div>
                <div className="title_card">Permissions</div>
                <p>No data to show</p>
            </div>
        );
    } else {
        return (
            <div>
              <div className="title_card">Permissions</div>
              <table className="data_table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th colSpan={2}>Actions</th>
                  </tr>
                </thead>
                {loadBody()}
              </table>
            </div>
        );
    }
}

export default PermissionTable;