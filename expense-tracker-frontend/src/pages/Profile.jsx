import React , {useState , useEffect} from 'react'
import ProfileImage from "../assets/profile-image.png"
import { Pencil, Save } from "lucide-react"; 
import axios from "axios";


const BASE_URL = "http://localhost:3000";


const Profile = () => {

  const [user , setUser] = useState(null);
  const [userId , setuserId] = useState("");
  const [isEditing , setIsEditing] = useState({
    name : false,
    mobile : false,
  });

  const [formData , setFormData] = useState({
    name : user?.name || "",
    mobile : user?.mobile || "",
  });


  useEffect(() => {
      const token = localStorage.getItem("token");
      const userFromStorage = localStorage.getItem("user");

      if(token && userFromStorage) {
          try {
            
            const payload = JSON.parse(atob(token.split(".")[1]));  // This sets only what's inside the token
            const userData = JSON.parse(userFromStorage);
            setuserId(payload.userId);
            setUser(userData);

          } catch (error) {
            console.log("Invalid Token");
          }
      }
  } , []);



  const handleOnEditClick = (field) => {
      setIsEditing((prev) => ({...prev , [field] : true}));
      setFormData((prev) => ({...prev , [field] : user[field] || ""}));
  }


  const handleInputChange = (field , value) => {
      setFormData((prev) => ({...prev , [field] : value}));
  }


  const handleOnSave = async(field) => {
      try {

        if(user) {
            const response = await axios.put(`${BASE_URL}/api/user/${userId}` , {
              [field] : formData[field]
            });
            
            if(response.data.userData) {
                localStorage.setItem("user" , JSON.stringify(response.data.userData));
            }


            setUser((prev) => ({...prev , [field]: formData[field]}));
            setIsEditing((prev) => ({...prev , [field] : false}));  
            
            alert(`Successfully updated the '${field}' field`);
        }

      } catch (error) {
        console.error("Error updating name:", error);
        alert("Failed to update name. Please try again.");
      }
  }


  return (
    <>
      
      <div className="flex justify-center items-center py-16 px-4">
          <div className='w-full max-w-md bg-white rounded-xl py-8 md:py-14 text-center shadow-xl bg-gradient-to-br from-green-100 via-teal-100 to-blue-100'>

            {/* Avatar */}
              <div>
                  <img src={ProfileImage} alt="Profile" className="w-36 h-36 rounded-full mx-auto border-4 border-green-300 object-cover" />
              </div>

            {/* User Info */}
              {user ? (
                <>
                    <div className="flex justify-center items-center gap-2 mb-2">
                      {/* Name Editing */}
                          {isEditing.name ? (
                            <>
                                <input
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) => handleInputChange("name" , e.target.value)}
                                  className="border px-2 py-1 rounded-md text-gray-800"
                                />
                                <button onClick={() => handleOnSave("name")}>
                                  <Save className="w-5 h-5 text-green-600 hover:text-green-800" />
                                </button>
                            </>
                          ) : (
                            <>
                                <h2 className="text-2xl font-semibold text-gray-800">
                                  {user.name || "Name not available"}
                                </h2>
                                <button onClick={() => handleOnEditClick("name")}>
                                  <Pencil className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                                </button>
                            </>
                          )}
                    </div>

                    <p className="text-gray-600 font-semibold mb-1">{user.email || "Email not found"}</p>

                    <div className="flex justify-center items-center gap-2 mb-1">
                      {/* Name Editing */}
                          {isEditing.mobile ? (
                            <>
                                <input
                                  type="text"
                                  value={formData.mobile}
                                  onChange={(e) => handleInputChange("mobile" , e.target.value)}
                                  className="border px-2 py-1 rounded-md text-gray-800"
                                />
                                <button onClick={() => handleOnSave("mobile")}>
                                  <Save className="w-5 h-5 text-green-600 hover:text-green-800" />
                                </button>
                            </>
                          ) : (
                            <>
                                <p className=" font-semibold text-gray-600">
                                  {user.mobile || "Mobile not available"}
                                </p>
                                <button onClick={() => handleOnEditClick("mobile")}>
                                  <Pencil className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                                </button>
                            </>
                          )}
                    </div>
                    
                    

                </>
              ) : (
                    <p className="text-gray-500">Loading user data...</p>
              )}

          </div>
        
      </div>

    </>
  )
}

export default Profile
