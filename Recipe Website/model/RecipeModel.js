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
            userId: Number,
            recipeName: String,
            ingredients: [],
            description: String,
            calorie: Number,
            cookTime: String,
            author: String,
            imageUrl: String
        }, { collection: 'recipes' });
    };
    RecipeModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Recipe", this.schema);
    };
    RecipeModel.prototype.retrieveRecipeDetails = function (response, filter) {
        var query = this.model.findOne(filter);
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    RecipeModel.prototype.retrieveAllRecipes = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    RecipeModel.prototype.createRecipe = function (response, recipe) {
        var _this = this;
        var query = this.model.find({}).sort('-recipeId').limit(1);
        query.exec(function (err, item) {
            console.log('error received:' + err);
            var itemString = JSON.stringify(item);
            var itemStringJson = JSON.parse(itemString);
            var maxRecipeId = itemStringJson[0].recipeId;
            console.log('query fetched recipe id: %s', maxRecipeId);
            var recipeJson = JSON.parse(recipe);
            recipeJson.recipeId = maxRecipeId + 1;
            console.log('new recipeID ' + recipeJson.recipeId);
            _this.model.create([recipeJson], function (err) {
                if (err) {
                    console.log('object creation failed');
                }
            });
            response.send('{"id":"' + recipeJson.recipeId + '"}');
        });
    };
    RecipeModel.prototype.retrieveRecipeByUserId = function (response, user) {
        var query = this.model.find({ userId: user });
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    return RecipeModel;
}());
exports.RecipeModel = RecipeModel;
