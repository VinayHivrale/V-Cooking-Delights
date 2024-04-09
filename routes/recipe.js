const express = require("express");
const router = express.Router();

const { likeRecipe, dislikeRecipe,getRecentRecipes,getMostLikedRecipes} = require("../controllers/recipe");
const authMiddleware = require('../middleware/auth')

// Use HTTP POST method for both like and dislike actions
router.route("/like/:recipeId").post(authMiddleware, likeRecipe);
router.route("/dislike/:recipeId").post(authMiddleware, dislikeRecipe);
router.route("/recentRecipes").get( getRecentRecipes);
router.route("/most-liked").get( getMostLikedRecipes);

module.exports = router;
