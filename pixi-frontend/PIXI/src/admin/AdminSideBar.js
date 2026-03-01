import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function AdminSideBar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="nav-profile">
      <div className="admin-profile">
        <div className="admin-profile-img">
          <img 
            src={user?.userImageUrl ? `https://localhost:7094${user?.userImageUrl}` : "/img-header/default_profile.jpg"} 
            alt="" 
          />
        </div>
        <h3 className="admin-name">{user?.username || "Ad teyin olunmadi"}</h3>
      </div>

      <hr className="nav-hr" />

      <ul className="admin-ul">
        <li>
          <NavLink 
            to="/admin/statistics" 
            className={({ isActive }) => isActive ? "hover-profile active-hover-profile" : "hover-profile"}
          >
            Statistics
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/users" 
            className={({ isActive }) => isActive ? "hover-profile active-hover-profile" : "hover-profile"}
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/games" 
            className={({ isActive }) => isActive ? "hover-profile active-hover-profile" : "hover-profile"}
          >
            Games
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/categories" 
            className={({ isActive }) => isActive ? "hover-profile active-hover-profile" : "hover-profile"}
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => isActive ? "hover-profile active-hover-profile" : "hover-profile"}
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/settings" 
            className={({ isActive }) => isActive ? "hover-profile active-hover-profile" : "hover-profile"}
          >
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/home" className="back-to-site">
            <i className="fa-solid fa-arrow-left"></i> Back to Site
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
