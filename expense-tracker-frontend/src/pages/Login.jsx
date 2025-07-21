import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css"


const BASE_URL = "http://localhost:3000";


const Login = () => {

  const navigate = useNavigate();
  const [error , setError] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  
  // if token is already there then redirect to dashboard (no need to login again until token is there)
  const token = localStorage.getItem("token");
  useEffect(() => {
      if(token) {
          alert("Redirecting to home page in 2 sec...")
          const timer = setTimeout(() => {
             navigate("/home");
          } , 2000);

          return () => clearInterval(timer);
      }
  } , [token]);



  const handleSubmit = async(e) => {
      e.preventDefault();

      if(!email.trim() || !password.trim()) {
          setError("All Fields are required");
          return ;
      }

      // Simple email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(!emailRegex.test(email)) {
          setError("Enter a valid Email");
          return;
      }

      setError("");


      // now preceed with login
      try {
        
          const response = await axios.post(`${BASE_URL}/api/user/login` , {
            email , password
          });

          const data = response.data;
        
          if(data.success && data.token) {
              localStorage.setItem("token" , data.token);
              localStorage.setItem("user" , JSON.stringify(data.userData));
              navigate("/home");
          }
          else {
            setError(data.msg || "Login Failed");
          }

      } catch (error) {
          if(error.response && error.response.data && error.response.data.msg) {
            setError(error.response.data.msg);
          }
          else {
            setError("Login failed. Please check your credentials or try again later.");
          }
      }
  }




  
  return (
    <>
      <div className="auth-page container parent w-full h-screen flex justify-center items-center">
        <div
          className="w-full max-w-md flex flex-col justify-center rounded-lg p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
    shadow-2xl text-white"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Expense Tracker
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 mx-10">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="user_email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="user_email"
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="user_password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="user_password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>

            <p className="text-sm text-center mt-4 text-white">
              Not registered?{" "}
              <Link
                to="/register"
                className="text-blue-200 underline hover:text-white transition duration-200"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
