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
import Swal from "sweetalert2";

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

  // handle review submit 
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const form = e.target;
    const reviewData = {
      name: form.name.value,
      email: form.email.value,
      photoURL: form.photoURL.value,
      rating: form.rating.value,
      comment: form.comment.value,
    };

    try {
      const res = await axiosInstance.post("/reviews", reviewData);

      if (res.data.success) {
        Swal.fire("Thank you!", "Your review has been submitted", "success");
        form.reset();
        document.getElementById("my_modal_5").close();

        // refresh slider
        axiosInstance.get("/reviews").then((res) => {
          setReviewData(res.data);
        });
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

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
          <form
            method="dialog"
            className="modal-box space-y-3"
            onSubmit={handleSubmitReview}
          >
            <h3 className="font-bold text-lg">Give Your Review</h3>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered w-full outline-0"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="input input-bordered w-full outline-0"
              required
            />

            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              className="input input-bordered w-full outline-0"
            />

            <select
              name="rating"
              className="select select-bordered w-full outline-0"
              required
            >
              <option value="">Select Rating</option>
              <option value="5">⭐⭐⭐⭐⭐ (5)</option>
              <option value="4">⭐⭐⭐⭐ (4)</option>
              <option value="3">⭐⭐⭐ (3)</option>
              <option value="2">⭐⭐ (2)</option>
              <option value="1">⭐ (1)</option>
            </select>

            <textarea
              name="comment"
              className="textarea textarea-bordered w-full outline-0"
              placeholder="Write your review"
              required
            />

            <div className="modal-action">
              <button className="btn btn-primary" type="submit">
                Submit Review
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default ReviewCard;
