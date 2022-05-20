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
                recipeName: String,
                description: String,
                userId: Number,
            }, {collection: 'recipes'}
        );
    }

    public modelAlreadyDeclared() {
        try {
          Mongoose.model('Recipe')  // it throws an error if the model is still not defined
          return true
        } catch (e) {
          return false
        }
      }

    public createModel(): void {
        if (!this.modelAlreadyDeclared()){
            this.model = mongooseConnection.model<IRecipeModel>("Recipe", this.schema);
        }
    }

    public retrieveAllRecipes(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    public retrieveRecipeCount(response:any): any {
        console.log("retrieve Recipe Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec( (err, numberOfRecipes) => {
            console.log("numberOfRecipes: " + numberOfRecipes);
            response.json(numberOfRecipes) ;
        });
    }

}
export {RecipeModel};