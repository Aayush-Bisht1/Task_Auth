import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ userName }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen text-center">
      <h1 className="text-lg">Hi, {userName} 👋</h1>
      <h1 className="text-4xl">Welcome to the Auth Dashboard</h1>
      <button
        className="bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
