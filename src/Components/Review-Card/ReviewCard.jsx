import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


// swiper style
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useAxios from "../Hooks/useAxios";
import PageLoading from "../Loading/PageLoading";
import ReviewCardDesign from "../Card-Design/ReviewCardDesign";

const ReviewCard = () => {
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/reviews")
    .then(res => {
      setReviewData(res.data);
      setLoading(false);
    });
  }, [axiosInstance]);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div>
      <div className="slider-section mt-10">
        <Swiper
          className="custom-swiper"
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {reviewData.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="ps-6 h-full">
                <ReviewCardDesign
                  name={item.name}
                  email={item.email}
                  photoURL={item.photoURL}
                  rating={item.rating}
                  comment={item.comment}
                  date={item.date}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewCard;
