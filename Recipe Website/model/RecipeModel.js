"use strict";
exports.__esModule = true;
exports.RecipeModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var RecipeModel = /** @class */ (function () {
    function RecipeModel() {
        this.createSchema();
        this.createModel();
    }
    RecipeModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            recipeId: Number,
            recipeName: String,
            description: String,
            userId: Number
        }, { collection: 'recipes' });
    };
    RecipeModel.prototype.modelAlreadyDeclared = function () {
        try {
            Mongoose.model('Recipe'); // it throws an error if the model is still not defined
            return true;
        }
        catch (e) {
            return false;
        }
    };
    RecipeModel.prototype.createModel = function () {
        if (!this.modelAlreadyDeclared()) {
            this.model = mongooseConnection.model("Recipe", this.schema);
        }
    };
    RecipeModel.prototype.retrieveAllRecipes = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    RecipeModel.prototype.retrieveRecipeCount = function (response) {
        console.log("retrieve Recipe Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec(function (err, numberOfRecipes) {
            console.log("numberOfRecipes: " + numberOfRecipes);
            response.json(numberOfRecipes);
        });
    };
    return RecipeModel;
}());
exports.RecipeModel = RecipeModel;