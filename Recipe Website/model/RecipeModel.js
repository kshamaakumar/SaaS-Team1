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
            accountId: Number,
            recipes: [
                {
                    recipeId: Number,
                    recipeName: String,
                    description: String
                }
            ]
        }, { collection: 'recipes' });
    };
    RecipeModel.prototype.modelAlreadyDeclared = function () {
        try {
            Mongoose.model('Recipes'); // it throws an error if the model is still not defined
            return true;
        }
        catch (e) {
            return false;
        }
    };
    RecipeModel.prototype.createModel = function () {
        if (!this.modelAlreadyDeclared()) {
            this.model = mongooseConnection.model("Recipes", this.schema);
        }
    };
    RecipeModel.prototype.retrieveTasksDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    // Has some error
    RecipeModel.prototype.retrieveTasksCount = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, innerTaskList) {
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
    };
    RecipeModel.prototype.addRecipe = function (res, recipe, filter) {
        var _this = this;
        var query = this.model.findOne(filter);
        query.exec(function (err, item) {
            console.log("Session: %j", item);
            var newRecipes = item.recipes;
            //console.log(item);
            newRecipes.push(recipe);
            //console.log(recipe);
            var insertQuery = _this.model.findOneAndUpdate(filter, { recipes: newRecipes }, {
                "new": true
            });
            console.log();
            insertQuery.exec(function (err, itemArray) {
                console.log(err);
                console.log("Session333333: %j", itemArray);
                res.json(itemArray);
            });
        });
    };
    return RecipeModel;
}());
exports.RecipeModel = RecipeModel;
