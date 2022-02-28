import { Link } from "react-router-dom";

export default function Comment({ props }) {
    let today = new Date();
    let post_date = props.created_at;
    return (
      <div className="comment">
        <div className="comment_avatar">
          <img className="post_image" src={"http://localhost:5000/static/pfp/"+props.avatar} alt="" />
          <Link to={'/profile/'+props.user_id}>{props.nickname}</Link>
        </div>
        <div className="comment_information">
          <div className="comment_div">
            <p className="comment_paragraph">{props.content}</p>
          </div>
        </div>
      </div>
    );
  }
  