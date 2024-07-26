import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Logo } from "../assets";

const Login = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setError("");
    // Dummy check for demonstration; replace this with actual validation logic
    if (data.username === "admin@admin.com" && data.password === "pass@123") {
      dispatch(login({ userData: { username: data.username } }));
      navigate("/");
    } else {
      setError("Invalid credentails");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-admin_Bg">
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="logo" className="w-44" />
        </div>
        <div className="text-start">
          <span className="font-semibold">For demo</span>
          <span className="w-full flex items-center justify-start">
            <p className="m-0 text-sm"><b>Email:</b> admin@admin.com</p>
            <p className="ml-2 mb-0 text-sm"><b>Password:</b> pass@123</p>
          </span>
        </div>
        <p className="text-red-500 text-sm my-2">{error}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-admin_dark font-medium mb-2">
              Username:
            </label>
            <input
              type="text"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`border p-3 w-full rounded-md focus:outline-none focus:ring-2 ${
                errors.username
                  ? "border-red-500 focus:ring-red-500"
                  : "border-admin_light_grey focus:ring-admin_light_grey"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-admin_dark font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`border p-3 w-full rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-admin_light_grey focus:ring-admin_light_grey"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-admin_primary text-white p-3 rounded-md hover:bg-admin_dark focus:outline-none focus:ring-2 focus:ring-admin_light_grey"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
