import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
    public schema:any;
    public innerSchema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                userId: Number,
                userName: String,
                followers:  Number,
                following: Number,
                likes: Number,
                recipes: [
                    {
                        recipeId: Number,
                    }        
                ],
                ingredientList: [ {
                    ingId: Number,
                    ingredient: String,
                }]
            }, {collection: 'users'}
        );
    }
    
    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("User", this.schema);
    }


    public retrieveUserDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveAllUsers(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

/*
    public retrieveRecipeCount(response:any): any {
        console.log("retrieve Recipe Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec( (err, numberOfRecipes) => {
            console.log("numberOfRecipes: " + numberOfRecipes);
            response.json(numberOfRecipes) ;
        });
    }
*/

}
export {UserModel};