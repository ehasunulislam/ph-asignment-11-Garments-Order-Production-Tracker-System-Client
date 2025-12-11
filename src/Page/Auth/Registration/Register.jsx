import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router"; // Assuming this is imported from 'react-router-dom' in a real project
import useAuthInfo from "../../../Components/Hooks/useAuthInfo";
import Swal from "sweetalert2";
import axios from "axios";
import useAxios from "../../../Components/Hooks/useAxios";
import { GoogleAuthProvider } from "firebase/auth";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // Watch the main password field to compare against confirm password
  const password = watch("password");

  // States for Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { createUser, updateProfileFunction, signInWithGoogle } = useAuthInfo();
  const provider = new GoogleAuthProvider();
  const axiosInstance = useAxios();

  // redirect 
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.from?.pathname || "/"

  // Complex Password Regex Definition
  const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const passwordMessage =
    "Password must be 6+ characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character (@$!%*?&).";

  // Toggle functions
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    // <-- New toggle function
    setShowConfirmPassword((prev) => !prev);
  };

  /* handle register function */
  const handleRegister = async (data) => {
    try {
      // Upload image
      const registerImg = data.photo[0];
      const formData = new FormData();
      formData.append("image", registerImg);

      const imageBB_api_key = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_BB_API_KEY
      }`;
      // In a real application, you might want to handle VITE_IMAGE_BB_API_KEY security more robustly.
      const imageRes = await axios.post(imageBB_api_key, formData);
      const imageData = imageRes.data.data.url;

      // Create Firebase user
      const result = await createUser(data.email, data.password);
      const user = result.user;
      console.log(user);
     
      // Update Firebase profile
      await updateProfileFunction(data.name, imageData);

      // Send to backend
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: imageData,
        role: data.role.toLowerCase(),
        status: "pending",
      };

      const res = await axiosInstance.post("/users", userInfo);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Registration Successful! 🎉",
          text: "Please wait for admin approval.",
          icon: "success",
        });
        reset();
        navigate(redirect, {replace: true})
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: err.message,
      });
    }
  };

  /* handle GoogleS-Sign in functionality  */
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle(provider);
      const loggedUser = result.user;

      const userInfo = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
        role: "user",
        status: "pending",
      };

      const res = await axiosInstance.post("/users", userInfo);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Login Successful! 🎉",
          text: "Welcome to Garments System",
          icon: "success",
        });
        navigate(redirect, {replace: true});
      } else if (res.data.message === "user already exists") {
        Swal.fire({
          icon: "info",
          title: "Welcome Back!",
          text: "You already have an account.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed!",
        text: error.message,
      });
    }
  };

  return (
    <div className="w-full sm:w-[550px] mx-auto glass rounded-2xl bg-white shadow-lg p-4 sm:p-6 my-8">
      <form className="card-body p-0" onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
            Register Account
          </h2>
          {/* Name and Email Section: Changed flex gap-4 mb-4 to handle wrapping on small screens */}
          <section className="flex flex-col sm:flex-row gap-4 mb-4">
            {/* Name */}
            <div className="flex flex-col gap-2 w-full">
              <label className="label text-gray-700">Name</label>
              <input
                type="text"
                className={`input outline-0 border p-2 rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message || "This field is required"}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 w-full">
              <label className="label text-gray-700">Email</label>
              <input
                type="email"
                className={`input outline-0 border p-2 rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </section>

          {/* Photo and Role Section: Changed flex gap-4 mb-6 to handle wrapping on small screens */}
          <section className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Image (Photo) */}
            <div className="flex flex-col gap-2 w-full">
              <label className="label text-gray-700">Choose your photo</label>
              {/* Adjusted file input padding to look better */}
              <input
                type="file"
                className={`file-input outline-0 border p-1 rounded ${
                  errors.photo ? "border-red-500" : "border-gray-300"
                }`}
                {...register("photo", { required: "Photo is required" })}
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photo.message || "This field is required"}
                </p>
              )}
            </div>

            <div className="w-full">
              {/* choose role */}
              <label className="label text-gray-700">Choose your role</label>
              <select
                defaultValue="Pick a color"
                className="select w-full outline-0 mt-2 border border-gray-300 p-2 rounded"
                {...register("role", { required: "Role is required" })}
              >
                <option disabled={true}>Pick a role</option>
                <option>Buyer</option>
                <option>Manager</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>
          </section>

          {/* Password and Confirm Password Section: Changed flex gap-4 mb-4 to handle wrapping on small screens */}
          <section className="flex flex-col sm:flex-row gap-4 mb-4">
            {/* 1. Password Field */}
            <div className="flex flex-col gap-2 w-full">
              <label className="label text-gray-700">Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input outline-0 border p-2 pr-10 rounded w-full ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: passwordRegex,
                      message: passwordMessage,
                    },
                  })}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 z-10"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* 2. Confirm Password Field */}
            <div className="flex flex-col gap-2 w-full">
              <label className="label text-gray-700">Confirm Password</label>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`input outline-0 border p-2 pr-10 rounded w-full ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    // Custom validation rule to match the 'password' field
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 z-10"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </section>

          <button
            type="submit"
            className="btn btn-neutral mt-6 font-bold py-2 px-4 rounded transition duration-200 w-full hover:bg-gray-800"
          >
            Register
          </button>
        </fieldset>
      </form>

      {/* sign in with google */}
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="divider w-3/4 mx-auto text-gray-500">OR</div>
        <button
          className="cursor-pointer border border-gray-300 p-2 rounded-full hover:bg-gray-50 transition duration-150"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={26} />
        </button>
        <h4 className="font-semibold mb-2">Connect with socials</h4>

        <section className="text-center">
          <p>
            Already have an account ?{" "}
            {/* Note: Use react-router-dom Link component */}
            <Link to="/auth/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Register;
