import { Link } from 'react-router-dom'
import './css/GamePost.css'

export default function GamePost({ props }) {
    return (
        <div className="game_list_component">
            <img className="game_image" src={props.image_url == "" ? 'http://localhost:5000/static/games/default.png' : `http://localhost:5000/static/games/${props.id}/${props.image_url}`} alt="" />
            <div className="game_description">
                <p className="game_title">{props.title}</p>
                <p>{props.description}</p>
                {/* <Link className="game_link" to={props.game_url}>Link to game</Link> */}
            </div>
        </div>
    )

}