import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
    const { cartGames, openCartFunk, addToCart, removeFromCart, deleteAllCart, closeCartFunk, cartOpen } = useContext(CartContext)

    const cartBuy = async () => {
    //   if (!cartGames || cartGames.length === 0) return; 

        try {
            const response = await fetch('https://localhost:7094/api/orders/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
            });

            if (!response.ok) {
                const error = await response.text();
                alert('Error: ' + error);
                return;
            }
          await  deleteAllCart();
            //  closeCartFunk();
            
            alert('Oyunlar ugurla alindi!');
        } catch (error) {
            console.error('Error during purchase:', error);
            alert('Oyunlari almaq mumkun olmadi');
        }
    }

    useEffect(() => {
        document.body.style.overflow = cartOpen ? "hidden" : "auto"
    }, [cartOpen  ]);

    const totalPrice = (cartGames || []).reduce((sum, game) => sum + (game.gameNewPrice || 0), 0);

    if (!cartOpen) return null;

    // console.log(cartGames)

    return (
        <div className="cart-modal-div">
            <div className="cart-modal">
                <div className="cart-modal-container-decors">
                        <span className="line-decor-top"></span>
                        <span className="line-decor-right"></span>

                        <div className="modal-container">
                            <h3 className="cart-h3">
                                <span className="exit-cart" onClick={closeCartFunk}>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </span> Cart
                            </h3>

                            <div className="cart-games-div">
                                {cartGames?.length === 0 ? (
                                    <p className='empty-cart'>Your cart is empty :(</p>
                                ) : (
                                    cartGames?.map(game => (
                                        <div className="cart-game" key={game.gameId}>
                                            <Link className="cart-game-img" to={`/game/${game.gameId}`} onClick={closeCartFunk}>
                                                <img
                                                    src={`https://localhost:7094${game.images
                                                        }`}
                                                    alt={game.gameName}
                                                />    </Link>
                                            <div className="cart-game-info">
                                                <p className="cart-game-cat">{game.categoryName}</p>
                                                <p className="cart-game-name">{game.gameName}</p>
                                            </div>
                                            <div className="cart-game-price">{game.gameNewPrice === 0 ? "Free" : `${game.gameNewPrice} AZN`} </div>
                                            <div className="cart-game-delete">
                                                <button className="cart-delete-btn" onClick={() => removeFromCart(game.gameId)}>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="cart-price-btns-div">
                                <p className="cart-total-price">
                                    TOTAL PRICE <span className="total-price">{totalPrice} AZN</span>
                                </p>
                                <div className="cart-btns">
                                    {cartGames?.length !== 0 && <button className="clear-cart-btn" onClick={deleteAllCart} >Clear Cart</button>}
                                    <button className="buy-cart-btn" disabled={cartGames?.length === 0} onClick={cartBuy}>BUY</button>


                                </div>
                            </div>
                        </div>

                        <span className="line-decor-left"></span>
                        <span className="line-decor-bottom"></span>
                    </div>
                </div>
            </div>
        )
    }
