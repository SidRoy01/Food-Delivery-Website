import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import services from "../../Appwrite/Service";
import { login as storeLogin } from "../../Store/authenticationSlice";
import { useDispatch } from "react-redux";
import { Button } from "../Index";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    seterror("");
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const userAccount = await services.createAccount(formData);
      if (userAccount) {
        const user = await services.getCurrentUser();
        if (user) dispatch(storeLogin({ userData: user }));
        navigate("/profile-setup");
        console.log("Sign-up successful:", user);
      }
    } catch (error) {
      seterror("Sign-up failed. Please try again.");
      console.error("Sign-up error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 bg-white p-2">
      <div className="bg-white border-[1px] border-slate-400 shadow-slate-400 shadow-xl rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create a New Account
        </h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your name"
            />
          </div>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your email"
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your password"
            />
          </div>
          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Confirm your password"
            />
          </div>
          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        {/* Links */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to={"/SignIn"} className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
