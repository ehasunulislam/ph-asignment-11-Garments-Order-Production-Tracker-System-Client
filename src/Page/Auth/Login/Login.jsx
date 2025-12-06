import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import useAuthInfo from "../../../Components/Hooks/useAuthInfo";
import Swal from "sweetalert2";
import useAxios from "../../../Components/Hooks/useAxios";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { signInWithGoogle, loginWithEmailPassword } = useAuthInfo();
  const axiosInstance = useAxios();
  const provider = new GoogleAuthProvider();

  // redirect
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.from?.pathname || "/";

  // Defined for validation but doesn't strictly affect responsiveness
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const passwordMessage =
    "Password must be 6+ characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character (@$!%*?&).";

  
  // handle login function
  const handleLogin = async (data) => {
    try {
      await loginWithEmailPassword(data.email, data.password);
      Swal.fire({
        title: "Login Successful 🎉",
        text: `Welcome back ${data.email}!`,
        icon: "success",
      });
      navigate(redirect, {replace: true});
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    }
  };

  // login with google
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
      } else if (res.data.message === "user already exists") {
        Swal.fire({
          icon: "info",
          title: "Welcome Back!",
          text: "You already have an account.",
        });
        navigate(redirect, {replace: true})
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
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Responsive Container: w-full on small screens, max-w-md (approx 448px) on larger screens */}
      <div className="w-full max-w-md glass rounded-2xl bg-white shadow-lg p-6">
        <form className="card-body p-0" onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            {/* Email Field - Ensure w-full is applied for full width */}
            <div className="flex flex-col gap-2 mb-4 w-full">
              <label className="label text-gray-700">Email</label>
              <input
                type="email"
                // w-full ensures the input takes up all available width
                className={`input outline-0 border p-2 rounded w-full ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field - Ensure w-full is applied for full width */}
            <div className="flex flex-col gap-2 mb-4 w-full">
              <label className="label text-gray-700">Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input w-full pr-10 border p-2 rounded ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: { value: passwordRegex, message: passwordMessage },
                  })}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 z-10"
                  onClick={() => setShowPassword(!showPassword)}
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

            {/* Forgot Password */}
            <p className="text-right text-sm mb-6">
              <button
                type="button"
                className="text-blue-500 hover:underline transition duration-150"
              >
                Forgot password?
              </button>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-neutral w-full font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
            >
              Login
            </button>
          </fieldset>
        </form>

        {/* OR Divider */}
        <div className="divider my-4 text-gray-500">OR</div>

        {/* Google Login */}
        <div className="flex flex-col justify-center items-center">
          <button
            className="cursor-pointer border border-gray-300 p-2 rounded-full hover:bg-gray-50 transition duration-150"
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={26} />
          </button>
          <h4 className="font-semibold mt-2">Connect with Google</h4>
        </div>

        {/* Register Link */}
        <p className="text-sm text-center mt-1">
          Don't have an account?{" "}
          <Link
            className="text-blue-500 hover:underline transition duration-150"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
