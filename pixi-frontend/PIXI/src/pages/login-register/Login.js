import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Starback from "starback"; // npm install starback

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const toggleShowPass = () => setShowPass(!showPass);

  const loginFunk = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      
      const response = await fetch("https://localhost:7094/api/users/login", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Login ugurlu oldu 
        localStorage.setItem("token", data.token);
        alert("Login ugurla tamamlandi");
        navigate("/home"); 
        // sehifeni yenileyir 
         window.location.reload();
      } else {
       
        alert("Login alinmadi: " + data.message || "bilmeyen error");
      }
    } catch (error) {
      alert("problem var serverde : " + error.message);
    
      } 
    finally {
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

          <h2>LOG IN</h2>
          <p>Login to continue</p>

          <form className="login-form" onSubmit={loginFunk}>
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
              <label htmlFor="login-password">Password</label>
              <input
                type={showPass ? "text" : "password"}
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`fa-regular ${showPass ? "fa-eye" : "fa-eye-slash"}`}
                onClick={toggleShowPass}
              ></i>
            </div>

            <button className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "LOG IN"}
            </button>
          </form>

          <p>
            Don't have an account?{" "}
            <Link to="/register" className="signup-a">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
