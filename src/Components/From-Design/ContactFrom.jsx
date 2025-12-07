import React from "react";
import { useForm } from "react-hook-form";
import { BsSendFill } from "react-icons/bs";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg p-8 rounded-2xl my-10 border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Name */}
        <div className="form-control">
          <label className="label font-semibold">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            className={`input input-bordered w-full ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label font-semibold">Email Address</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            placeholder="your@email.com"
            className={`input input-bordered w-full ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Message */}
        <div className="form-control">
          <label className="label font-semibold">Message</label>
          <textarea
            {...register("message", { required: "Message is required" })}
            rows="4"
            placeholder="Write your message..."
            className={`textarea textarea-bordered w-full ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {errors.message && (
            <span className="text-red-500 text-sm">{errors.message.message}</span>
          )}
        </div>

        {/* Submit */}
        <button className="btn btn-neutral w-full gap-2 text-lg font-semibold">
          <BsSendFill /> Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
