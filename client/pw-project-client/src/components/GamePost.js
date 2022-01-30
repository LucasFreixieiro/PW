import { Link } from 'react-router-dom'
import './css/GamePost.css'

export default function GamePost({ props }) {

    return (
        <div className="game_list_component">
            <img className="game_image" src={props.image_url} alt="" />
            <div className="game_description">
                <span className="game_title">{props.title}</span>
                <span>{props.description}</span>
                <Link to={props.game_url}>Link to game</Link>
            </div>
        </div>
    )

}