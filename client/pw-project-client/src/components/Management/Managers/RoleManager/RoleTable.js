import React, { useState, useEffect } from "react";

function RoleTable() {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [permissionError, setPermissionError] = useState(null);
  const [target, setTarget] = useState(null);
  const [editable, setEditable] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);

  const [reloadRoles, setReloadRoles] = useState(0);

  function check_error(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.status);
    }
  }

  useEffect(() => {
    fetch("http://localhost:5000/role/", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        setData(result);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setLoaded(true);
      });
  }, [reloadRoles]);

  function reload() {
    setReloadRoles((reloadRoles) => reloadRoles + 1);
  }

  useEffect(() => {
    if (target !== null && target !== -1) add_permissions();
  }, [target]);

  const add_permissions = () => {
    let id = target;
    const elem = document.getElementById(id);
    const table = elem.parentNode.parentNode.parentNode;
    let tr = elem.parentNode.parentNode;
    let rowIndex = tr.rowIndex;
    if (permissionError) {
      let elemt = table.insertRow(rowIndex);
      let cell1 = document.createElement("td");
      cell1.textContent = "There was an error fetching from the database.";
      cell1.colSpan = 7;
      elemt.appendChild(cell1);
      elemt.classList.add("row-" + target.split("-").splice(1).join("-"));
    } else if (permissions.length == 0) {
      let elemt = table.insertRow(rowIndex);
      let cell1 = document.createElement("td");
      cell1.textContent = "This role has no permissions.";
      cell1.colSpan = 7;
      elemt.appendChild(cell1);
      elemt.classList.add("row-" + target.split("-").splice(1).join("-"));
    } else {
      let elemt = table.insertRow(rowIndex);
      elemt.classList.add("row-" + target.split("-").splice(1).join("-"));
      let cell1 = document.createElement("th");
      let cell2 = document.createElement("th");
      let cell3 = document.createElement("th");
      let cell4 = document.createElement("th");
      cell1.colSpan = 1;
      cell2.colSpan = 1;
      cell3.colSpan = 1;
      cell4.colSpan = 1;
      cell1.textContent = "ID";
      cell2.textContent = "Controller";
      cell3.textContent = "Action";
      cell4.textContent = "Description";
      elemt.appendChild(cell1);
      elemt.appendChild(cell2);
      elemt.appendChild(cell3);
      elemt.appendChild(cell4);
      rowIndex++;
      permissions.map((perm) => {
        elemt = table.insertRow(rowIndex);
        elemt.classList.add("row-" + target.split("-").splice(1).join("-"));
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let cell4 = document.createElement("td");
        cell1.colSpan = 1;
        cell2.colSpan = 1;
        cell3.colSpan = 1;
        cell4.colSpan = 1;
        cell1.textContent = perm.permissionID;
        cell2.textContent = perm.controller;
        cell3.textContent = perm.action;
        cell4.textContent = perm.description;
        elemt.appendChild(cell1);
        elemt.appendChild(cell2);
        elemt.appendChild(cell3);
        elemt.appendChild(cell4);
        rowIndex++;
      });
    }
    elem.dataset.flag = "remove";
  };

  const fetch_permissions = (id) => {
    let parent_id = id.split("-")[2];
    fetch(`http://localhost:5000/role/findPermissions/${parent_id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        setPermissions(result);
        setTarget(id);
      })
      .catch((error) => {
        setPermissionError(error);
        setTarget(id);
      });
  };

  const toggle = (e) => {
    let elem = e.target;
    let id = e.target.id;
    let parent_id = e.target.id.split("-").slice(1).join("-");
    if (elem.dataset.flag == "add") {
      fetch_permissions(id);
    } else {
      let table = elem.parentNode.parentNode.parentNode;
      let childNodes = document.getElementsByClassName(
        "row-" + parent_id
      ).length;
      console.log("row-" + parent_id, childNodes);
      let parentNode = document.getElementById(parent_id);
      let index = parentNode.rowIndex;
      console.log(parentNode);
      for (let i = 0; i < childNodes; i++) {
        table.deleteRow(index);
      }
      elem.dataset.flag = "add";
      setTarget(-1);
    }
  };

  const loadBody = () => {
    let i = 0;
    return (
      <tbody>
        {data.map((item) => {
          i++;
          return (
            <React.Fragment key={item.id}>
              <tr id={"role-" + item.id} className={i % 2 == 0 ? "even" : ""}>
                <td>{item.id}</td>
                <td colSpan={2}>{item.description}</td>
                <>
                  {item.id > 3 ? (
                    <td className="action_cols">
                      <button type="button">Delete</button>
                    </td>
                  ) : null}
                </>
                <td className="action_cols">
                  <button
                    id={`button-role-${item.id}`}
                    onClick={(e) => toggle(e)}
                    data-flag={"add"}
                  >
                    Show permissions
                  </button>
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    );
  };

  if (loaded) {
    if (error) {
      return (
        <>
          <div className="title_card">Roles</div>
          <p>There was an error fetching from the database.</p>
        </>
      );
    } else
      return (
        <div>
          <div className="title_card">Roles</div>
          <table className="data_table">
            <thead>
              <tr>
                <th>ID</th>
                <th colSpan={2}>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loadBody()}
          </table>
        </div>
      );
  } else {
    return (
      <>
        <div className="title_card">Roles</div>
        <p>Fetching roles from db</p>
      </>
    );
  }
}

export default RoleTable;
