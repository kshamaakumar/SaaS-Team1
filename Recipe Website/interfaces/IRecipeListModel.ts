import Mongoose = require("mongoose");

interface IRecipeListModel extends Mongoose.Document {
    accountId: number;
    recipeName: string;
    description: string;
    listId: string;
    due: string;
    state: string;
    owner: string;
}
export {IRecipeListModel};