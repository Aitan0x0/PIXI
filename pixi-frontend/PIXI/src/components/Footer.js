import React from 'react'
import { useContext } from 'react';

import { Link } from "react-router-dom";
import { UserContext } from '../UserContext';

export default function Footer() {
    const {user , setUser} = useContext(UserContext)
  return (
    <>
       <footer>
        <div className="footer-container">
            <ul>
                <li className="logo">PI<span>X</span>I</li>
                <li>Your favorite place for games.</li>
            </ul>
            <ul>
                <li> Quick Links</li>

                {user && user.role=="user" ? <li><Link to="/profile" onClick={()=> window.scrollTo(0,0)} > Profile</Link></li> : null}
                <li><Link to="/home">Home</Link> </li>
                <li><Link to="/discountedgames"> Discounted Games</Link></li>
                <li><Link to="/populargames"> Popular Games</Link></li>
                <li><Link to="/freegames">Free Games</Link> </li>
            </ul>
            <ul>
                <li>Follow Us</li>
                <li><Link to="https://www.facebook.com" target='_blank'><i className="fa-brands fa-facebook-f"></i></Link>
                    <Link to="https://www.youtube.com" target='_blank'><i className="fa-brands fa-youtube"></i></Link>
                    <Link to="https://www.x.com" target='_blank'><i className="fa-brands fa-x-twitter"></i></Link>
                    <Link to="https://www.twitch.com" target='_blank'><i className="fa-brands fa-twitch"></i></Link>
                    <Link to="https://www.discord.com" target='_blank'><i className="fa-brands fa-discord"></i></Link>
                </li>
            </ul>

        </div>
        <div className="footer-bottom">
            <p>© 2025 <span className="mini-logo">PI<span>X</span>I</span> // Play Hard, Die Hard</p>
        </div>

    </footer></>
  )
}
