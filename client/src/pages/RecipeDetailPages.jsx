import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

const RecipeDetailPages = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [data,setData]=useState({});


  
  const veification = async () => {

    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.get("http://localhost:3000/api/v1/dashboard", axiosConfig);
       setData({msg: response.data.msg })
       

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    veification();
    if (token === "") {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }

    const fetchRecipe = async () => {
      try {
        let axiosConfig = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const response = await axios.get(`http://localhost:3000/api/v1/recipes/${id}`,axiosConfig);
        setRecipe(response.data.recipe);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error.message);
        setLoading(false);
      }
    };



    fetchRecipe();
  }, [id,token]); // Dependency array to re-fetch recipe when id changes

  if (loading) {
    <div class="space-y-5 rounded-2xl bg-white/5 p-4">
    <div class="h-24 rounded-lg bg-rose-100/10"></div>
    <div class="space-y-3">
      <div class="h-3 w-3/5 rounded-lg bg-rose-100/10"></div>
      <div class="h-3 w-4/5 rounded-lg bg-rose-100/20"></div>
      <div class="h-3 w-2/5 rounded-lg bg-rose-100/20"></div>
    </div>
  </div>
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  // Splitting the instructions into steps
  const instructionsSteps = recipe.strInstructions.split('\r\n').filter(step => step.trim() !== '');

  return (
    <div>
      <div className="container mx-auto mt-8">

        <Navbar isLoggedIn={token !== ""} userName={data.msg} />

        <div className="mt-4 grid grid-cols-2   px-4 shadow-md">
          <div className=" bg-white p-8 rounded-lg shadow">
            <h1 className="text-4xl py-2 text-center  font-semibold mb-2">{recipe.strMeal}</h1>
            <img className="rounded-md w-full h-auto mb-4" src={recipe.strMealThumb} alt={recipe.strMeal} />
            <div className='flex justify-between'>
              <div className='flex '>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Category</h2>
                  <p>{recipe.category.strCategory}</p>
                </div>
                <img src={recipe.category.strCategoryThumb} alt={recipe.category.strCategory} className="w-32 ronded h-32 mb-4" />
              </div>
              <div>
                <h2 className='text-xl font-semibold mb-2'>Area</h2>
                <p className="text-gray-600 mb-4">{recipe.strArea}</p>
              </div>
            </div>
          </div>

          <div className="aspect-w-16 flex justify-end pt-24  aspect-h-9">
            <iframe
              className="w-[48rem] h-[27rem] p-4 "
              src={recipe.strYoutube.replace('watch?v=', 'embed/')}
              frameborder="0"
              title="Embedded Video"
            ></iframe>
          </div>
        </div>

        <div className=" bg-white p-8 flex  justify-between  rounded-lg shadow">
          <div className=' w-1/3'>
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc ml-6">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{`${ingredient.ingredient} - ${ingredient.measure}`}</li>
              ))}
            </ul>
          </div>

          <div className='w-2/3'>
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <ol>
              {instructionsSteps.map((step, index) => (
                <li key={index}><strong>Step {index + 1}:</strong> {step}</li>
              ))}
            </ol>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetailPages;
