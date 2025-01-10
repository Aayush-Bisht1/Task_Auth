import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8000/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setMessage("Check your email for password reset instructions");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-4xl">Reset Password</h1>
      <form
        className="flex flex-col gap-3 mt-4 wd-1/2 md:w-1/4"
        onSubmit={handleSubmit}
      >
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="bg-transparent border border-gray-400 rounded-md px-2 h-10"
          required
        />

        {error && <div className="text-red-500 text-sm">{error}</div>}

        {message && <div className="text-green-500 text-sm">{message}</div>}

        <button
          type="submit"
          className={` ${
            loading && "disabled cursor-not-allowed"
          } bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all ease-in duration-300 text-lg`}
        >
          {loading ? "Sending..." : "Reset Password"}
        </button>

        <Link to="/login" className="text-sm text-center mt-2 text-blue-600 hover:text-blue-500">
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
