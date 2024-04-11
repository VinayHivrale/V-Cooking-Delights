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

// Function to fetch recipes alphabetically from the API
async function fetchRecipesByAlphabet() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const recipes = [];

  for (const letter of alphabet) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      const data = await response.json();
      
      if (data.meals) {
        recipes.push(...data.meals);
      }
    } catch (error) {
      console.error(`Error fetching recipes for letter ${letter}:`, error);
    }
  }

  return recipes;
}

// Function to save recipes to the database
async function saveRecipesToDatabase() {
  try {
    const recipes = await fetchRecipesByAlphabet();
    
    for (const recipe of recipes) {
      const {
        strMeal,
        strArea,
        strInstructions,
        strMealThumb,
        strTags,
        strYoutube,
        strSource,
        strImageSource,
        dateModified,
        strCategory,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
        strIngredient16,
        strIngredient17,
        strIngredient18,
        strIngredient19,
        strIngredient20,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strMeasure14,
        strMeasure15,
        strMeasure16,
        strMeasure17,
        strMeasure18,
        strMeasure19,
        strMeasure20
      } = recipe;

      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && measure) {
          ingredients.push({ ingredient, measure });
        }
      }

      // Find the category from the database based on strCategory
      const category = await Category.findOne({ strCategory });

      if (!category) {
        console.error(`Category not found for recipe: ${strMeal}`);
        continue; // Skip this recipe if category not found
      }

      // Create a new Recipe instance with category attribute
      const newRecipe = new Recipe({
        strMeal,
        category: category._id, // Assign category ID
        strArea,
        strInstructions,
        strMealThumb,
        strTags: strTags ? strTags.split(',') : [],
        strYoutube,
        strSource,
        strImageSource,
        dateModified,
        ingredients 
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
