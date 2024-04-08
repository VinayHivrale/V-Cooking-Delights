import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import Hero from '../components/Hero';

const Dashboard = () => {

  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const [areas, setAreas] = useState([]);

  const veification = async () => {

    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.get("http://localhost:3000/api/v1/dashboard", axiosConfig);
      setData({ msg: response.data.msg })

    } catch (error) {
      toast.error(error.message);
    }
  }





  useEffect(() => {
    const fetchData = async () => {
      try {
        veification();
        if (token === "") {
          navigate("/login");
          toast.warn("Please login first to access dashboard");
        }
        const response = await axios.get('http://localhost:3000/api/v1/categories');
        const rareas = await axios.get('http://localhost:3000/api/v1/areas');
        setCategories(response.data.categories);
        setAreas(rareas.data);
        // console.log("jhgjhghgjhgjhg",rareas);
        // // Ensure areas is properly set here
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <div>
        <Navbar isLoggedIn={token !== ""} userName={data.msg} />
        <div className="container flex flex-col justify-center mx-auto my-8 px-4">
          <div className='mt-24'>
            <Hero />
          </div>
          <h1 className='text-5xl  font-bold p-4 text-center hover:scale-90 duration-150  transition hover:bg-green-300 rounded-full'> Explore Categories</h1>
          <div className="grid grid-cols-1  mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {categories.map((recipe, index) => (
              <RecipeCard key={index} recipeId={recipe.idCategory} title={recipe.strCategory} image={recipe.strCategoryThumb} description={recipe.strCategoryDescription.substring(0, 300)} />
            ))}
          </div>
          <h1 className='text-5xl  font-bold p-4 my-8 text-center hover:scale-90 duration-150  transition hover:bg-green-300 rounded-full'> Explore Areas</h1>
          <div className="card-container">
            <div className="card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {areas.areaName !== "Unknown" && areas.map(area => (
                <Link to={`/recipes/areas/${area.areaName}`} className="block w-full h-full">
                  <div className="card shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl  flex justify-center items-center bg-white rounded-lg p-4 m-2" key={area.areaName}>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{area.areaName}</h3>
                      <img src={area.imageUrl} alt={area.areaName} className="w-16 h-16 object-cover rounded-full" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
        <Footer />
      </div>

    </div >
  )
}

export default Dashboard