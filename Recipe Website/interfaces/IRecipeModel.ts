import Mongoose = require("mongoose");

interface IRecipeModel extends Mongoose.Document {
    recipeId: number;
    recipeName: string;
    description: string;
    userId: number;
}
export {IRecipeModel};