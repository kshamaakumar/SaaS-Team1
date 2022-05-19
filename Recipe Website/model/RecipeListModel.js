"use strict";
exports.__esModule = true;
exports.RecipeListModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var RecipeListModel = /** @class */ (function () {
    function RecipeListModel() {
        this.createSchema();
        this.createModel();
    }
    RecipeListModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            recipeId: Number,
            recipeName: String,
            description: String,
            userId: Number
        }, { collection: 'recipes' });
    };
    RecipeListModel.prototype.modelAlreadyDeclared = function () {
        try {
            Mongoose.model('Recipe'); // it throws an error if the model is still not defined
            return true;
        }
        catch (e) {
            return false;
        }
    };
    RecipeListModel.prototype.createModel = function () {
        if (!this.modelAlreadyDeclared()) {
            this.model = mongooseConnection.model("Recipe", this.schema);
        }
    };
    RecipeListModel.prototype.retrieveAllRecipes = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    RecipeListModel.prototype.retrieveRecipeCount = function (response) {
        console.log("retrieve Recipe Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec(function (err, numberOfRecipes) {
            console.log("numberOfRecipes: " + numberOfRecipes);
            response.json(numberOfRecipes);
        });
    };
    return RecipeListModel;
}());
exports.RecipeListModel = RecipeListModel;
