import React, { useState, useEffect } from "react";
import "../Management/css/Management.css";

function PostCreationForm() {
  //verify if all data has been loaded
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  //verify if all data has been loaded
  const [games, setGames] = useState([]);
  const [files, setFiles] = useState(null);

  const [reloadAll, setReloadAll] = useState(0);

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
    fetch("http://localhost:5000/game/all", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        setGames(result);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setLoaded(true);
      });
  }, [reloadAll]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var form = document.getElementById("formPost");

    var title = form["txtTitle"].value;
    var description = form["txtDescription"].value;
    var game_id = form["game_select"].value;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", files);
    formData.append("game_id", game_id);

    fetch("http://localhost:5000/post/create", {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        form.reset();
        alert("Submitted post");
      })
      .catch((error) => {
        setError(error);
        setLoaded(true);
      });
  };

  const fileChange = (event) => {
    const files = event.target.files[0];
    setFiles(files);
  };

  if (loaded) {
    if (error)
      return (
        <>
          <div className="title_card">Users</div>
          <p>There was an error fetching from the database</p>
        </>
      );
    else
      return (
        <div className="post_form">
          <div className="title_card">Create post</div>
          <form
            id="formPost"
            className="management_forms"
            onSubmit={handleSubmit}
          >
            <label htmlFor="txtTitle">Title:</label>
            <input type="text" id="txtTitle" className="_form_input" required />
            <label htmlFor="txtDescription">Description:</label>
            <input
              type="text"
              id="txtDescription"
              className="_form_input"
              required
            />
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              allow="image/*"
              id="file"
              onChange={fileChange}
              className="_form_input"
            />
            {games.length > 0 ? (
              <>
                <select id="game_select" className="_form_input required">
                  {games.map((option) => {
                    return (
                      <option value={option.id} key={"option-" + option.id}>
                        {option.title}
                      </option>
                    );
                  })}
                </select>
              </>
            ) : (
              <>Fetching games</>
            )}
            <button className="add_btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      );
  } else {
    return (
      <>
        <div className=" title_card">Games</div>
        <p>Fetching data from db</p>
      </>
    );
  }
}

export default PostCreationForm;
