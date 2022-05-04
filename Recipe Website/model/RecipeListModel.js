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
            accountId: Number,
            recipeName: String,
            description: String,
            listId: String,
            due: String,
            state: String,
            owner: String
        }, { collection: 'recipes' });
    };
    RecipeListModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Recipes", this.schema);
    };
    RecipeListModel.prototype.retrieveAllLists = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    RecipeListModel.prototype.retrieveListCount = function (response) {
        console.log("retrieve List Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec(function (err, numberOfLists) {
            console.log("numberOfLists: " + numberOfLists);
            response.json(numberOfLists);
        });
    };
    return RecipeListModel;
}());
exports.RecipeListModel = RecipeListModel;
