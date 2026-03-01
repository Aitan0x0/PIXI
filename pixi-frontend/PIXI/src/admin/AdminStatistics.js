import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function AdminStatistics() {
  const { user } = useContext(UserContext);
  const [games, setGames] = useState([]);
  const [cats, setCats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

const token = user?.token || localStorage.getItem("token");

 useEffect(() => {
  const fetchAll = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [gamesRes, usersRes, catsRes , ordersRes] = await Promise.all([
        fetch("https://localhost:7094/api/games", { headers }),
        fetch("https://localhost:7094/api/users", { headers }),
        fetch("https://localhost:7094/api/categories", { headers }),
        fetch("https://localhost:7094/api/orders", { headers }),
      ]);

      const gamesData = await gamesRes.json();
      const usersData = await usersRes.json();
      const catsData = await catsRes.json();
       const ordersData = await ordersRes.json();

      setGames(Array.isArray(gamesData) ? gamesData : []);
      setAllUsers(Array.isArray(usersData) ? usersData : []);
      setCats(Array.isArray(catsData) ? catsData : []);
     setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchAll();
}, [token]);



  if (user?.role !== "admin") return <p>Access denied</p>;

  if (loading) return <p>Loading statistics...</p>;

  return (
    <>
      <h2 className="admin-dash-h2">Statistics</h2>
      <div className="statistics-container">
        <Link className="statistic-div" to="/admin/users">
          <i className="fa-solid fa-users"></i>
          <span>{(allUsers || []).length}</span>
          <p>Users</p>
        </Link>
        <Link className="statistic-div" to="/admin/games">
          <i className="fa-solid fa-gamepad"></i>
          <span>{(games || []).length}</span>
          <p>Games</p>
        </Link>
        <Link className="statistic-div" to="/admin/categories">
          <i className="fa-solid fa-bars-staggered"></i>
          <span>{(cats || []).length}</span>
          <p>Categories</p>
        </Link>
        <Link className="statistic-div" to="/admin/orders">
          <i className="fa-solid fa-cart-shopping"></i>
          <span>{(orders || []).length}</span>
          <p>Orders</p>
        </Link>
      </div>
    </>
  );
}
