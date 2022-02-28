import React, { useState, useEffect } from "react";
import Post from "../Profile/Post.js";

function MainPage() {
  const [posts, setPost] = useState([]);
  //verify if all data has been loaded
  const [loaded, setLoaded] = useState(false);
  //errors from fetch
  const [error, setError] = useState(null);

  const [reloadPosts, setReloadPosts] = useState(0);

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
    fetch("http://localhost:5000/post/all", {
        method: "GET",
        mode: "cors",
        credentials: "include",
    })
    .then(check_error)
    .then((result) => {
        setPost(result);
        setLoaded(true);
    })
    .catch((error) => {
        setError(error);
        setLoaded(true);
    });
  }, [reloadPosts]);

  function reload() {
    setReloadPosts((reloadPosts) => reloadPosts + 1);
  }
  if(loaded) {
    if(error) {
      return (
        <>
          <div className=" title_card">Posts</div>
          <p>There was an error fetching from the database</p>
        </>
      );
    }
    else
      return (
        <div>
          {posts.length > 0 ? (
              posts.map((post) => <Post props={post} key={post.id} />)
            ) : (
              <div>No Posts.</div>
            )}
        </div>);
  }
  else {
    return (
      <>
        <div className=" title_card">Posts</div>
        <p>Fetching posts from db</p>
      </>
    );
  }
  
}

export default MainPage;
