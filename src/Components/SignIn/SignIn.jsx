import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import services from "../../Appwrite/Service";
import { login as storeLogin } from "../../Store/authenticationSlice";
import { useDispatch } from "react-redux";
import { Button } from "../Index";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    seterror("");
    try {
      const session = await services.login({ email, password });
      if (session) {
        const user = await services.getCurrentUser();
        if (user) dispatch(storeLogin({ userData: user }));
        navigate("/");
      }
    } catch (error) {
      seterror("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-5 p-2">
      <div className="bg-white border-[1px] border-slate-400 shadow-slate-400 shadow-xl rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign In
        </h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-6">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your password"
            />
          </div>
          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        {/* Links */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <Link to={"/SignUp"} className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Forgot your password?{" "}
          <a href="" className="text-blue-500 hover:underline">
            Reset it here
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
