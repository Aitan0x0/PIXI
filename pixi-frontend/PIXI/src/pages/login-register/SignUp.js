import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Starback from "starback"; // npm install starback

export default function SignUp() {
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [userImg, setUserImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    new Starback(canvas, {
      type: "dot",
      quantity: 150,
      direction: 270,
      backgroundColor: ["#0e1118", "#5c0d76ff"],
      randomOpacity: true,
    });
  }, []);

  const togglePass1 = () => setShowPass1(!showPass1);
  const togglePass2 = () => setShowPass2(!showPass2);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password1 !== password2) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password1);
    formData.append("confirmPassword", password2);
    if (userImg) formData.append("userImg", userImg);

    try {
      const response = await fetch("https://localhost:7094/api/users/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Registration successful!");
        navigate("/login");
      } else {
        const err = await response.text();
        alert("Registration failed: " + err);
      }
    } catch (error) {
      alert("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-div">
      <canvas id="canvas" className="login-star"></canvas>

      <div className="login-left-side">
        <div className="p-div">
          <p className="left-p">WELCOME TO</p>
          <p className="right-p">
            PI<span>X</span>I
          </p>
        </div>
      </div>

      <div className="login-right-side">
        <div className="login-container">
          <Link to={"/"} className="login-register-exit">{">"}</Link>
          <h2>SIGN UP</h2>
          <p>Join our family :)</p>

          <form className="login-form" onSubmit={handleRegister}>
            <input
              type="file"
              className="file-inpt-register"
              id="file-inpt"
              onChange={(e) => setUserImg(e.target.files[0])}
            />
            <label htmlFor="file-inpt" className="file-inpt-register-label">Choose Photo</label>

            <div className="input-icon">
              <label htmlFor="login-username">Username</label>
              <input
                type="text"
                id="login-username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="input-icon">
              <label htmlFor="login-email">Email Address</label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-icon">
              <label htmlFor="login-password1">Password</label>
              <input
                type={showPass1 ? "text" : "password"}
                id="login-password1"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                required
              />
              <i className={`fa-regular ${showPass1 ? "fa-eye" : "fa-eye-slash"}`} onClick={togglePass1}></i>
            </div>

            <div className="input-icon">
              <label htmlFor="login-password2">Confirm Password</label>
              <input
                type={showPass2 ? "text" : "password"}
                id="login-password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
              <i className={`fa-regular ${showPass2 ? "fa-eye" : "fa-eye-slash"}`} onClick={togglePass2}></i>
            </div>

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Registering..." : "SIGN UP"}
            </button>
          </form>

          <p>
            Already have an account? <Link to="/login" className="signup-a">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
