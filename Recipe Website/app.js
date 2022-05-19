"use strict";
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var RecipeListModel_1 = require("./model/RecipeListModel");
var UserModel_1 = require("./model/UserModel");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.RecipeLists = new RecipeListModel_1.RecipeListModel();
        this.Recipes = new UserModel_1.RecipeModel();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.get('/app/user/:userId', function (req, res) {
            var id = req.params.userId;
            console.log('Query single user detail with userId: ' + id);
            _this.Recipes.retrieveUserDetails(res, { userId: id });
        });
        router.get('/app/recipe/', function (req, res) {
            console.log('Query All recipes');
            _this.RecipeLists.retrieveAllRecipes(res);
        });
        /*
        router.post('/app/recipe/:accountId', (req, res) => {
          console.log('Add recipe'+req.body.recipeName);
          var id = req.params.accountId;
          this.Recipes.addRecipe(res, req.body, {accountId: id});
        });
        */
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    return App;
}());
exports.App = App;
