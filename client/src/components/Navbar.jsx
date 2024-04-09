import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Navbar = ({ isLoggedIn, userName }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); 

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/recipes/search/${search}`); 
  }

  return (
    <nav className='flex justify-center items-center fixed top-0 left-0 right-0 z-10 py-1 space-x-2'>
      <div className="container px-10 w-full flex rounded-md  justify-evenly items-center bg-white opacity-80 backdrop-blur-lg">
        {/* Logo and Brand Name */}
        <div>
          <a href="http://localhost:5173/dashboard" className="text-lg font-bold flex items-center">
            <img src="https://th.bing.com/th/id/OIG1.18HHd7VZFlfizIjzS600?pid=ImgGn" alt="Cooking Delights Logo" className="mr-2 rounded-full border border-5 border-zinc-500 shadow-sm  h-10 w-10 bg-white" />
            <h1>Cooking Delights</h1>
          </a>
        </div>

        {/* Menu Items */}
        <div className='ml-32'>
          <ul className="flex gap-6">
            <li>
              <a href="http://localhost:5173/dashboard" className="px-2 font-semibold py-1 rounded-lg hover:bg-green-300 hover:text-black">Home</a>
            </li>
            <li>
              <a href="http://localhost:5173/recipes" className="px-2 font-semibold  py-1 rounded-lg hover:bg-green-300">Recipes</a>
            </li>
            <li>
              <a href="http://localhost:5173/aboutus" className="px-2 font-semibold py-1 rounded-lg hover:bg-green-300">About Us</a>
            </li>
          </ul>
        </div>

        {/* Search Box and User Name/Login */}
        <div className='flex items-center ml-auto'>
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex items-center">
            <input className="form-input ring-1 ring-lime-300 border-none mr-2 py-2 px-4 rounded-md text-gray-800" type="search" value={search} onChange={handleSearchChange} placeholder="Search recipes" name="search" aria-label="Search" />
            <button className="-p-4  rounded hover:scale-90 transition duration-75 hover:bg-green-300" type="submit"><FaSearch /></button>
          </form>

          {/* User Name/Login */}
          {isLoggedIn ? (
            <span className="text-gray-900 px-2 font-bold">{userName}</span>
          ) : (
            <span className="text-gray-900 font-semibold">Login</span>
          )}
          <div className='bg-red-300 rounded-md px-2 py-1 mx-1 duration- transition-all hover:bg-red-400'>
            {isLoggedIn && <Link to="/logout" className="logout-button text-black font-semibold">Logout</Link>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
