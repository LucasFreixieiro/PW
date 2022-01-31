import { useParams } from 'react-router-dom';
import './css/Profile.css'
import ProfileGameList from "./ProfileGameList";
import ProfilePostList from "./ProfilePostList";
import ProfileSummary from "./ProfileSummary";

let player = {
    "player_id": 1,
    "player_name": "Dummy",
    "image_url": "https://avatars.dicebear.com/api/adventurer-neutral/your-cusseeedadadwadawdadadwadAtom-seed.svg",
    "posts": [
        {
            "id": 1,
            "title": "Thread Title",
            "comment_amount": 20,
            "post_date": 20,
            "post_img_url": "https://via.placeholder.com/1920x1080.png?text=Placeholder"
            , "post_url": "/profile/" //change this to the game page link later
        },
        {
            "id": 2,
            "title": "Another Thread Title",
            "comment_amount": 30,
            "post_date": 20,
            "post_img_url": "https://via.placeholder.com/1920x1080.png?text=Placeholder"
            , "post_url": "/profile/" //change this to the game page link later
        }
    ],
    "games":
        [
            {
                "title": "Game 1",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis",
                "image_url": "https://via.placeholder.com/1920x1080.png?text=Placeholder",
                "game_url": "/profile/" //change this to the game page link later
            },
            {
                "title": "Game 2",
                "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem perspiciatis dolor quod, saepe quas autem esse illo laboriosam obcaecati quasi ipsa inventore nam? Consequuntur veritatis nostrum, facere dolore modi pariatur.",
                "image_url": "https://via.placeholder.com/1920x1080.png?text=Placeholder",
                "game_url": "/profile/" //change this to the game page link later
            }
        ]
}
let player2 = {
    "player_id": 3,
    "player_name": "Dummy3",
    "image_url": "https://avatars.dicebear.com/api/adventurer-neutral/your-cusseeedadadwadawdadadwadAtom-seed.svg",
    "posts": [],
    "games": []
}

function Profile() {
    return (
        <div className="profile_page">
            <ProfileSummary props={player} />
            <ProfileGameList props={player} />
            <ProfilePostList props={player} />
        </div>
    )
}

export default Profile