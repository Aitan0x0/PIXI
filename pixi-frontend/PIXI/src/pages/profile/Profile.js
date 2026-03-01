import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Starback from "starback"; // npm install starback
import { UserContext } from "../../UserContext";


export default function Profile() {
    const { user, setUser } = useContext(UserContext)
    return (
        <>
            <h2 style={{marginTop:"100px"}}>Welcome to your profile page!</h2>
            <h2 style={{ marginTop: "50px", fontSize: "60px" }}> {user?.username ? `Your personal space,  ${user.username} :)` : "Your personal space :)"}</h2>

        </>
    )
}
