import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IRecipeModel} from '../interfaces/IRecipeModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class RecipeModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                recipeId: Number,
                userId: Number,
                recipeName: String,
                ingredients: [],
                description: String,
                calorie: Number,
                cookTime: Number,
                author: String,
            }, {collection: 'recipes'}
        );
    }


    public createModel(): void {
        this.model = mongooseConnection.model<IRecipeModel>("Recipe", this.schema);
    }

    public retrieveRecipeDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveAllRecipes(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }
    /*
    public addRecipe(res: any, recipe: Object, filter: Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, item) => {
            console.log("Session: %j",item);
            var newRecipes = item.recipes;
            newRecipes.push(recipe);
            var insertQuery = this.model.findOneAndUpdate(filter, {recipes:newRecipes}, {
                new: true
            });
            console.log();
            insertQuery.exec( (err, itemArray) => {
                console.log(err);
                console.log("Updated document: %j",itemArray);
                res.json(itemArray);

            });
        });
    }
    */

    /*
        // Has some error
    public retrieveRecipesCount(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, innerRecipeList) => {
            if (err) {
                console.log('error retrieving count');
            }
            else {
                if (innerRecipeList == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('number of tasks: ' + innerRecipeList.recipes.length);
                    response.json('{count:' + innerRecipeList.recipes.length + '}');
                }
            }
        });
    }
    */

}
export {RecipeModel};