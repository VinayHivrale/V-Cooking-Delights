import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import RecipeItem from "../components/RecipeItem";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import { MdEdit } from "react-icons/md";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("auth")) || "";

  const deleteRecipe = async (recipeId) => {
    try {
      const response = await axios.delete(
        `${window.location.origin}/api/v1/recipe/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      fetchUserData();
    } catch (error) {
      console.log(error.message);
    }
  };


  const fetchUserData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${window.location.origin}/api/v1/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      console.log("vinay ....", response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchUserData();
  }, [token,]);

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: (
      <button className="absolute top-1/2 right-0 transform -translate-y-1/2 focus:outline-none z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white rounded-full bg-green-500 p-2 shadow-lg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    ),
    prevArrow: (
      <button className="absolute top-1/2 left-0 transform -translate-y-1/2 focus:outline-none z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white rounded-full bg-green-500 p-2 shadow-lg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    ),
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div className="mx-auto w-full p-8 bg-white rounded-lg shadow-lg">
      <Navbar isLoggedIn={token !== ""} userName={`Hello ${user.name}`} />
      <div className="mt-24"></div>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">User Profile</h2>
        <p className="text-lg text-gray-600 mb-4">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-lg text-gray-600 mb-8">
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          Recipes Created
        </h3>
        {user.recipesCreated.length > 0 ? (
          <Slider className="ml-10 pl-12 mr-10" {...carouselSettings}>
            {user.recipesCreated.map((recipe) => (
              <div key={recipe._id} className="px-2 relative">
                <div
                  onClick={() => deleteRecipe(recipe._id)}
                  className=" bg-[#bfd592] cursor-pointer hover:scale-110 absolute p-2 h rounded-full z-20 left-0"
                  type="button"
                >
                  <FaTrash />
                </div>
                <div
                  onClick={() => {
                    navigate(`/user/updaterecipe/${recipe._id}`);
                  }}
                  className=" bg-[#bfd592] cursor-pointer absolute p-2 hover:scale-110 rounded-full z-20 left-[320px] top-[140px]"
                  type="button"
                >
                  <MdEdit />
                </div>
                <Link to={`/recipes/${recipe._id}`}>
                  <RecipeItem recipe={recipe} onLike={0} onDislike={0} />
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-lg text-gray-600">No recipes Created yet.</p>
        )}
      </div>
     
        <div
          onClick={() => {
            navigate("/user/createrecipe");
          }}
          className="my-10 hover:scale-125 cursor-pointer duration-200 p-3 mx-auto bg-green-200 rounded-full w-10 h-10 "
        >
          <FaPlus className="mx-auto" />
        </div>
   

      <div className="mt-12">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          Recipes Liked
        </h3>
        {user.likedRecipes.length > 0 ? (
          <Slider className="ml-10 pl-12 mr-10" {...carouselSettings}>
            {user.likedRecipes.map((recipe) => (
              <div key={recipe._id} className="px-2">
                <Link to={`/recipes/${recipe._id}`}>
                  <RecipeItem recipe={recipe} onLike={0} onDislike={0} />
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-lg text-gray-600">No recipes Liked yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
