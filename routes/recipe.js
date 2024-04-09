const express = require("express");
const router = express.Router();

const { likeRecipe, dislikeRecipe } = require("../controllers/recipe");
const authMiddleware = require('../middleware/auth')

// Use HTTP POST method for both like and dislike actions
router.route("/like/:recipeId").post(authMiddleware, likeRecipe);
router.route("/dislike/:recipeId").post(authMiddleware, dislikeRecipe);

module.exports = router;
