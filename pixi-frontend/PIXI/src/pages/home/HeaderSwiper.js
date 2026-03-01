import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

export default function HeaderSwiper() {
  // useEffect(() => {
  //    window.addEventListener("scroll" , ()=>{
  //   return(   console.log(window.scrollY))

  // })
  //   return () => {

  //   };
  // }, []);
  const goButton = () => {
    window.scrollTo({ top: 900, behavior: "smooth" })

  }

  const images = [
    "img_1.jpg",
    "img_2.jpg",
    "img_3.jpg",
    "img_4.jpg",
  
  ]
  return (
    <div className="header">
      <div className="swiper_1">
        <Swiper
          spaceBetween={30}
          effect={'fade'}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          className="mySwiper"
        >

          {images.map((img, index) => (


            <SwiperSlide className='swiper-slide' key={index}>
              <img src={`/img-header/${img}`} />
              <div className="slide-grad"></div>
              <div className="text-btn">
                <h3>
                  Explore Your Game
                  <hr className="header-dec" />
                </h3>
                <button onClick={goButton}>GO!</button>
              </div>
            </SwiperSlide>


          ))}



        </Swiper>
      </div></div>
  );
}
