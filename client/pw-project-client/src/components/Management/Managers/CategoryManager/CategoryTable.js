import React, { useState, useEffect } from "react";
import { useUserValue } from "../../../UserState/UserProvider";
import AddCategory from "./AddCategory";

function CategoryTable({ updateAll }) {
  const [{ user }, dispatch] = useUserValue();
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);
  const [add, setAdd] = useState(false);

  function check_error(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      if (response.status == 403) {
        dispatch({ type: "logout" });
      }
      throw Error(response.status);
    }
  }

  useEffect(() => {
    fetch("http://localhost:5000/category/all", {
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
  }, [reload]);

  const deleteCategory = (e, id) => {
    e.preventDefault();
    if (e.target.dataset.flag == "delete")
      fetch(`http://localhost:5000/category/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      }).then(() => updateAll());
    else {
      let button = document.createElement("button");
      button.textContent = "Cancel";
      e.target.textContent = "Confirm";
      e.target.parentNode.appendChild(button);
      button.onclick = (e) => cancel(e, "Delete");
      e.target.dataset.flag = "delete";
    }
  };

  const cancel = (e, text) => {
    e.preventDefault();
    e.target.parentNode.firstChild.dataset.flag = "remove";
    e.target.parentNode.firstChild.textContent = text;
    e.target.parentNode.removeChild(e.target.parentNode.lastChild);
  };

  const loadBody = () => {
    let i = 0;
    return (
      <tbody>
        {data.map((item) => {
          i++;
          return (
            <React.Fragment key={item.id}>
              <tr
                id={"category-" + item.id}
                className={i % 2 == 0 ? "even" : ""}
              >
                <td>{item.id}</td>
                <td>{item.description}</td>

                <td className="action_cols">
                  <button
                    type="button"
                    onClick={(e) => deleteCategory(e, item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    );
  };

  const closeAdd = () => {
    setAdd(false);
  };

  const loadAddForm = () => {
    return (
      <AddCategory
        reload={() => setReload((reload) => reload + 1)}
        closeAdd={closeAdd}
      />
    );
  };

  if (loaded) {
    if (error) {
      return (
        <>
          <div className="title_card">Categories</div>
          <p>There was an error fetching from the database.</p>
        </>
      );
    } else
      return (
        <div>
          <div className="title_card">Categories</div>
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
          <button
            className="add_btn"
            onClick={add ? () => setAdd(false) : () => setAdd(true)}
          >
            {add ? "Close form" : "Add new category"}
          </button>
          {add ? loadAddForm() : <></>}
        </div>
      );
  } else {
    return (
      <>
        <div className="title_card">Categories</div>
        <p>Fetching categories from db</p>
      </>
    );
  }
}

export default CategoryTable;
