import React , {useState} from 'react'
import { NavLink , useNavigate } from 'react-router-dom'



const Sidebar = () => {

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");  // to login page
    }


  return (
    <>

        <div className="sm:fixed sm:top-0 sm:left-0 container w-full sm:w-64 md:w-72 lg:w-[275px] sm:h-screen flex flex-col text-white p-5 bg-[#0f2c53]">

            <div className="text-center mb-20 text-5xl">
                <NavLink to="/profile">👤</NavLink>
            </div>

            <div className="mb-20 text-center sm:text-left">
                {/* mb-2.5 ie equal to mb-10px as 1 = 4px so 2.5 = 10px */}
                <div className='text-sm font-semibold uppercase mb-7 pb-[5px] border-b border-white/20'>General</div>
                <nav className='flex flex-col gap-3 mt-5'>
                    <NavLink to="/home" className={({isActive}) => isActive ? "text-[#86beed]" : "text-white"}>Home</NavLink>
                    <NavLink to="/dashboard" className={({isActive}) => isActive ? "text-[#86beed]" : "text-white"}>Dashboard</NavLink>
                    <NavLink to="/category" className={({isActive}) => isActive ? "text-[#86beed]" : "text-white"}>Category</NavLink>
                    <NavLink to="/transaction" className={({isActive}) => isActive ? "text-[#86beed]" : "text-white"}>Transactions</NavLink>
                </nav>
            </div>

            <div className="mb-20 text-center sm:text-left">
                <div className='text-sm font-semibold uppercase mb-7 pb-[5px] border-b border-white/20'>Extra Links</div>
                <nav className='flex flex-col gap-3 mt-5'>
                    <NavLink to="/report" className={({isActive}) => isActive ? "text-[#86beed]" : "text-white"}>Report</NavLink>
                    <NavLink to="/setting" className={({isActive}) => isActive ? "text-[#86beed]" : "text-white"}>Setting</NavLink>
                </nav>
            </div>

            <div className="flex justify-center mt-auto">
                <button className='text-white transition duration-200 bg-red-500 rounded-lg p-1.5 px-3' onClick={handleLogOut}>Logout</button>
            </div>

        </div>
      
    </>
  )
}

export default Sidebar
