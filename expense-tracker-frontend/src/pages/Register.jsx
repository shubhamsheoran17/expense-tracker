import React , {useState} from "react";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";



const BASE_URL = "http://localhost:3000";


const Register = () => {

  const navigate = useNavigate();
  const [error , setError] = useState("");
  const [formData , setFormData] = useState({
      name: "",
      email: "",
      password: ""
  })



  const handleChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name] : e.target.value
      }))
  }



  const handleSubmit = async(e) => {
      e.preventDefault();

      const {name , email , password} = formData;

      if(!name || !email || !password) {
          setError("All Fields are required");
          return ;
      }

      // Simple email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(!emailRegex.test(email)) {
          setError("Enter a valid email");
          return;
      }

      setError("");


      // lets proceed with registering
      try {
        
          const response = await axios.post(`${BASE_URL}/api/user/register` , {
            name , email , password
          });

          const data = response.data;

          if(data.success) {
              alert(data.msg);
              navigate("/");   //navigate to login page
          }
          else {
            setError(data.msg || "Register failed");
          }

      } catch (error) {
          if(error.response && error.response.data && error.response.data.msg) {
            setError(error.response.data.msg);
          }
          else {
            setError("SignUp failed. Please check your credentials or try again later.");
          }
      }
  }



  return (
    <>
      <div className="auth-page container parent w-full h-screen flex justify-center items-center">
        <div
          className="sub-container w-full max-w-md flex flex-col justify-center rounded-lg p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
  shadow-2xl text-white"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4 mx-10">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={handleChange}
              />
            </div>


            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
            >
              Register
            </button>


            <p className="text-sm text-center mt-4 text-white">
              already registered?{" "}
              <Link
                to="/"
                className="text-blue-200 underline hover:text-white transition duration-200"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
