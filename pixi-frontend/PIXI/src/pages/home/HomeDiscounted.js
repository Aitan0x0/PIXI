import { Link } from 'react-router-dom';
import React from 'react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export default function HomeDiscounted({ games = [] }) {

    const discountedGames = games.filter(
        x => x.gameOldPrice > 0 && x.gameOldPrice > x.gameNewPrice
    );

    return (
        <div className="dcounted-games">
            <h2>
                Discounted <span className="name-span">Games</span>
                <Link to="/discountedgames" className="game-store-btn">{'>'}</Link>
            </h2>
            <Swiper
                slidesPerView={3}
                spaceBetween={25}
                loop={true}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {discountedGames.slice(0, 5).map(game => (
                    <SwiperSlide key={game.gameId}>
                        <Link to={`/game/${game.gameId}`} className="game-info">
                            <img
                                src={`https://localhost:7094${game.gameImages?.find(img => img.isMain === "true")?.imageUrl
                                    }`}
                                alt={game.gameName}
                                loading="lazy"
                            />


                            <div className="faiz-div">
                                <span>
                                    -{Math.round(((game.gameOldPrice - game.gameNewPrice) / game.gameOldPrice) * 100)}%
                                </span>
                            </div>
                            <div className="price-div">
                                <span className="old-price">{game.gameOldPrice} AZN</span>
                                <span className="new-price">{game.gameNewPrice} AZN</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
