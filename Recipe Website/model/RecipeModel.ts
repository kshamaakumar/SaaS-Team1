import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IRecipeModel} from '../interfaces/IRecipeModel';
import { STATUS_CODES } from "http";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class RecipeModel {
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
                accountId: Number,
                userName: String,
                recipes: [
                    {
                        recipeId: Number,
                        recipeName: String,
                        description: String
                    }        
                ]
            }, {collection: 'recipes'}
        );
    }
    
    public createModel(): void {
        if (!this.modelAlreadyDeclared()){
            this.model = mongooseConnection.model<IRecipeModel>("Recipes", this.schema);
       }
    }


    public modelAlreadyDeclared() {
        try {
          Mongoose.model('Recipes')  // it throws an error if the model is still not defined
          return true
        } catch (e) {
          return false
        }
      }

    public retrieveTasksDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveRecipe(response:any, accountId:Object, recipeId:Object) {
        var query = this.model.findOne(accountId);
        var recipe = query.recipes.findOne(recipeId)
        recipe.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    // Has some error
    public retrieveTasksCount(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, innerTaskList) => {
            if (err) {
                console.log('error retrieving count');
            }
            else {
                if (innerTaskList == null) {
                    response.status(404);
                    response.json('{count: -1}');
                }
                else {
                    console.log('number of tasks: ' + innerTaskList.tasks.length);
                    response.json('{count:' + innerTaskList.tasks.length + '}');
                }
            }
        });
    }

    public addRecipe(res: any, recipe: Object, filter: { accountId: any }) {
        var query = this.model.findOne(filter);
        query.exec( (err, item) => {
            var newRecipes = item.recipes;
            newRecipes.push(recipe);
            var insertQuery = this.model.findOneAndUpdate(filter, {recipes:newRecipes});
            query.exec( (err, itemArray) => {
                res.json(itemArray);
            });
        });
    }
}
export {RecipeModel};