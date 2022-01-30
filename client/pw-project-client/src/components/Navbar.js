import sun from "./img/sun.png";
import moon from "./img/moon.png";
import dark_logo from "./img/dark_mode_logo.png";
import light_logo from './img/light_mode_logo.png';
import './css/Navbar.css'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

function Navbar(props) {
    let color_theme = localStorage.getItem('theme-color')
    return (
        <div className="navbar">
            <Link to="/">
                <div>
                    <img className="navbar_logo" src={color_theme === 'theme-light' ? light_logo : dark_logo} alt="" />
                </div>
            </Link>
            <div className="navbar_sub_items">
                <Avatar avatar_url="https://avatars.dicebear.com/api/adventurer-neutral/your-cusseeedadadwadawdadadwadAtom-seed.svg" username="Dummy" />

                <div onClick={() => color_theme === 'theme-light' ? props.handler('theme-dark') : props.handler('theme-light')}>
                    <img className="dark_mode_toggle" src={color_theme === 'theme-light' ? moon : sun} alt="" />
                </div>
            </div>

        </div>
    )
}

export default Navbar;