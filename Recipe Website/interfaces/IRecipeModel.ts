import Mongoose = require("mongoose");

interface IRecipeModel extends Mongoose.Document {
    recipeId: number;
    userId: number;
    recipeName: string;
    ingredients:[];
    description: string;
    calorie:number;
    cookTime: string;
    author: string;
}
export {IRecipeModel};