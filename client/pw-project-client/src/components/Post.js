import "./css/Post.css"
import { Link } from 'react-router-dom'

export default function Post({ props }) {
    return (
        <div className="post">
            <img className="post_image" src={props.post_img_url} alt="" />
            <div className="post_information">
                <span className="title">
                    {props.title}
                </span>
                <div className="post_description">
                    <span className="post_span">
                        {props.comment_amount} comments
                    </span>
                    <span className="post_span">
                        Posted {props.post_date} days ago
                    </span>
                    <Link to={props.post_url} className="post_span right">
                        Link to post
                    </Link>
                </div>
            </div>
        </div>
    );
}