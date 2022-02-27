import { useEffect, useState } from "react";
import "../../css/Management.css";
import React from "react";

function EditGame({ game_id }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [release_date, setRelease_date] = useState("");
  const [categories, setCategories] = useState([]);
  const [game, setGame] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
  }, [game_id]);

  useEffect(() => {
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
  }, [game_id]);

  useEffect(() => {
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
  }, [game_id]);

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
                    onClick={() => {
                      setCategories(
                        categories.filter((c) => {
                          return c.category_id !== cat.category_id;
                        })
                      );
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

  const loadImages = () => {
    return (
      <tbody>
        {images.map((img) => {
          return (
            <tr key={img}>
              <td className="text">{img}</td>
              <td className="image_cell">
                <img src={img} />
              </td>
              <td className="action_cols">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setImages(
                      images.filter((i) => {
                        return i !== img;
                      })
                    );
                  }}
                >
                  Remove Image
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
                setImages([...images, URL.createObjectURL(e.target.files[0])]);
                e.target.value = "";
              }}
            />
          </td>
        </tr>
      </tbody>
    );
  };

  if (loaded)
    return (
      <form className="management_forms">
        {console.log(title)}
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
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="release_date">Game creation date</label>
          <input
            className="_form_input"
            type="date"
            name="release_date"
            value={release_date}
            onChange={(e) => setRelease_date(e.target.value)}
          />
          <label>Game images</label>
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
                  console.log(allCategories);
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
                  e.preventDefault();
                  let categorySelect =
                    document.getElementById("category_select");
                  if (
                    !categories.some(
                      (cat) =>
                        cat.category_id ==
                        categorySelect.options[categorySelect.selectedIndex]
                          .value
                    )
                  )
                    setCategories([
                      ...categories,
                      {
                        category_id:
                          categorySelect.options[categorySelect.selectedIndex]
                            .value,
                        description:
                          categorySelect.options[categorySelect.selectedIndex]
                            .text,
                      },
                    ]);
                }}
              >
                Add Category
              </button>
            </>
          ) : (
            <>Fetching categories</>
          )}
        </fieldset>
      </form>
    );
  else return <div>Loading</div>;
}

export default EditGame;
