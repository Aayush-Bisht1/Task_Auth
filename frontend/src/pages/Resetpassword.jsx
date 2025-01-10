import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://auth-14ri.onrender.com/reset-password",
        { token, newPassword: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        navigate("/login", {
          state: {
            message:
              "Password successfully reset. Please login with your new password.",
          },
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-4xl">Set New Password</h1>

      <form
        className="flex flex-col gap-3 mt-4 wd-1/2 md:w-1/4"
        onSubmit={handleSubmit}
      >
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter new password"
          className="bg-transparent border border-gray-400 rounded-md px-2 h-10"
          required
        />
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm new password"
          className="bg-transparent border border-gray-400 rounded-md px-2 h-10"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className={` ${
            loading && "disabled cursor-not-allowed"
          } bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all ease-in duration-300 text-lg`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
