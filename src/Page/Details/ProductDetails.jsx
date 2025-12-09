import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../Components/Hooks/useAxios";
import PageLoading from "../../Components/Loading/PageLoading";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { FaOpencart } from "react-icons/fa";
import useAuthInfo from "../../Components/Hooks/useAuthInfo";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const [activeImg, setActiveImg] = useState("");
  const modalRef = useRef(null);
  const [comment, setComment] = useState("");
  const { user } = useAuthInfo();
  const [showComment, setShowComment] = useState([]);

  // show details
  useEffect(() => {
    axiosInstance
      .get(`/all-products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setActiveImg(res.data.images[0]);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, [axiosInstance, id]);

  // show all comment
  useEffect(() => {
    axiosInstance.get("/comments").then((res) => {
      setShowComment(res.data);
      setLoading(false);
    });
  }, [axiosInstance]);

  // comment functionality
  const handleReviewSubmit = async () => {
    if (!comment.trim()) return;

    const commentInfo = {
      productId: id,
      comment,
      userEmail: user?.email,
      userImage: user?.photoURL,
      userName: user?.displayName,
      createdAt: new Date(),
    };

    await axiosInstance.post("/comments", commentInfo);

    const res = await axiosInstance.get("/comments");
    setShowComment(res.data);

    setComment("");
    modalRef.current.close();
  };

  if (loading) return <PageLoading />;

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-4">
        <figure className="w-full h-[24rem] overflow-hidden rounded-xl shadow-md flex justify-center items-center">
          <img
            src={activeImg}
            alt={product.productName}
            className="w-65 h-65 object-cover"
          />
        </figure>

        <div className="flex gap-3 justify-center mt-3">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setActiveImg(img)}
              className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 
                 ${
                   activeImg === img ? "border-neutral" : "border-transparent"
                 }`}
            />
          ))}
        </div>
        <div className="text-gray-700">
          <p className="pt-5">
            <strong>Seller Email:</strong> {product.createdBy}
          </p>
          <p className="text-justify pt-3">
            <strong>Description:</strong> {product.description}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold">{product.productName}</h2>
        <span className="badge badge-neutral">{product.category}</span>
        <p className="text-4xl font-bold text-neutral my-2">${product.price}</p>
        <p>
          <strong>Available Stock:</strong> {product.availableQuantity}
        </p>
        <p>
          <strong>MOQ:</strong> {product.minimumOrderQuantity} Pcs
        </p>
        {product.demoVideo && (
          <a
            href={product.demoVideo}
            target="_blank"
            className="text-neutral underline block"
          >
            Watch Demo Video 🎥
          </a>
        )}
        <p className="text-sm text-gray-500">
          Added on: {new Date(product.createdAt).toLocaleDateString()}
        </p>
        <div className="flex gap-4 mt-4">
          {/* add to cart */}
          <button className="btn btn-neutral w-[200px]">
            Add to Cart <FaOpencart size={20} />
          </button>

          {/* give the review */}
          <button
            className="btn btn-outline w-[200px]"
            onClick={() => modalRef.current.showModal()}
          >
            Give your review <TfiCommentsSmiley size={20} />
          </button>
        </div>

        {/* comment section */}
        <section className="comment mt-6">
          <h3 className="text-lg font-semibold mb-3 border-b pb-2 text-gray-300">
            Reviews:
          </h3>

          {showComment.filter((c) => c.productId === id).length === 0 && (
            <p className="text-gray-500 text-sm italic bg-base-200 p-3 rounded-lg">
              No reviews yet. Be the first to review!
            </p>
          )}

          {showComment
            .filter((c) => c.productId === id)
            .map((item) => (
              <div
                key={item._id}
                className="flex gap-3 p-4 bg-white rounded-[10px] shadow-sm border border-gray-300 mb-3"
              >
                {/* Profile */}
                <img
                  src={item.userImage}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover shadow-2xl border border-gray-400"
                />

                {/* Comment Body */}
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sm">{item.userName}</h4>
                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="mt-1 text-gray-600 text-sm bg-gray-50 p-2 rounded-lg">
                    {item.comment}
                  </p>
                </div>
              </div>
            ))}
        </section>
      </div>

      {/* review modal section */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-semibold text-xl mb-3">Write a Review ✍️</h3>

          <textarea
            placeholder="Write your feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea textarea-bordered w-full h-32 outline-0"
          ></textarea>

          <div className="modal-action">
            <button className="btn btn-neutral" onClick={handleReviewSubmit}>
              Submit
            </button>
            <button className="btn" onClick={() => modalRef.current.close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductDetails;
