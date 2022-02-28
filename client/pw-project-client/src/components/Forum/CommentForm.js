import React from "react";
import "../Management/css/Management.css";

function CommentForm({post_id, parent_id, reload}) {

  const handleSubmit = (event) => {
    event.preventDefault();
    var form = document.getElementById("formPost");
    
    var content = form['content'].value;
    
    fetch("http://localhost:5000/comment/create?postID="+post_id, {
      method: 'POST',
      body: new URLSearchParams({
        'content': content
      }),
      credentials: 'include',
    })
    .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
            form.reset();
            alert("Submitted comment");
            reload()
        } else {
          alert("Sorry but it wasn't possible to submit the comment");
        }
      })
  }

  return (
    <div>
      <div className=" title_card">Comment</div>
      <form id="formPost" className="management_forms" onSubmit={handleSubmit}>
          <label htmlFor="content">Comment:</label>
          <input type="text" id="content" className="_form_input" required/>
          <button className="add_btn" type="submit">
            Submit
          </button>
      </form>
    </div>
  );
}

export default CommentForm;
