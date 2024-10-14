import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

import slide1 from "../../../assets/home/slide1.jpg"
import slide2 from "../../../assets/home/slide2.jpg"
import slide3 from "../../../assets/home/slide3.jpg"
import slide4 from "../../../assets/home/slide4.jpg"
import slide5 from "../../../assets/home/slide5.jpg"
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Category = () => {
    return (
       <section>
        <SectionTitle 
        subHeading={"from 11:00am to 10:00pm"}
        heading={"order online"}/>
         <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            pagination={{
                clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper mb-24"
        >
            <SwiperSlide>
                <img src={slide1} alt="" />
                <h1 className='text-4xl text-white uppercase -mt-16 text-center'>salads</h1>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide2} alt="" />
                <h1 className='text-4xl text-white uppercase -mt-16 text-center'>pizzas</h1>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide3} alt="" />
                <h1 className='text-4xl text-white uppercase -mt-16 text-center'>soups</h1>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide4} alt="" />
                <h1 className='text-4xl text-white uppercase -mt-16 text-center'>desserts</h1>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide5} alt="" />
                <h1 className='text-4xl text-white uppercase -mt-16 text-center'>salads</h1>
            </SwiperSlide>
        </Swiper>
       </section>
    );
};

export default Category;