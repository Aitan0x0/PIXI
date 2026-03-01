import React from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';


export default function HomeCategory({ cats = [] }) {
    return (
        <div class="categories-carousel">
            <h2>Categories </h2>

            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                loop={true}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {cats.map(cat => (
                    <SwiperSlide key={cat.categoryId}>
                        <Link to={`/category/${cat.categoryId}`} class="game-info">
                            <img src={`https://localhost:7094${cat.categoryImgUrl}`} alt={cat.categoryName} loading="lazy" />
                            <div class="slide-grad">
                                <p>{cat.categoryName}</p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}




            </Swiper>



        </div>)
}
