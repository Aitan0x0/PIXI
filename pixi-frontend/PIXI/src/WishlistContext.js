import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    } catch (err) {
      console.error("Token decode error:", err);
    }
  }, []);


  useEffect(() => {
    if (!userId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `https://localhost:7094/api/wishlist/${userId}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        setWishlist(res.data);
      } catch (err) {
        console.log("Wishlist fetch error:", err);
      }
    };

    fetchWishlist();
  }, [userId]);


  const toggleWishlist = async (productId) => {
    if (!userId) return;

    const token = localStorage.getItem("token");
    if (!token) return;


    const game = wishlist.find((item) => item.gameId === productId);

    try {
      if (game) {
     
        await axios.delete(
          `https://localhost:7094/api/wishlist/${game.wishlistId}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        setWishlist((prev) =>
          prev.filter((wish) => wish.wishlistId !== game.wishlistId)
        );
      } else {

        const res = await axios.post(
          `https://localhost:7094/api/wishlist`,
          {
            WishlistUserId: userId,
            WishlistGameId: productId,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        setWishlist((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.log("Toggle wishlist error:", err);
    }
  };

  console.log("Current wishlist:", wishlist);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
