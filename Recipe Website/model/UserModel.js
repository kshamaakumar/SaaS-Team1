"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.createSchema();
        this.createModel();
    }
    UserModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userId: Number,
            userName: String,
            recipes: [
                {
                    recipeId: Number
                }
            ]
        }, { collection: 'users' });
    };
    UserModel.prototype.createModel = function () {
        if (!this.modelAlreadyDeclared()) {
            this.model = mongooseConnection.model("User", this.schema);
        }
    };
    UserModel.prototype.modelAlreadyDeclared = function () {
        try {
            Mongoose.model('Users'); // it throws an error if the model is still not defined
            return true;
        }
        catch (e) {
            return false;
        }
    };
    UserModel.prototype.retrieveUserDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    UserModel.prototype.retrieveRecipe = function (response, accountId, recipeId) {
        var query = this.model.findOne(accountId);
        var recipe = query.recipes.findOne(recipeId);
        recipe.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    // Has some error
    UserModel.prototype.retrieveRecipesCount = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, innerRecipeList) {
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
    };
    UserModel.prototype.addRecipe = function (res, recipe, filter) {
        var _this = this;
        var query = this.model.findOne(filter);
        query.exec(function (err, item) {
            console.log("Session: %j", item);
            var newRecipes = item.recipes;
            newRecipes.push(recipe);
            var insertQuery = _this.model.findOneAndUpdate(filter, { recipes: newRecipes }, {
                "new": true
            });
            console.log();
            insertQuery.exec(function (err, itemArray) {
                console.log(err);
                console.log("Updated document: %j", itemArray);
                res.json(itemArray);
            });
        });
    };
    return UserModel;
}());
exports.UserModel = UserModel;
