import React, { useState, useEffect } from "react";
import EditUser from "./EditUser";

function UserTable(){
    //state to populate table
    const [data, setData] = useState([]);
    //verify if all data has been loaded
    const [loaded, setLoaded] = useState(false);
    //errors from fetch
    const [error, setError] = useState(null);

    //state to know if we're in edit mode
    const [editable, setEditable] = useState(false);
    //current row selected
    const [currentSelection, setCurrentSelection] = useState(null);
    const [currentRoleSelection, setRoleCurrentSelection] = useState(null);

    const [reloadUsers, setReloadUsers] = useState(0);

    //verify if status is a error status
    function check_error(response) {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.status);
        }
      }
    
    //request user to API
    useEffect(() => {
        fetch("http://localhost:5000/user/", {
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
    }, [reloadUsers]);

    function reload() {
        setReloadUsers((reloadUser) => reloadUser + 1);
      }

    //toogle states when edit button is clicked
    //with this we will have 2 buttons
    //one is for confirmation and the other is for cancel edit
    const editForm = (e, role) => {
        setEditable(false);
        setCurrentSelection(e);
        setRoleCurrentSelection(role);
        setEditable(true);
    };

    const loadForm = () => {
        return (
          <EditUser
            reload_data={reload}
            close_edit={hideEdit}
            key={Math.floor(Math.random() * 1000)}
            user_id={currentSelection}
            oldRoleID={currentRoleSelection}
          />
        );
      };

    const hideEdit = () => {
        setEditable(false);
    };

    const deleteAttribute = (url) => {
        fetch(url, {
          method: "DELETE",
          mode: "cors",
          credentials: "include",
        })
          .then(check_error)
          .then((result) => setReloadUsers((reloadUsers) => reloadUsers + 1))
          .catch((error) => setError(error));
      };

      const cancel = (e, text) => {
        e.preventDefault();
        e.target.parentNode.firstChild.dataset.flag = "remove";
        e.target.parentNode.firstChild.textContent = text;
        e.target.parentNode.removeChild(e.target.parentNode.lastChild);
      };
    
      const removeUser = (e, user_id) => {
        e.preventDefault();
        if (e.target.dataset.flag == "delete")
          deleteAttribute(
            `http://localhost:5000/user/delete/${user_id}`
          );
        else {
          let button = document.createElement("button");
          button.textContent = "Cancel";
          e.target.textContent = "Confirm";
          e.target.parentNode.appendChild(button);
          button.onclick = (e) => cancel(e, "Remove");
          e.target.dataset.flag = "delete";
        }
      };

    //load data in table
      const loadBody = () => {
        let i = 0;
        return (
          <tbody>
            {data.map((item) => {
              console.log("Reloading data");
              i++;
              return (
                <React.Fragment key={item.id}>
                  <tr id={item.id} className={i % 2 == 0 ? "even" : ""}>
                    <td>{item.id}</td>
                    <td>{item.nickname}</td>
                    <td className="big_cols text">{item.email}</td>
                    <td className="big_cols">
                      {new Date(item.joined).toLocaleDateString("pt-PT")}
                    </td>
                    <td>{item.role}</td> 
                    <td className="action_cols">
                      <button onClick={() => editForm(item.id, item.role_id)}>Edit</button>
                    </td>
                    <td className="action_cols">
                        <button
                            data-flag="remove"
                            onClick={(e) => {
                                removeUser(e, item.id);
                            }}
                            >
                            Remove
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
        if (error)
          return (
            <>
              <div className=" title_card">Users</div>
              <p>There was an error fetching from the database</p>
            </>
          );
        else
          return (
            <div>
              <div className=" title_card">Users</div>
              {data.length > 0 ? (
                <table name="user_table" className="data_table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nickname</th>
                      <th className="big_cols">Email</th>
                      <th className="big_cols">Join</th>
                      <th>Role</th>
                      <th colSpan={2}>Actions</th>
                    </tr>
                  </thead>
                  {loadBody()}
                </table>
              ) : (
                <p>No Users were found.</p>
              )}
              {editable ? (
                    <>
                    <button className="add_btn" onClick={() => hideEdit()}>
                        Close edit form
                    </button>
                    {loadForm()}
                    </>
                ) : (
                    <></>
                )}
    
              {/*<button className="add_btn" onClick={() => reload()}>
                Add
              </button>
              {editable ? (
                <>
                  <button className="add_btn" onClick={() => hideEdit()}>
                    Close edit form
                  </button>
                  {loadForm()}
                </>
              ) : (
                <></>
              )}*/}
            </div>
          );
      } else {
        return (
          <>
            <div className=" title_card">Users</div>
            <p>Fetching users from db</p>
          </>
        );
      }
}

export default UserTable;