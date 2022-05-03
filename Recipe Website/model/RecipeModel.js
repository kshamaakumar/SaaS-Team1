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
    RecipeModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Recipes", this.schema);
    };
    RecipeModel.prototype.retrieveTasksDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
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
    return RecipeModel;
}());
exports.RecipeModel = RecipeModel;
