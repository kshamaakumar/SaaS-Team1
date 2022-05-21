import Mongoose = require("mongoose");


interface IUserModel extends Mongoose.Document {
    userId: number;
    userName: string;
    followers:  number;
    following: number;
    likes: number;
    recipes: [ {
        recipeId: number;
    }];
    ingredientList: [ {
        ingId: number;
        ingredient: string;
    }];
}
export {IUserModel};