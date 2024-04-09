const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Area = require("../models/Area");
const Categories = require('../models/Categories'); // Assuming your Category model is in a separate file


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).json({ msg: "user logged in", token });
    } else {
      return res.status(400).json({ msg: "Bad password" });
    }
  } else {
    return res.status(400).json({ msg: "Bad credentails" });
  }
};

const dashboard = async (req, res) => {


  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    isLoggedin: true,
  });
};


const getAllUsers = async (req, res) => {
  console.log("Getting all users...");
  let users = await User.find({});
  return res.status(200).json({ users });

};





const register = async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser === null) {
    let { username, email, password } = req.body;
    if (username.length && email.length && password.length) {
      const person = new User({
        name: username,
        email: email,
        password: password,
      });
      await person.save();
      return res.status(201).json({ person });
    }else{
        return res.status(400).json({msg: "Please add all values in the request body"});
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    
    // Fetch all recipes from the database
    const recipes = await Recipe.find({}).populate('category');
  
    return res.status(200).json({ recipes });
    
   
  } catch (error) {
    console.error('Error fetching recipes:', error);
   return  res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllCategories = async (req, res) => {
  try {
    // Fetch all categories from the Categories model
    const categories = await Categories.find();

    // Send the fetched categories as a response
    res.status(200).json({ categories });
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


async function fetchAreasData(req, res) {
  try {
    // Fetch all areas data from the Area model
    const areasData = await Area.find({}, '-_id areaName imageUrl');
    
    // Send the fetched data as a response to the frontend
    res.json(areasData);
  } catch (error) {
    console.error('Error fetching areas:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const getRecipeById = async (req, res) => {
  const { recipeId } = req.params;
  try {   
    const recipe = await Recipe.findById(recipeId).populate('category');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ recipe });
  } catch (error) {
    console.error('Error fetching recipe:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const searchRecipes = async (req, res) => {
  const { search } = req.query;
  try {
    // Perform a case-insensitive search for recipes whose title or description contains the search query
    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } }
      ]
    });
    res.status(200).json({ recipes });
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  login,
  register,
  dashboard,
  getAllUsers,
  getAllRecipes,
  getRecipeById,
  searchRecipes,
  getAllCategories,
  fetchAreasData,
  fetchAreasData,
};
