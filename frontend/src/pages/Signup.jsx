import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://auth-14ri.onrender.com/signup",
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        navigate("/login");
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
      <h1 className="text-4xl">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mt-4 wd-1/2 md:w-1/4"
      >
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="bg-transparent border border-gray-400 rounded-md px-2 h-10"
          required
        />
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
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>
      <p className="mt-1">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500">
          Login
        </a>{" "}
      </p>
    </div>
  );
};

export default Signup;
