import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {IRecipeListModel} from '../interfaces/IRecipeListModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class RecipeListModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                accountId: Number,
                recipeName: String,
                description: String,
                listId: String,
                due: String,
                state: String,
                owner: String
            }, {collection: 'recipes'}
        );
    }

    public modelAlreadyDeclared() {
        try {
          Mongoose.model('RecipeList')  // it throws an error if the model is still not defined
          return true
        } catch (e) {
          return false
        }
      }

    public createModel(): void {
        if (!this.modelAlreadyDeclared()){
            this.model = mongooseConnection.model<IRecipeListModel>("RecipeList", this.schema);
        }
    }

    public retrieveAllLists(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    public retrieveListCount(response:any): any {
        console.log("retrieve List Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec( (err, numberOfLists) => {
            console.log("numberOfLists: " + numberOfLists);
            response.json(numberOfLists) ;
        });
    }

}
export {RecipeListModel};