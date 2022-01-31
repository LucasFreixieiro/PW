import "./css/Avatar.css"
import { Link } from 'react-router-dom'

function Avatar(props) {
    return (
        <div className="avatar_div">
            <Link className="avatar_link" to='/profile/'>
                <span className="username">{props.username}</span>
            </Link>
            <img className="avatar_img" src={props.avatar_url} alt="" />
        </div>

    )
}

export default Avatar