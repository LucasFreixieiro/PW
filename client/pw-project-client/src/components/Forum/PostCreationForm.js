import React, { useState, useEffect } from "react";
import "../Management/css/Management.css";

function PostCreationForm() {

  //verify if all data has been loaded
  const [loaded, setLoaded] = useState(false);
  //verify if all data has been loaded
  const [games, setGames] = useState(false);
  //verify if all data has been loaded
  const [errors, setError] = useState([]);

  //verify if status is a error status
  function check_error(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
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
            setGames(result);
            setLoaded(true);
        })
        .catch((error) => {
            setError(error);
            setLoaded(true);
    });
  }, []);

  

  if(loaded){
    return (<div>
      <div className=" title_card">Create post</div>
      <form id="formPost" className="management_forms">
         <label htmlFor="txtTitulo">Title:</label>
         <input type="text" id="txtTitulo" className="_form_input"/>
         <label htmlFor="txtDescription">Description:</label>
         <input type="text" id="txtDescription" className="_form_input"/>
         <label htmlFor="image">Description:</label>
         <input type="file" id="file" className="_form_input"/>
         
      </form>
   </div>);
  }
}

export default PostCreationForm;
