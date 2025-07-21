import React from 'react'

const Home = () => {
  return (
    <>

    {/* Welcome Section */}
        <div className='mx-auto max-w-5xl mt-5 mb-12 px-4'>
            <div className="shadow-lg min-h-[250px] py-10 rounded-lg bg-gradient-to-r from-green-400 to-green-100 text-center px-6">
                <div className="flex flex-col justify-center items-center gap-3 ">
                    <h3 className='text-2xl md:text-3xl font-semibold text-gray-800 tracking-wide'>WELCOME TO</h3>
                    <h1 className='text-3xl md:text-5xl text-blue-700 font-extrabold tracking-wider'>EXPENSE TRACKER</h1>
                    <p className='text-gray-700 max-w-3xl'>An intuitive and powerful tool to help you manage your personal finances. Track your income, expenses and budget with ease</p>    
                </div> 
            </div>
        </div>



    {/* Why Section */}
        <div className="bg-gradient-to-r from-sky-100 via-indigo-200 to-purple-100 py-16 ">
            <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-800">WHY THIS EXPENSE TRACKER</h2>

            <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
                {/* Card 1 */}
                <div className="bg-white rounded-xl shadow-md p-6 flex-1 hover:shadow-2xl transition duration-300 ease-in-out">
                    <h3 className="text-xl font-semibold text-green-600 mb-2">Easy to Use</h3>
                    <p className="text-gray-600">Simple and intuitive interface designed for everyone.</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-xl shadow-md p-6 flex-1 hover:shadow-2xl transition duration-300 ease-in-out">
                    <h3 className="text-xl font-semibold text-green-600 mb-2">Real-Time Tracking</h3>
                    <p className="text-gray-600">Monitor your income and expenses instantly with up-to-date insights.</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-xl shadow-md p-6 flex-1 hover:shadow-2xl transition duration-300 ease-in-out">
                    <h3 className="text-xl font-semibold text-green-600 mb-2">Insightful Reports</h3>
                    <p className="text-gray-600">Visualize your spending habits and budget performance effortlessly.</p>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Home
