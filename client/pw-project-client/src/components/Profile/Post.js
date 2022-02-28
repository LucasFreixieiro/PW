import "./css/Post.css";
import { Link } from "react-router-dom";

export default function Post({ props }) {
  let today = new Date();
  let post_date = props.created_at;
  return (
    <div className="post">
      <div className="post_description">
        <img className="post_image" src={"http://localhost:5000/static/posts/"+props.image} alt="" />
        <p className="title">{props.title}</p>
      </div>
      <div className="post_information">
        <div className="post_comment_div">
          <p className="post_paragraph">{props.total_comments} comments</p>
          <p className="post_paragraph">Posted days ago</p>
        </div>

        <Link to={"/post/"+props.id} className="post_paragraph right post_link">
          Link to post
        </Link>
      </div>
    </div>
  );
}
