import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://auth-14ri.onrender.com/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
        setLoading(false);
      } else {
        setError(res.data.message);
        setLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-4xl">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mt-4 wd-1/2 md:w-1/4"
      >
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="bg-transparent border border-gray-400 rounded-md px-2 h-10"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="bg-transparent border border-gray-400 rounded-md px-2 h-10"
          required
        />
        <p className="text-red-500">{error}</p>
        <button
          type="submit"
          className={` ${
            loading && "disabled cursor-not-allowed"
          } bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all ease-in duration-300 text-lg`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-500">
          Sign up
        </a>
      </p>
      <Link to="/forgot-password" className="text-orange-500 mt-2">
        Forgot Password ?
      </Link>
    </div>
  );
};

export default Login;
