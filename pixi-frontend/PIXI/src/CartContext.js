import React, { createContext, useEffect, useState } from 'react'
import axios from "axios"

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cartOpen, setCartOpen] = useState(false)
    const [cartGames, setCartGames] = useState([])

    const getCart = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            setCartGames([])
            return;
        }

        try {
            const res = await axios.get("https://localhost:7094/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log("cart :", res.data);

            setCartGames(res.data)


        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCart();

    }, []);

    const addToCart = async (gameId) => {
        const token = localStorage.getItem("token")
        if (!token) return
        try {
            await axios.post(`https://localhost:7094/api/cart/${gameId}`,
                {}, {
                    headers: { Authorization: `Bearer ${token}` }
            });
            await getCart();
        } catch (err) {
            console.log(err)
        }
    }

    const removeFromCart = async (gameId) => {
        const token = localStorage.getItem("token")
        if (!token) return
        try {
            await axios.delete(`https://localhost:7094/api/cart/${gameId}`, {
                headers: { Authorization: `Bearer ${token}` }

            })

            setCartGames(x => x.filter(game => game.gameId !== gameId))
        } catch (err) {
            console.log(err)
        }
    }

    const deleteAllCart = async () => {
        // Optimistic UI update: clear local cart immediately so counter updates without refresh
        setCartGames([])

        const token = localStorage.getItem("token")
        if (!token) return
        try {
            await axios.delete("https://localhost:7094/api/cart/cart/clear", {
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (err) {
            console.log(err)
            // If server-side delete failed, re-sync from server
            await getCart()
        }
    }

    const openCartFunk = async () => {
        setCartOpen(true)
        await getCart();
    }
    const closeCartFunk = () => {
        setCartOpen(false)
    }

    return (
        <CartContext.Provider value={
            { cartGames, openCartFunk, addToCart, removeFromCart, deleteAllCart, closeCartFunk, cartOpen, getCart }
        }>
            {children}
        </CartContext.Provider>
    )
}
