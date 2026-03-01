import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { WishlistContext } from '../../WishlistContext';
import { CartContext } from '../../CartContext';
import { LibraryContext } from '../../LibraryContext';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';

export default function GameDetail({ game = {} }) {
    const { cartGames, addToCart, removeFromCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const libraryContext = useContext(LibraryContext);
    const { library } = libraryContext;
    const { wishlist, toggleWishlist } = useContext(WishlistContext);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const navigate = useNavigate()
    const inWishlist = wishlist.some(x => x.gameId === game.gameId);
    const inCartGame = cartGames.some(x => x.gameId === game.gameId);
    const inLibrary = library.some(x => x.gameId === game.gameId);
    return (
        <>
            <h1 className="readmore-h1">ABOUT GAME</h1>
            <div className="readmore-container">
                <Link to="" className="exit-readmore" onClick={() => navigate(-1)}>{'<'} </Link>
                <div className="readmore-content">
                    <div className="readmore-left">
                        {/* Main Image Carousel */}
                        <Swiper
                            style={{
                                '--swiper-navigation-color': '#fff',
                                '--swiper-pagination-color': '#fff',
                            }}
                            spaceBetween={10}
                            navigation={true}
                            loop={true}
                            autoplay={{ delay: 4000 }}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                            className="mySwiper2"
                        >
                            {game.gameImages?.filter(img => img.isMain !=="true").length > 0 ? (
                                game.gameImages.filter(img => img.isMain !=="true").map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={`https://localhost:7094${img.imageUrl}`} alt={game.gameName || "Game Image"} />
                                    </SwiperSlide>
                                ))
                            ) : (
                                <SwiperSlide>
                                    <p style={{ color: "white", fontSize: "50px" }}>No Image :(</p>
                                </SwiperSlide>
)}
                        </Swiper>

                        {/* Thumbnails */}
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            loop={true}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                            className="mySwiper"
                        >
                            {game.gameImages?.filter(img => img.isMain !=="true").map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={`https://localhost:7094${img.imageUrl}`}
                                        alt={`Thumbnail ${index}`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="readmore-right">
                        <div className="name-fav">
                            <h2 className="readmore-game-name">{game.gameName}</h2>
                            {user && user.role === "user" ? (
                                <button
                                    onClick={() => toggleWishlist(game?.gameId)}
                                    className={inWishlist ? "fav-icon-btn fav-active" : "fav-icon-btn"}
                                >
                                    <i className="fa-solid fa-heart"></i>
                                </button>
                            ) : null}
                        </div>

                        <p className="readmore-game-info">{game.gameDescription}</p>

                        <ul className="readmore-ul">
                            <li><span>RATING: </span>{game.gameRating}</li>
                            <li><span>DEVELOPER: </span>{game.gameDeveloper}</li>
                            <li><span>CATEGORY: </span>{game.gameCategory?.categoryName}</li>
                        </ul>

                        <div className="readmore-game-price">
                            <p className="readmore-old-price">{game.gameOldPrice===0 ? "" : `${game.gameOldPrice} AZN`} </p>
                            <p className="readmore-new-price">
                                {game.gameNewPrice === 0 ? "FREE" : `${game.gameNewPrice} AZN`}
                            </p>
                        </div>

                        <div className="readmore-btns">
                            {user?.role ==="user" && inLibrary ? (
                                <Link to="/profile/library" className="go-to-library-btn">
                                    GO TO LIBRARY
                                </Link>
                            ) : user?.role === "user" && (user ? (
                                inCartGame ? (
                                    <button
                                        className="remove-cart-btn"
                                        onClick={() => removeFromCart(game.gameId)}
                                    >
                                        REMOVE FROM CART
                                    </button>
                                ) : (
                                    <button
                                        className="add-cart-btn"
                                        onClick={() => addToCart(game.gameId)}
                                    >
                                        ADD TO CART
                                    </button>
                                )
                            ) : (
                                <Link to="/login" className="login-for-buy-btn">
                                    Login to purchase
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
