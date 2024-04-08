const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    ingredient: String,
    measure: String
});

const recipeSchema = new Schema({
    idMeal: {
        type: String,
        required: true,
        unique: true
    },
    strMeal: {
        type: String,
        required: true
    },
    category: { // Reference to Category model
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    strArea: {
        type: String,
        required: true
    },
    strInstructions: {
        type: String,
        required: true
    },
    strMealThumb: {
        type: String,
        required: true
    },
    strTags: [String],
    strYoutube: {
        type: String,
        default: null
    },
    ingredients: [ingredientSchema],
    strSource: {
        type: String,
        default: null
    },
    strImageSource: {
        type: String,
        default: null
    },
    dateModified: {
        type: Date,
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
