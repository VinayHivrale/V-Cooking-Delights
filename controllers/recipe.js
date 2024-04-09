
// Import necessary models
const Recipe = require('../models/Recipe');
const User = require('../models/User');

const likeRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const { id: userId } = req.user;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        // Check if the user already liked the recipe
        const alreadyLiked = recipe.likes.some(like => like.user.toString() === userId);
        console.log("already liked", alreadyLiked);
        // Check if the user already disliked the recipe
        const alreadyDisliked = recipe.dislikes.some(dislike => dislike.user.toString() === userId);
        console.log("already disliked", alreadyDisliked);

        let update = {};

        if (alreadyLiked) {
            // User already liked the recipe, remove like
            update = {
                $pull: { 'likes': { user: userId } }
            };
        } else {
            // Add like if the user didn't like the recipe before
            update = {
                $addToSet: { 'likes': { user: userId } }
            };
            // Remove dislike if the user disliked the recipe before
            if (alreadyDisliked) {
                update.$pull = { 'dislikes': { user: userId } };
            }
        }

        await Recipe.updateOne({ _id: recipeId }, update);

        res.status(200).json({ message: 'Recipe liked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const dislikeRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const { id: userId } = req.user;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        // Check if the user already liked the recipe
        const alreadyLiked = recipe.likes.some(like => like.user.toString() === userId);
        // Check if the user already disliked the recipe
        const alreadyDisliked = recipe.dislikes.some(dislike => dislike.user.toString() === userId);
        console.log("already disliked", alreadyDisliked);

        let update = {};

        if (alreadyDisliked) {
            // User already disliked the recipe, remove dislike
            update = {
                $pull: { 'dislikes': { user: userId } }
            };
        } else {
            // Add dislike if the user didn't dislike the recipe before
            update = {
                $addToSet: { 'dislikes': { user: userId } }
            };
            // Remove like if the user liked the recipe before
            if (alreadyLiked) {
                update.$pull = { 'likes': { user: userId } };
            }
        }

        await Recipe.updateOne({ _id: recipeId }, update);

        res.status(200).json({ message: 'Recipe disliked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const getRecentRecipes = async (req, res) => {
    try {
      // Fetch 12 most recent recipes from the database
      const recentRecipes = await Recipe.find({}).sort({ createdAt: -1 }).limit(12).populate('category');
    
      return res.status(200).json({ recentRecipes });
    } catch (error) {
      console.error('Error fetching recent recipes:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getMostLikedRecipes = async (req, res) => {
    try {
      // Fetch all recipes from the database
      const recipes = await Recipe.find({});
    
      // Sort recipes based on likes (primary) and dislikes (secondary)
      recipes.sort((a, b) => {
        // If likes are equal, sort by fewer dislikes
        if (a.likes.length === b.likes.length) {
          return a.dislikes.length - b.dislikes.length;
        }
        // Sort by most likes
        return b.likes.length - a.likes.length;
      });
    
      // Limit the number of recipes to 9
      const limitedRecipes = recipes.slice(0, 9);
    
      return res.status(200).json({ sortedRecipes: limitedRecipes });
    } catch (error) {
      console.error('Error fetching and sorting recipes:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
  

module.exports = { likeRecipe, dislikeRecipe ,getRecentRecipes,getMostLikedRecipes};










































































































// const Recipe = require('../models/Recipe');
// const User = require('../models/User');

// // Controller function for liking or disliking a recipe
// const likeRecipe = async (req, res) => {
//   try {
//     const { recipeId, userId, action } = req.body;

//     // Check if the user and recipe exist
//     const recipe = await Recipe.findById(recipeId);
//     const user = await User.findById(userId);

//     if (!recipe || !user) {
//       return res.status(404).json({ error: 'Recipe or user not found' });
//     }

//     // Check if the user has already liked or disliked the recipe
//     const likedRecipeIndex = user.likedRecipes.findIndex(likedRecipe => likedRecipe.recipe.equals(recipeId));
//     const dislikedRecipeIndex = user.dislikedRecipes.findIndex(dislikedRecipe => dislikedRecipe.recipe.equals(recipeId));

//     // Remove existing like or dislike if the user wants to undo it
//     if (action === 'like') {
//       if (likedRecipeIndex !== -1) {
//         user.likedRecipes.splice(likedRecipeIndex, 1);
//       } else {
//         user.likedRecipes.push({ recipe: recipeId });
//       }
//       // Remove dislike if user likes the recipe
//       if (dislikedRecipeIndex !== -1) {
//         user.dislikedRecipes.splice(dislikedRecipeIndex, 1);
//       }
//     } else if (action === 'dislike') {
//       if (dislikedRecipeIndex !== -1) {
//         user.dislikedRecipes.splice(dislikedRecipeIndex, 1);
//       } else {
//         user.dislikedRecipes.push({ recipe: recipeId });
//       }
//       // Remove like if user dislikes the recipe
//       if (likedRecipeIndex !== -1) {
//         user.likedRecipes.splice(likedRecipeIndex, 1);
//       }
//     }

//     await user.save();

//     res.status(200).json({ message: 'Recipe liked/disliked successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = { likeRecipe };
