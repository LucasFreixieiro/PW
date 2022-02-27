import React, { useState, useEffect } from "react";
import { useUserValue } from "../../../UserState/UserProvider";

function CategoryTable() {
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
  }, []);

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
                <td>{item.description}</td>
                <td className="action_cols">
                  <button type="button">Edit</button>
                </td>
                <td className="action_cols">
                  <button type="button">Delete</button>
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
