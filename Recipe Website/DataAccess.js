"use strict";
exports.__esModule = true;
exports.DataAccess = void 0;
var Mongoose = require("mongoose");
var DataAccess = /** @class */ (function () {
    function DataAccess() {
        DataAccess.connect();
    }
    DataAccess.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", function () {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    };
    // static DB_CONNECTION_STRING:string = 'mongodb://dbAdmin:test@127.0.0.1:27017/recipeWebsiteDatabase?authSource=admin';
    // The above is to connet local mongoDB, the following is to connect to cloud mongoDB
    DataAccess.DB_CONNECTION_STRING = 'mongodb+srv://dbAdmin:test@cluster0.m4cmdsp.mongodb.net/recipeWebsiteDatabase?retryWrites=true&w=majority';
    return DataAccess;
}());
exports.DataAccess = DataAccess;
DataAccess.connect();
