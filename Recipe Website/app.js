"use strict";
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var RecipeModel_1 = require("./model/RecipeModel");
var UserModel_1 = require("./model/UserModel");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Recipes = new RecipeModel_1.RecipeModel();
        this.Users = new UserModel_1.UserModel();
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
            _this.Users.retrieveUserDetails(res, { userId: id });
        });
        router.get('/app/user/', function (req, res) {
            console.log('Query All Users');
            _this.Users.retrieveAllUsers(res);
        });
        router.get('/app/recipe/:recipeId', function (req, res) {
            var id = req.params.recipeId;
            console.log('Query single recipe detail with recipeId: ' + id);
            _this.Recipes.retrieveRecipeDetails(res, { recipeId: id });
        });
        router.get('/app/recipe/', function (req, res) {
            console.log('Query All Recipes');
            _this.Recipes.retrieveAllRecipes(res);
        });
        router.get('/app/recipeuser/:userId', function (req, res) {
            var id = req.params.userId;
            console.log('Query recipes with userId: ' + id);
            _this.Recipes.retrieveRecipeByUserId(res, id);
        });
        router.get('/app/search/:word', function (req, res) {
            var word = req.params.word;
            console.log('Query recipes with keyWord: ' + word);
            _this.Recipes.retrieveRecipeByKeyword(res, word);
        });
        /*
        router.post('/app/recipe/:accountId', (req, res) => {
          console.log('Add recipe'+req.body.recipeName);
          var id = req.params.accountId;
          this.Recipes.addRecipe(res, req.body, {accountId: id});
        });
        */
        //API to add a new Recipe
        router.post('/app/recipe/:accountId', function (req, res) {
            //const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.userId = req.params.accountId;
            _this.Recipes.createRecipe(res, JSON.stringify(jsonObj));
        });
        var cors = require('cors');
        this.expressApp.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
        }));
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    };
    return App;
}());
exports.App = App;
