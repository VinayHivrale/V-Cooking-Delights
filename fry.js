const mongoose = require('mongoose');
const fetch = require('node-fetch');
const Recipe = require('./models/Recipe'); // Assuming your Recipe model is in a separate file
const Category = require('./models/Categories'); // Assuming your Category model is in a separate file

// Connect to MongoDB
mongoose.connect('mongodb+srv://vinayhivrale2:OGkcMW6pMNkRbR1d@cluster0.j13cvoj.mongodb.net/Cooking-delights', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
// Function to fetch recipes from the API
async function fetchRecipes() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

// Function to save recipes to the database
async function saveRecipesToDatabase() {
  try {
    const recipes = await fetchRecipes();
    
    for (const recipe of recipes) {
      const {
        strMeal,
        strArea,
        strInstructions,
        strMealThumb,
        strTags,
        strYoutube,
        strCategory,
      } = recipe;

      // Parse ingredients and measures
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[strIngredient$[i]];
        const measure = recipe[strMeasure$[i]];
        if (ingredient && measure) {
          ingredients.push({ ingredient, measure });
        }
      }

      // Create a new Recipe instance
      const newRecipe = new Recipe({
        strMeal,
        strArea,
        strInstructions,
        strMealThumb,
        strTags: strTags ? strTags.split(',') : [],
        strYoutube,
        ingredients // Assign the parsed ingredients
      });

      // Save the recipe to the database
      await newRecipe.save();
    }

    console.log('Recipes saved to database successfully!');
  } catch (error) {
    console.error('Error saving recipes to database:', error);
  }
}

// Call the function to save recipes to the database
saveRecipesToDatabase();