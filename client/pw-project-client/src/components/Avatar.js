import "./css/Avatar.css"
import { Link } from 'react-router-dom'

function Avatar(props) {
    return (
        <Link className="avatar_link" to="/profile/">
            <div className="avatar_div">
                <span className="username">{props.username}</span>
                <img className="avatar_img" src={props.avatar_url} alt="" />
            </div>
        </Link>
    )
}

export default Avatar