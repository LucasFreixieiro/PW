import sun from "./img/sun.png";
import moon from "./img/moon.png";
import dark_logo from "./img/dark_mode_logo.png";
import light_logo from './img/light_mode_logo.png';
import logout from './img/logout.png';
import './css/Navbar.css'
import Avatar from './Avatar'
import { Link, Navigate } from 'react-router-dom'
import { useUserValue } from "../UserState/UserProvider";
import React, { useState, useEffect, createContext } from "react";

function Navbar(props) {
    let color_theme = localStorage.getItem('theme-color');
    const [{ user }, dispatch] = useUserValue();

    const [perm, setPerm] = useState(0);
    function hasPermissions(controller){
        fetch('http://localhost:5000/user/hasPermission/'+controller, {
          method: 'get',
          credentials: 'include',
        })
        .then((response) => {
          if (response.status == 200) {
            setPerm(1);
          } else {
            setPerm(0);
          }
        });
    }

    return (
        <div className="navbar">
            <Link to="/">
                <div>
                    <img className="navbar_logo" src={
                        !color_theme ? light_logo :
                            color_theme === 'theme-light' ? light_logo :
                                dark_logo
                    } alt="" />
                </div>
            </Link>
            <div className="navbar_sub_items">
                {hasPermissions('game') || hasPermissions('game_categories') ? <Link to='/game_management'>Game</Link> : null}
                <Avatar avatar_url="https://avatars.dicebear.com/api/adventurer-neutral/your-cusseeedadadwadawdadadwadAtom-seed.svg" />
                {user ? (<div onClick={() => {}}>
                    <img className="" src={logout} alt="" />
                </div>) : null}
                <div onClick={() => {
                    color_theme = localStorage.getItem('theme-color')
                    color_theme === 'theme-light' ? props.handler('theme-dark') : props.handler('theme-light')
                }}>
                    <img className="dark_mode_toggle" src={
                        !color_theme ? moon :
                            color_theme === 'theme-light' ?
                                moon :
                                sun} alt="" />
                </div>
            </div>

        </div>
    )
}

export default Navbar;