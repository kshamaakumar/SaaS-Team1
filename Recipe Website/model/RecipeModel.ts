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
                cookTime: String,
                author: String,
                imageUrl: String,
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

    public createRecipe(response:any, recipe:string){
        var query = this.model.find({}).sort('-recipeId').limit(1);
        query.exec( (err, item) => {
            console.log('error received:'+err);
            var itemString=JSON.stringify(item);
            var itemStringJson=JSON.parse(itemString);
            const maxRecipeId = itemStringJson[0].recipeId;
            console.log('query fetched recipe id: %s',maxRecipeId);
            var recipeJson=JSON.parse(recipe);
            recipeJson.recipeId = maxRecipeId+1;
            console.log('new recipeID '+recipeJson.recipeId);

            this.model.create([recipeJson], (err) => {
                if (err) {
                    console.log('object creation failed');
                }
            });
            response.send('{"id":"' + recipeJson.recipeId + '"}');
        });
    }

    public retrieveRecipeByUserId(response:any, user:String) {
        var query = this.model.find({userId: user});
        query.exec( (err, itemArray) => {
            response.json(itemArray);
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