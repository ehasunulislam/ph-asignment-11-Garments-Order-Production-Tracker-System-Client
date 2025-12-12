import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

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
    axiosInstance.get("/reviews").then((res) => {
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
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: "50%",
            depth: 200,
            modifier: 1,
            scale: 0.75,
            slideShadows: false,
          }}
          autoplay={{
            display: 1000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
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

      {/* review modal section */}
      <div className="mt-5">
        <section className="btn-sec flex justify-center">
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Give your best review
          </button>
        </section>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ReviewCard;
