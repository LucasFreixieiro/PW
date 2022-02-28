import React, { useState, useEffect } from "react";

function AddCategory({ reload, closeAdd }) {
  //verify if all data has been loaded
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  //verify if all data has been loaded
  const [games, setGames] = useState([]);
  const [files, setFiles] = useState([]);

  //verify if status is a error status
  function check_error(response) {
    if (response.status >= 200 && response.status <= 299) {
      try {
        JSON.parse(response);
        return response.json();
      } catch {
        return response.text();
      }
    } else {
      throw Error(response.status);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var form = document.getElementById("formCategory");

    fetch("http://localhost:5000/category/create", {
      method: "POST",
      body: new URLSearchParams({ description: form["txtDescription"].value }),
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        reload();
        closeAdd();
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setLoaded(true);
      });
  };

  const fileChange = (event) => {
    let new_files = event.target.files;
    for (let file of new_files) {
      setFiles((files) => [...files, file]);
    }
    event.target.value = "";
  };

  return (
    <div>
      <div className=" title_card">Add category</div>
      <form
        id="formCategory"
        className="management_forms"
        onSubmit={handleSubmit}
      >
        <label htmlFor="txtDescription">Description:</label>
        <input
          type="text"
          id="txtDescription"
          className="_form_input"
          required
        />
        <button className="add_btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
