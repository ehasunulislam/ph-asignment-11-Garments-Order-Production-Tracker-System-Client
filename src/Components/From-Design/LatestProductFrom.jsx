import React, { useState } from "react";
import useAuthInfo from "../Hooks/useAuthInfo";
import useAxios from "../Hooks/useAxios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const LatestProductFrom = () => {
  const { user } = useAuthInfo();
  const axiosInstance = useAxios();
  const [previewImages, setPreviewImages] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const onSubmit = async (data) => {
    const files = data.images;
    if (!files || files.length < 3) {
      return Swal.fire("Upload minimum 3 images!");
    }

    try {
      const imageUrls = [];

      // Upload images to ImageBB (Functionality unchanged)
      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const imgbbAPI = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_BB_API_KEY
        }`;

        const res = await axios.post(imgbbAPI, formData);
        imageUrls.push(res.data.data.url);
      }

      const productData = {
        ...data,
        images: imageUrls,
        createdBy: user?.email,
        showOnHome: Boolean(data.showOnHome),
      };

      const res = await axiosInstance.post("/products", productData);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Product added successfully",
          icon: "success",
          draggable: true,
        });
        reset();
        setPreviewImages([]);
      }
    } catch (err) {
      Swal.fire({
        title: err.message,
        icon: "error",
        draggable: true,
        demoVideo: data.demoVideo || "",
      });
    }
  };

  return (
    // Outer Container: Min-height and padding adjusted for mobile (p-6)
    <div className="mx-auto py-10 bg-gray-50 min-h-screen">
      <form
        // Form Styling: Padding responsive (p-6 on mobile, p-10 on larger)
        className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl space-y-6 max-w-4xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-gray-800 border-b-2 pb-4">
          📦 Add New Product
        </h2>

        {/* --- User/Email Section (Responsive) --- */}
        {/* Stacks on mobile (grid-cols-1) and goes back to 2 columns on medium screens (md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div>
            <label className="text-lg font-semibold text-gray-600">
              Creator Details
            </label>
          </div>

          {/* Name and Email fields stack on mobile (flex-col) and become side-by-side on tablet (sm:flex-row) */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100 font-medium text-gray-700 read-only:cursor-default"
              value={user?.displayName}
              readOnly
            />
            <input
              type="email"
              className="input input-bordered w-full bg-gray-100 font-medium text-gray-700 read-only:cursor-default"
              value={user?.email}
              readOnly
            />
          </div>
        </div>

        <div className="border-t pt-6 border-gray-200">
          {/* --- Product Details Section (Responsive) --- */}
          <h3 className="text-2xl font-bold mb-4 text-gray-700">
            Product Details
          </h3>
          {/* Stacks on mobile (grid-cols-1) and goes back to 2 columns on medium screens (md:grid-cols-2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="label-text font-bold text-gray-700">
                Product Name *
              </label>
              <input
                className="input input-bordered w-full transition-shadow duration-300 focus:shadow-lg"
                {...register("productName", {
                  required: "Product Name is required!",
                })}
                placeholder="Ex: Premium Wool Scarf"
              />
              {errors.productName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productName.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="label-text font-bold text-gray-700">
                Category *
              </label>
              <select
                className="select select-bordered w-full transition-shadow duration-300 focus:shadow-lg"
                {...register("category", { required: "Category is required!" })}
              >
                <option value="">Select Category...</option>
                <option>Shirt</option>
                <option>Pant</option>
                <option>Jacket</option>
                <option>Accessories</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  Category is required!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t pt-6 border-gray-200">
          {/* --- Inventory & Pricing Section (Responsive) --- */}
          <h3 className="text-2xl font-bold mb-4 text-gray-700">
            Inventory & Pricing
          </h3>
          {/* Stacks on mobile (grid-cols-1), uses 2 columns on small tablets (sm:grid-cols-2), and 3 columns on medium/desktop (md:grid-cols-3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Price */}
            <div className="space-y-2">
              <label className="label-text font-bold text-gray-700">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register("price", { required: "Price is required!" })}
                className="input input-bordered w-full"
                placeholder="99.99"
              />
            </div>
            {/* Available Qty */}
            <div className="space-y-2">
              <label className="label-text font-bold text-gray-700">
                Available Qty *
              </label>
              <input
                type="number"
                min="1"
                {...register("availableQuantity", {
                  required: "Quantity is required!",
                })}
                className="input input-bordered w-full"
                placeholder="100"
              />
            </div>
            {/* Min Order Qty */}
            <div className="space-y-2">
              <label className="label-text font-bold text-gray-700">
                Min Order Qty *
              </label>
              <input
                type="number"
                min="1"
                {...register("minimumOrderQuantity", {
                  required: "Min Order is required!",
                })}
                className="input input-bordered w-full"
                placeholder="5"
              />
            </div>
          </div>
        </div>

        {/* --- Description & Video Section (Layout unchanged, already responsive) --- */}
        <div className="border-t pt-6 border-gray-200">
          {/* Description */}
          <div className="space-y-2 mb-6">
            <label className="label-text font-bold text-gray-700">
              Description *
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-32"
              rows="4"
              {...register("description", {
                required: "Description is required!",
              })}
              placeholder="A detailed description of the product features and specifications."
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                Description is required!
              </p>
            )}
          </div>

          {/* Video URL (Optional) */}
          <div className="space-y-2">
            <label className="label-text font-bold text-gray-700">
              Demo Video URL (optional)
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Ex: https://www.youtube.com/watch?v=..."
              {...register("demoVideo")}
            />
          </div>
        </div>

        {/* --- Images Section --- */}
        <div className="border-t pt-6 border-gray-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-700">
            Product Images
          </h3>
          <div className="space-y-2">
            <label className="label-text font-bold text-gray-700">
              Upload Images (Minimum 3) *
            </label>
            <input
              type="file"
              multiple
              className="file-input file-input-bordered w-full transition-colors duration-300"
              {...register("images", { required: true })}
              onChange={handleImageChange}
            />
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">
                Minimum 3 images are required!
              </p>
            )}
          </div>

          {/* Preview (Responsive Grid) */}
          {previewImages.length > 0 && (
            <div className="mt-5 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <p className="font-semibold mb-3 text-gray-600">Image Preview:</p>
              {/* Shows 2 images on mobile, 3 on tablet, and 4 on desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previewImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="w-full h-24 object-cover rounded-lg shadow-md transition-transform duration-200 hover:scale-[1.03]"
                    alt={`Product Preview ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --- Submission Button --- */}
        <button
          className="btn btn-neutral w-full text-xl font-bold py-3 mt-8 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transform rotate-45 -translate-y-px"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default LatestProductFrom;