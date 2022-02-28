import { useEffect, useState } from "react";
import "../../css/Management.css";
import React from "react";

function EditGame({ game_id, close_edit, reload_data }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [release_date, setRelease_date] = useState("");
  const [categories, setCategories] = useState([]);
  const [game, setGame] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [reloadAll, setReloadAll] = useState(0);

  function check_error(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.status);
    }
  }

  useEffect(() => {
    fetch(`http://localhost:5000/game/categories/${game_id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        setCategories(result);
      })
      .catch((error) => {
        setError(error);
      });
    fetch(`http://localhost:5000/game/findByID/${game_id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        setGame(result[0]);
      })
      .catch((error) => {
        setError(error);
      });
    fetch(`http://localhost:5000/category/all`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        setAllCategories(result);
      })
      .catch((error) => {
        setError(error);
      });
    fetch(`http://localhost:5000/game/images/${game_id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        setImages(result);
      })
      .catch((error) => {
        setError(error);
        setImages([]);
      });
  }, [game_id, reloadAll]);

  useEffect(() => {
    if (game !== null) {
      setTitle(game.title);
      setDescription(game.description);
      setRelease_date(new Date(game.release_date).toISOString().split("T")[0]);
      setLoaded(true);
    }
  }, [game]);

  const loadBody = () => {
    if (categories.length == 0)
      return (
        <tbody>
          <tr>
            <td colSpan={3}>No categories where found for this game.</td>
          </tr>
        </tbody>
      );
    else
      return (
        <tbody>
          {categories.map((cat) => {
            return (
              <tr key={cat.category_id}>
                <td>{cat.category_id}</td>
                <td>{cat.description}</td>
                <td className="action_cols">
                  <button
                    data-flag="remove"
                    onClick={(e) => {
                      removeCategory(e, cat.category_id);
                    }}
                  >
                    Remove category
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      );
  };

  const uploadFile = (e) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    e.target.value = "";
    fetch(`http://localhost:5000/game/addImage/${game_id}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    })
      .then((res) => res.text())
      .then((result) => {
        setReloadAll((reloadAll) => reloadAll + 1);
      })
      .catch((error) => {
        setReloadAll((reloadAll) => reloadAll + 1);
      });
  };

  const deleteAttribute = (url) => {
    fetch(url, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => setReloadAll((reloadAll) => reloadAll + 1))
      .catch((error) => setError(error));
  };

  const removeImage = (e, game_id, img) => {
    e.preventDefault();
    if (e.target.dataset.flag == "delete")
      deleteAttribute(
        `http://localhost:5000/game/removeImage?gameID=${game_id}&imageName=${img}`
      );
    else {
      let button = document.createElement("button");
      button.textContent = "Cancel";
      e.target.textContent = "Confirm";
      e.target.parentNode.appendChild(button);
      button.onclick = (e) => cancel(e, "Remove image");
      e.target.dataset.flag = "delete";
    }
  };

  const loadImages = () => {
    return (
      <tbody>
        {images.map((img) => {
          return (
            <tr key={img}>
              <td className="text">{img}</td>
              <td className="image_cell">
                <img
                  src={`http://localhost:5000/static/games/${game_id}/${img}`}
                />
              </td>
              <td className="action_cols">
                <button
                  data-flag="remove"
                  onClick={(e) => {
                    removeImage(e, game_id, img);
                  }}
                >
                  Remove image
                </button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={3}>
            <input
              type="file"
              allow="image/*"
              onChange={(e) => {
                uploadFile(e);
              }}
            />
          </td>
        </tr>
      </tbody>
    );
  };

  const saveChanges = (e) => {
    e.preventDefault();
    let input_title = document.getElementsByName("title")[0];
    let input_description = document.getElementsByName("description")[1];
    let input_release_date = document.getElementsByName("release_date")[0];
    if (title === "") {
      input_title.classList.add("invalid");
      input_title.placeholder = "Required";
    } else {
      input_title.classList.remove("invalid");
      input_title.placeholder = "Game title";
    }
    if (description == "") {
      input_description.classList.add("invalid");
      input_description.placeholder = "Required";
    } else {
      e.target.classList.remove("invalid");
      e.target.placeholder = "Short game description";
    }
    if (release_date === "") {
      input_release_date.classList.add("invalid");
    } else {
      input_release_date.classList.remove("invalid");
    }
    if (title !== "" && description !== "" && release_date !== "") {
      let game = {
        id: game_id,
        title: title,
        description: description,
        release_date: release_date,
      };
      fetch(`http://localhost:5000/game/update`, {
        method: "PUT",
        credentials: "include",
        body: new URLSearchParams(game),
      })
        .then(check_error)
        .then((response) => {
          reload_data();
          close_edit();
        })
        .catch((error) => console.log(error));
    }
  };

  const addCategory = (e) => {
    e.preventDefault();
    let categorySelect = document.getElementById("category_select");
    if (
      !categories.some(
        (cat) =>
          cat.category_id ==
          categorySelect.options[categorySelect.selectedIndex].value
      )
    ) {
      fetch(
        `http://localhost:5000/game/addCategory?gameID=${game_id}&categoryID=${
          categorySelect.options[categorySelect.selectedIndex].value
        }`,
        {
          method: "POST",
          credentials: "include",
        }
      )
        .then(check_error)
        .then((result) => setReloadAll((reloadAll) => reloadAll + 1))
        .catch((error) => console.log(error));
    }
  };

  const removeCategory = (e, category_id) => {
    e.preventDefault();
    if (e.target.dataset.flag == "delete")
      deleteAttribute(
        `http://localhost:5000/game/removeCategory?gameID=${game_id}&categoryID=${category_id}`
      );
    else {
      let button = document.createElement("button");
      button.textContent = "Cancel";
      e.target.textContent = "Confirm";
      e.target.parentNode.appendChild(button);
      button.onclick = (e) => cancel(e, "Remove category");
      e.target.dataset.flag = "delete";
    }
  };

  const cancel = (e, text) => {
    e.preventDefault();
    e.target.parentNode.firstChild.dataset.flag = "remove";
    e.target.parentNode.firstChild.textContent = text;
    e.target.parentNode.removeChild(e.target.parentNode.lastChild);
  };

  if (loaded)
    return (
      <form className="management_forms">
        <div className="title_card">Edit game information</div>
        <fieldset className="management_forms_fieldset">
          <legend>Game details</legend>
          <label htmlFor="title">Game name</label>
          <input
            className="_form_input"
            type="text"
            name="title"
            placeholder="Game name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Game description</label>
          <textarea
            className="_form_input"
            type="text"
            name="description"
            placeholder="Short game description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <label htmlFor="release_date">Game creation date</label>
          <input
            className="_form_input"
            type="date"
            name="release_date"
            value={release_date}
            onChange={(e) => setRelease_date(e.target.value)}
          />

          <button className="add_btn" onClick={(e) => saveChanges(e)}>
            Save changes
          </button>
        </fieldset>
        <fieldset className="management_forms_fieldset">
          <legend>Game images</legend>
          <table className="data_table">
            <thead>
              <tr>
                <th>Filename</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            {loadImages()}
          </table>
        </fieldset>
        <fieldset className="management_forms_fieldset">
          <legend>Game categories</legend>
          <table className="data_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            {loadBody()}
          </table>
          <label htmlFor="">Add Category</label>
          {allCategories.length > 0 ? (
            <>
              <select id="category_select" className="_form_input">
                {allCategories.map((option) => {
                  return (
                    <option value={option.id} key={"option-" + option.id}>
                      {option.description}
                    </option>
                  );
                })}
              </select>
              <button
                className="add_btn"
                onClick={(e) => {
                  addCategory(e);
                }}
              >
                Add Category
              </button>
            </>
          ) : (
            <>No categories exist in the database</>
          )}
        </fieldset>
      </form>
    );
  else return <div>Fetching details</div>;
}

export default EditGame;
