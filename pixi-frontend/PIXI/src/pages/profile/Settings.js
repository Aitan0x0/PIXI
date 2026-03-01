import React, { useState, useContext , useEffect } from 'react'
import { UserContext } from '../../UserContext';
import axios from "axios"

export default function Settings() {
  const { user, setUser } = useContext(UserContext);
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [showPassword3, setShowPassword3] = useState(false)

  const [email, setEmail] = useState(user?.email || "...")
  const [username, setUsername] = useState(user?.username || "...")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [img, setImg] = useState(null)

useEffect(() => {
  if (user){
 setUsername(user.username);
   setEmail(user.email);

  }
}, [user]);
// console.log("Bearer " + localStorage.getItem("token"))
const submitFunk = async (e) => {
  e.preventDefault();

  const userData = new FormData();
  userData.append("username", username);
  userData.append("email", email);
  userData.append("oldPassword", oldPassword);


  if (newPassword) {
    userData.append("newPassword", newPassword);
    userData.append("yoxlaPassword", confirmPassword);
  }

  if (img) userData.append("userImg", img);

  try {
    const { data } = await axios.put(
      "https://localhost:7094/api/users/settings",
      userData,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data"
        }
      }
    );
    setUser(data);
    alert("Profil uğurla dəyişdirildi");
  } catch (err) {
    console.error("error", err.response?.data || err.message);
    alert("Profil yenilənmədi");
  }
};


  return (
    <>
      <h2>Settings</h2>
      <form  className="profile-settings" onSubmit={submitFunk}>
        <h3>Account Info</h3>

        <label for="file-inpt" className="file-btn">PROFILE IMAGE <input id="file-inpt" type="file" onChange={(e)=> setImg(e.target.files[0])}/></label>
        <label>Username<input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} /></label>
        <label>Email<input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} /></label>
        <label className="password-label">Current Password<input type={showPassword1 ? "text" : "password"} onChange={(e)=> setOldPassword(e.target.value)} /> <span className="password-btn" onClick={() => setShowPassword1(!showPassword1)}>
          <i className={showPassword1 ? `fa-regular fa-eye` : "fa-regular fa-eye-slash"}></i></span></label>

        <label className="password-label">New Password<input type={showPassword2 ? "text" : "password"} onChange={(e)=> setNewPassword(e.target.value)}/> <span className="password-btn" onClick={() => setShowPassword2(!showPassword2)}>
          <i className={showPassword2 ? `fa-regular fa-eye` : "fa-regular fa-eye-slash"}></i></span></label>

        <label className="password-label">Confirm New Password<input type={showPassword3 ? "text" : "password"} onChange={(e)=> setConfirmPassword(e.target.value)}/>  <span className="password-btn" onClick={() => setShowPassword3(!showPassword3)}>
          <i className={showPassword3 ? `fa-regular fa-eye` : "fa-regular fa-eye-slash"}></i></span></label>

        <button className="settings-btn">Save Changes</button>

      </form>
    </>)
}
