import Mongoose = require("mongoose");


interface IRecipeModel extends Mongoose.Document {
    accountId: number;
    recipes: [ {
        accountId: number;
        recipeName: string;
        description: string;
    }];
}
export {IRecipeModel};