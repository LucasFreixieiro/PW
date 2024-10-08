import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserValue } from "../UserState/UserProvider";
import { Navigate } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./css/Comment.css";

function PostPage() {
  const id = useParams().id;
  const [{ user }, dispatch] = useUserValue();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [voters, setVoters] = useState([]);

  const [loaded, setLoaded] = useState(false);
  //errors from fetch
  const [error, setError] = useState(null);

  const [reloadPosts, setReloadPosts] = useState(0);
  const [reloadComments, setReloadComments] = useState(0);
  const [reloadVoters, setReloadVoters] = useState(0);

  //verify if status is a error status
  function check_error(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.status);
    }
  }

  //request post to API
  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:5000/post/findByID/${id}}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        console.log(result);
        setPost(result[0]);
      })
      .catch((error) => {
        setError(error);
      });
    fetch(`http://localhost:5000/post/findAllVoters/${id}}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        console.log(result);
        setVoters(result);
        if (voters.length > 0) {
          var resultv = voters.filter((obj) => {
            return obj.user_id === user.id;
          });
          console.log(resultv);
          if (resultv[0].reaction_id == 1) {
            console.log("aqui");
            document.getElementById("upVote").style("color: blue");
          } else if (resultv[0].reaction_id == 2) {
            document.getElementById("downVote").style("color: orange");
          }
        }
      })
      .catch((error) => {
        setError(error);
      });
    console.log(id);
    fetch(`http://localhost:5000/post/findAllComments/${id}}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(check_error)
      .then((result) => {
        console.log(result);
        setComments(result);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setLoaded(true);
      });
  }, [reloadPosts, reloadComments]);

  if (loaded) {
    if (error) {
      return (
        <>
          <div className=" title_card">Post</div>
          <p>There was an error fetching from the database</p>
        </>
      );
    }
    return (
      <div className="post_page">
        {post != null ? (
          <>
            <h1 className="title_card">{post.title}</h1>
            <article>
              <p>{post.description}</p>
              {post.image != "" ? (
                <img
                  src={"http://localhost:5000/static/posts/" + post.image}
                  alt="Image"
                />
              ) : null}
            </article>
          </>
        ) : (
          <Navigate replace="true" to="/404"></Navigate>
        )}

        <CommentForm post_id={id} reload={setReloadComments}></CommentForm>

        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment props={comment} key={comment.id} />
          ))
        ) : (
          <div>No Comments.</div>
        )}
      </div>
    );
  } else {
    return (
      <>
        <div className=" title_card">Post</div>
        <p>Fetching posts from db</p>
      </>
    );
  }
}

export default PostPage;
