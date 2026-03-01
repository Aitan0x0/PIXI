import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";

export default function SearchNav() {
  const [isScroll, setIsScroll] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const navigate = useNavigate();
  
  const { user, setUser } = useContext(UserContext);
  const { cartGames, openCartFunk } = useContext(CartContext);

  // scroll 
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

//oyunlari getirir
  useEffect(() => {
    fetch("https://localhost:7094/api/games")
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error("oyun error:", err));
  }, []);

  
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        fetch(`https://localhost:7094/api/users/${payload.id}`, {
          headers: { Authorization: "Bearer " + token }
        })
          .then(res => res.json())
          .then(data => setUser(data))
          .catch(err => console.error(" user error:", err));
      }
    }
  }, [user, setUser]);


  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === "") {
      setFilteredGames([]);
    } else {
      const filtered = games.filter(game =>
        game.gameName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  };

 
  const handleGameClick = (gameId) => {
    navigate(`/game/${gameId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchInput("");
    setFilteredGames([]);
  };


  return (
    <div className={`search-profile-nav ${isScroll ? "scroll-nav" : ""}`}>
      <div className="search-profile">
     
        <div className="search-result-div">
          <div className="input-style">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              placeholder="Search Game..."
              className="search"
              value={searchInput}
              onChange={handleSearch}
              autoComplete="off"
            />
          </div>

   
          {searchInput && filteredGames.length > 0 && (
            <div className="search-result">
              <ul>
                {filteredGames.map(game => (
                  <li
                    key={game.gameId}
                    className="search-result-li"
                    onClick={() => handleGameClick(game.gameId)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="search-result-info">
                      <div className="search-result-img">
                        <img
                          src={`https://localhost:7094${
                            game.gameImages?.find(img => img.isMain === "true")
                              ?.imageUrl || ""
                          }`}
                          alt={game.gameName}
                        />
                      </div>
                      <div className="search-result-text">
                        <p>{game.gameName}</p>
                        <span>{game.gameDeveloper}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

        
          {searchInput && filteredGames.length === 0 && (
            <div className="search-result">
              <div style={{ padding: "10px", fontSize: "30px", textAlign: "center", color: "#bababa" }}>
               Oyun tapilmadi
              </div>
            </div>
          )}
        </div>

      
        <div className="cart-profile">
          {user ? (
            <>
              {user.role === "user" && (
                <>
                  <div className="cart-icon">
                    <i className="fa-solid fa-cart-shopping" onClick={openCartFunk}></i>
                    <div className="cart-say">
                      <span>{cartGames?.length > 0 ? cartGames.length : 0}</span>
                    </div>
                  </div>
                  <Link to="/profile" className="profil-a">
                    <div className="profile-img-circle">
                      <img
                        className="profile-img-icon"
                        src={
                          user?.userImageUrl
                            ? `https://localhost:7094/${user?.userImageUrl}`
                            : "/img-header/default_profile.jpg"
                        }
                        alt="profile"
                      />
                    </div>
                  </Link>
                </>
              )}

              {user.role === "admin" && (
                <Link to="/admin/statistics" className="admin-dash-btn">
                  <i className="fa-solid fa-mug-hot"></i> Admin Dashboard
                </Link>
              )}
            </>
          ) : (
            <Link to="/login" className="login-register-btn">
              <i className="fa-solid fa-arrow-right-to-bracket login-i"></i> LOGIN
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
