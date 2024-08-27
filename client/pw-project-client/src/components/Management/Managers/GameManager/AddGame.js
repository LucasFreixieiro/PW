import React, { useState, useEffect } from "react";

function AddGame({ reload, closeAdd }) {
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
    var form = document.getElementById("formGame");

    var title = form["txtTitle"].value;
    var description = form["txtDescription"].value;
    var release_date = form["release_date"].value;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("release_date", release_date);
    formData.append("files", files);

    fetch("http://localhost:5000/game/create", {
      method: "POST",
      body: formData,
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
      <div className=" title_card">Add Game</div>
      <form id="formGame" className="management_forms" onSubmit={handleSubmit}>
        <label htmlFor="txtTitle">Title:</label>
        <input type="text" id="txtTitle" className="_form_input" required />
        <label htmlFor="txtDescription">Description:</label>
        <input
          type="text"
          id="txtDescription"
          className="_form_input"
          required
        />
        <label htmlFor="image">Game images:</label>

        <table className="data_table">
          <thead>
            <tr>
              <th>Filename</th>
            </tr>
          </thead>
          <tbody>
            {files.length > 0 ? (
              files.map((file) => {
                return (
                  <tr key={Math.floor(Math.random() * 1000)}>
                    <td>{file.name}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No files where added</td>
              </tr>
            )}
          </tbody>
        </table>

        <input
          type="file"
          allow="image/*"
          id="file"
          onChange={fileChange}
          className="_form_input"
          multiple
        />

        <label htmlFor="release_data">Release Date</label>
        <input
          type="date"
          name="release_date"
          id="release_date"
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

export default AddGame;
