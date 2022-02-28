import React, { useState, useEffect } from "react";
import EditGame from "./EditGame";

function GameTable() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState(null);
  const [target, setTarget] = useState(null);

  const [editable, setEditable] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);

  const [reloadGames, setReloadGames] = useState(0);

  function check_error(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.status);
    }
  }

  useEffect(() => {
    console.log("Fetching", reloadGames);
    fetch("http://localhost:5000/game/all", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        setData(result);
        console.log(result);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setLoaded(true);
      });
  }, [reloadGames]);

  function reload() {
    setReloadGames((reloadGames) => reloadGames + 1);
    console.log("Called", reloadGames);
  }

  useEffect(() => {
    if (target !== null && target !== -1) add_categories();
  }, [target]);

  const add_categories = () => {
    let id = target;
    const elem = document.getElementById(id);
    const table = elem.parentNode.parentNode.parentNode;
    let tr = elem.parentNode.parentNode;
    let rowIndex = tr.rowIndex;
    if (categoryError) {
      let elemt = table.insertRow(rowIndex);
      let cell1 = document.createElement("td");
      cell1.textContent = "There was an error fetching from the database.";
      cell1.colSpan = 7;
      elemt.appendChild(cell1);
      elemt.classList.add("row-" + id);
    } else if (categories.length == 0) {
      let elemt = table.insertRow(rowIndex);
      let cell1 = document.createElement("td");
      cell1.textContent = "This game has no categories.";
      cell1.colSpan = 7;
      elemt.appendChild(cell1);
      elemt.classList.add("row-" + id);
    } else {
      let elemt = table.insertRow(rowIndex);
      elemt.classList.add("row-" + id);
      let cell1 = document.createElement("th");
      let cell2 = document.createElement("th");
      let cell3 = document.createElement("th");
      if (window.innerWidth > 750) {
        cell1.colSpan = 2;
        cell2.colSpan = 3;
        cell3.colSpan = 2;
      } else {
        cell2.colSpan = 3;
      }
      cell1.textContent = "ID";
      cell2.textContent = "Description";
      cell3.textContent = "Actions";
      elemt.appendChild(cell1);
      elemt.appendChild(cell2);
      elemt.appendChild(cell3);
      rowIndex++;
      categories.map((cat) => {
        elemt = table.insertRow(rowIndex);
        elemt.classList.add("row-" + id);
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let remove = document.createElement("button");
        remove.textContent = "Remove";
        cell3.classList.add("action_cols");
        if (window.innerWidth > 750) {
          cell1.colSpan = 2;
          cell2.colSpan = 3;
          cell3.colSpan = 2;
        } else {
          cell2.colSpan = 3;
        }
        cell3.appendChild(remove);
        cell1.textContent = cat.category_id;
        cell2.textContent = cat.description;
        elemt.appendChild(cell1);
        elemt.appendChild(cell2);
        elemt.appendChild(cell3);
        rowIndex++;
      });
    }
    elem.dataset.flag = "remove";
  };

  const fetch_categories = (id) => {
    let parent_id = id.split("-")[1];
    fetch(`http://localhost:5000/game/categories/${parent_id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        setCategories(result);
        setTarget(id);
      })
      .catch((error) => {
        setCategoryError(error);
        setTarget(id);
      });
  };

  const toggle = (e) => {
    let elem = e.target;
    let id = e.target.id;
    let parent_id = e.target.id.split("-")[1];
    if (elem.dataset.flag == "add") {
      fetch_categories(id);
    } else {
      let table = elem.parentNode.parentNode.parentNode;
      let childNodes = document.getElementsByClassName("row-" + id).length;
      console.log(childNodes);
      let parentNode = document.getElementById(parent_id);
      let index = parentNode.rowIndex;
      for (let i = 0; i < childNodes; i++) {
        table.deleteRow(index);
      }
      elem.dataset.flag = "add";
      setTarget(-1);
    }
  };

  const showForm = (e) => {};

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
                <td>{item.title}</td>
                <td className="big_cols text">{item.description}</td>
                <td className="big_cols">
                  {new Date(item.release_date).toLocaleDateString("pt-PT")}
                </td>
                <td className="action_cols">
                  <button
                    id={`button-${item.id}`}
                    onClick={(e) => toggle(e)}
                    data-flag={"add"}
                  >
                    Show categories
                  </button>
                </td>
                <td className="action_cols">
                  <button onClick={() => editForm(item.id)}>Edit</button>
                </td>
                <td className="action_cols">
                  <button>Delete</button>
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    );
  };

  const editForm = (e) => {
    setEditable(false);
    setCurrentSelection(e);
    setEditable(true);
  };

  const loadForm = () => {
    return (
      <EditGame
        reload_data={reload}
        close_edit={hideEdit}
        key={Math.floor(Math.random() * 1000)}
        game_id={currentSelection}
      />
    );
  };

  const hideEdit = () => {
    setEditable(false);
  };

  if (loaded) {
    if (error)
      return (
        <>
          <div className=" title_card">Games</div>
          <p>There was an error fetching from the database</p>
        </>
      );
    else
      return (
        <div>
          <div className=" title_card">Games</div>
          {data.length > 0 ? (
            <table className="data_table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th className="big_cols">Description</th>
                  <th className="big_cols">Creation Date</th>
                  <th>Categories</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              {loadBody()}
            </table>
          ) : (
            <p>No games were found.</p>
          )}

          <button className="add_btn" onClick={() => showForm()}>
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
          )}
        </div>
      );
  } else {
    return (
      <>
        <div className=" title_card">Games</div>
        <p>Fetching games from db</p>
      </>
    );
  }
}

export default GameTable;
