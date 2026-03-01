import React, { useContext, useEffect, useState } from "react";
import Starback from "starback"; // npm install starback
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from "../UserContext";
import ProfileImgModal from "./ProfileImgModal";

export default function ProfileLayout() {
    const {user ,setUser} = useContext(UserContext)
    const [isModalOpen, setIsModalOpen] = useState(false);

   
    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const starback = new Starback(canvas, {
            type: "dot",
            quantity: 150,
            direction: 270,
            backgroundColor: ["#0e1118", "#5c0d76ff"],
            randomOpacity: true,
        });
    }, []);
    const LogOut = () => {
        localStorage.removeItem("token")
        window.location.href = "/login"

    }

    return (
        <>
            <div className="profile-header">
                <canvas id="canvas" className="stars-profile"></canvas>
                <div className="profile-header-text">
                    <p>Profile</p>
                </div>

            </div>
            <div class="profile">
                <div className="profile-left-side">
                    <div className="profile-img" >
                        <img onClick={() => setIsModalOpen(true)} src={ user?.userImageUrl? `https://localhost:7094${user.userImageUrl}`: "/img-header/default_profile.jpg "} alt="" />

                    </div>
                    <ul className="profile-ul">
                        <li><Link to="wishlist"> Wishlist</Link></li>
                        <li><Link to="library"> Library</Link></li>
                        <li><Link to="settings">Settings</Link> </li>

                        <li className="logout-li"><button onClick={LogOut}>LOG OUT <i className="fa-solid fa-arrow-right-from-bracket"></i></button> </li>


                    </ul>
                </div>
                <div className="profile-right-side">
                    <Outlet />

                </div> </div>
<ProfileImgModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imageUrl={user?.userImageUrl} />
        </>
    )
}
