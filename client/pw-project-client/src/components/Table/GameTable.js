import React, { useState, useEffect } from "react";
import { useUserValue } from "../UserState/UserProvider";

function GameTable() {
  const [{ user }, dispatch] = useUserValue();
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

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
    fetch("http://localhost:5000/game/all", {
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
  }, []);

  const toggle_visible = (id) => {
    let rows = document.querySelectorAll(".child-" + id);
    console.log(rows);
    rows.forEach((row) => row.classList.toggle("visible"));
  };

  const categories = [
    { id: 1, description: "cat1" },
    { id: 2, description: "cat2" },
  ];

  const loadBody = () => {
    let i = 0;
    return (
      <tbody>
        {data.map((item) => {
          i++;
          return (
            <React.Fragment key={item.id}>
              <tr className={i % 2 == 0 ? "even" : ""}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{new Date(item.release_date).toLocaleDateString()}</td>
                <td className="action_cols">
                  <button type="button" onClick={() => toggle_visible(item.id)}>
                    Show categories
                  </button>
                </td>
                <td className="action_cols">
                  <button type="button">Edit</button>
                </td>
                <td className="action_cols">
                  <button type="button">Delete</button>
                </td>
              </tr>
              <tr className={`child child-${item.id}`}>
                <th colSpan={2}>ID</th>
                <th colSpan={3}>Description</th>
                <th colSpan={2}>Action</th>
              </tr>
              {categories.map((cat) => {
                console.log(cat);
                return (
                  <tr
                    key={`key${item.id}-cat${cat.id}`}
                    className={`child child-${item.id}`}
                  >
                    <td colSpan={2}>{cat.id}</td>
                    <td colSpan={3}>{cat.description}</td>
                    <td colSpan={2} className="action_cols">
                      <button type="button">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          );
        })}
      </tbody>
    );
  };

  if (loaded) {
    console.log(data);
    return (
      <div>
        <table className="data_table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Creation Date</th>
              <th>Categories</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          {loadBody()}
        </table>
      </div>
    );
  } else {
    return "Loading";
  }
}

export default GameTable;
