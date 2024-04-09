import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';


const RecipeItem = ({ recipe, onLike, onDislike }) => {

  const handleLike = () => {
    // Toggle isLiked property in the recipe object
    const updatedRecipe = { ...recipe, isLiked: !recipe.isLiked };
    // Call the onLike function passed from the parent component with updated recipe
    onLike(updatedRecipe);
  };

  const handleDislike = () => {
    // Toggle isDisliked property in the recipe object
    const updatedRecipe = { ...recipe, isDisliked: !recipe.isDisliked };
    // Call the onDislike function passed from the parent component with updated recipe
    onDislike(updatedRecipe);
  };

  return (
    <div className="bg-white shadow-lg transition duration-300 ease-in-out transform hover:shadow-xl max-w-sm border border-gray-200 rounded-lg hover:-translate-y-1 overflow-hidden cursor-pointer">
      {/* Recipe Image */}
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-40 object-cover"
      />
      {/* Recipe Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{recipe.strMeal}</h3>
        <p className="text-gray-700">{recipe.strInstructions.substring(0, 100)}...</p>
      </div>
      {/* Like and Dislike Buttons */}
      <div className="flex justify-between p-4">
        {/* Like Button */}
        <div className="flex items-center">
          <button onClick={handleLike} className="mr-2">
            <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#66b234" }} />
            {/* <FontAwesomeIcon icon="fa-light fa-thumbs-up" style={{ color: "#66b234" }} /> */}
          </button>
        </div>
        {/* Dislike Button */}
        <div className="flex items-center">
          <button onClick={handleDislike} className="mr-2">
            <FontAwesomeIcon icon={faThumbsDown} style={{ color: "#f9343e" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
