import Mongoose = require("mongoose");

interface IRecipeListModel extends Mongoose.Document {
    recipeId: number;
    recipeName: string;
    description: string;
}
export {IRecipeListModel};