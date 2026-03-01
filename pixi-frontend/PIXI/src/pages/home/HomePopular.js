import React from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export default function HomePopular({ games = [] }) {
    const popularGames = games.filter(x => x.gameRating >= 4.5);

    return (
        <div className="popular-games">
            <h2>
                Popular <span className="name-span"> Games</span>{" "}
                <Link to="/populargames" className="game-store-btn">{'>'}</Link>
            </h2>

            <Swiper
                slidesPerView={4}
                spaceBetween={15}
                loop={true}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {popularGames.slice(0, 5).map((game) => (
                    <SwiperSlide key={game.gameId}>
                        <Link to={`/game/${game.gameId}`} className="game-info">
                             <img
                                src={`https://localhost:7094${game.gameImages?.find(img => img.isMain === "true")?.imageUrl
                                    }`}
                                alt={game.gameName}
                                loading="lazy"
                            />
                            <div className="price-div">
                                <span className="new-price">{game.gameNewPrice} AZN</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
