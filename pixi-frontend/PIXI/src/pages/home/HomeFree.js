
import React from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export default function HomeFree({ games = [] }) {
    const freeGames = games.filter(x => x.gameNewPrice === 0);
    if (freeGames.length === 0) {
        return (
            <div className="free-games">
                <h2>Free <span className="name-span"> Games</span> </h2>

                <p className='empty-cards'>No free games available at the moment :(</p>
            </div>
        )
    }
    return (
        <div className="free-games">
            <h2>Free <span className="name-span"> Games</span> <Link to="/freegames/" className="game-store-btn">{'>'}</Link></h2>
            <Swiper
                slidesPerView={4}
                spaceBetween={15}
                loop={true}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {freeGames.map(game => (
                    <SwiperSlide key={game.gameId}>
                        <Link to={`/game/${game.gameId}`} className="game-info">
                             <img
                                src={`https://localhost:7094${game.gameImages?.find(img => img.isMain === "true")?.imageUrl
                                    }`}
                                alt={game.gameName}
                                loading="lazy"
                            />
                            <div className="price-div">
                                <span className="new-price">Free</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>



    )
}
