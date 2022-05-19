import Mongoose = require("mongoose");


interface IUserModel extends Mongoose.Document {
    userId: number;
    userName: string;
    recipes: [ {
        recipeId: number;
    }];
}
export {IUserModel};