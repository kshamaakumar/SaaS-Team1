import Mongoose = require("mongoose");

interface IRecipeModel extends Mongoose.Document {
    recipeId: number;
    userId: number;
    recipeName: string;
    ingredients:[];
    description: string;
    calorie:number;
    cookTime: number;
    author: string;
}
export {IRecipeModel};