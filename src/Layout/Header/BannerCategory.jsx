import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import t_shart from './../../assets/BannerSlider/BannerCategory/t-shart.png';
import watche from './../../assets/BannerSlider/BannerCategory/watch.png';
import rolling from './../../assets/BannerSlider/BannerCategory/rolling.png';
import chair from './../../assets/BannerSlider/BannerCategory/chair.png';
import shoe from './../../assets/BannerSlider/BannerCategory/shoe.png';
import bag from './../../assets/BannerSlider/BannerCategory/bag.png';
import xbox from './../../assets/BannerSlider/BannerCategory/xbox.png';
import mobile from './../../assets/BannerSlider/BannerCategory/mobile.png';
import { NavLink } from 'react-router-dom';

export default function BannerCategory() {
  const items = [
    { img: mobile, title: 'Mobile' },
    { img: t_shart, title: 'T-Shirt' },
    { img: watche, title: 'Watch' },
    { img: rolling, title: 'Rolling' },
    { img: chair, title: 'Chair' },
    { img: shoe, title: 'Shoe' },
    { img: bag, title: 'Bag' },
    { img: xbox, title: 'Xbox' },
  ];

  return (
  <div className='mt-6  bg-blue-50'>
    <hr />
      <div className="px-2 py-5  relative">
    <Swiper
      modules={[Navigation]}
      navigation={{
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      }}
      spaceBetween={10}
      breakpoints={{
        320: { slidesPerView: 3 },
        480: { slidesPerView: 4 },
        640: { slidesPerView: 5 },
        768: { slidesPerView: 6 },
        1024: { slidesPerView: 7 },
      }}
      className="!pb-12"
    >
      {items.map((item, idx) => (
        <SwiperSlide key={idx} className="flex justify-center">
          <NavLink to={`/products/category/${item.title}`} className="bg-white w-[90px] md:w-[100px] p-2 rounded-lg shadow-sm hover:shadow-md transition duration-200 flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src={item.img}
                alt={item.title}
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
            <h2 className="text-center text-sm font-medium mt-2 text-gray-700">
              {item.title}
            </h2>
          </NavLink>
        </SwiperSlide>
      ))}
    </Swiper>
  
    {/* Centered at bottom navigation buttons */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 z-10">
      <button className="custom-prev bg-blue-900 hover:bg-blue-500 border rounded-full p-2 shadow  transition">
        ❮
      </button>
      <button className="custom-next bg-blue-900 hover:bg-blue-500 border rounded-full p-2 shadow transition">
        ❯
      </button>
    </div>
  </div>
  
  </div>
  );
}