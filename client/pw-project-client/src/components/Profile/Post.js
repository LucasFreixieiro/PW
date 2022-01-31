import "./css/Post.css"
import { Link } from 'react-router-dom'

export default function Post({ props }) {
    return (
        <div className="post">
            <div className="post_description">

                <img className="post_image" src={props.post_img_url} alt="" />
                <p className="title">
                    {props.title}
                </p>
            </div>
            <div className="post_information">
                <div className="post_comment_div">
                    <p className="post_paragraph">
                        {props.comment_amount} comments
                    </p>
                    <p className="post_paragraph">
                        Posted {props.post_date} days ago
                    </p>
                </div>

                <Link to={props.post_url} className="post_paragraph right post_link">
                    Link to post
                </Link>
            </div>
        </div>
    );
}