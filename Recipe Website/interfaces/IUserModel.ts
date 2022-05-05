import Mongoose = require("mongoose");


interface IUserModel extends Mongoose.Document {
    accountId: number;
    userName: string;
    recipes: [ {
        accountId: number;
        recipeName: string;
        description: string;
    }];
}
export {IUserModel};