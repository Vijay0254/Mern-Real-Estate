import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../index.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Swiperr = ({ listing }) => {

  return (
    <Swiper spaceBetween={30} centeredSlides={true} autoplay={{ delay: 2500, disableOnInteraction: false }} pagination={{ clickable: true }} modules={[Autoplay, Pagination, Navigation]} className="mySwiper">
      {listing?.images?.map((element, index) =>(
        <SwiperSlide key={index}><div className="h-[550px]" style={{background: `url(${element}) center no-repeat`, backgroundSize: "cover"}}></div></SwiperSlide>
       ))}
    </Swiper>
  )
}

export default Swiperr