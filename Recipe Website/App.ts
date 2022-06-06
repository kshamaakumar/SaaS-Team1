import * as express from 'express';
import * as bodyParser from 'body-parser';
import {RecipeModel} from './model/RecipeModel';
import {UserModel} from './model/UserModel';
import * as crypto from 'crypto';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Recipes:RecipeModel;
  public Users:UserModel;


  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Recipes = new RecipeModel();
    this.Users = new UserModel();
  }



  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(function (req, res, next) {
      // Cross-Origin Resource Sharing 
      // CORS is an HTTP-header based mechanism that allows a server  
      // to indicate any origins (domain, scheme, or port) other than 
      // its own from which a browser  should permit loading resources
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

  }


  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get('/app/user/:userId', (req, res) => {  
        var id = req.params.userId;
        console.log('Query single user detail with userId: ' + id);
        this.Users.retrieveUserDetails(res, {userId: id});
    });
    
    router.get('/app/user/', (req, res) => {
      console.log('Query All Users');
      this.Users.retrieveAllUsers(res);
    });

    router.get('/app/recipe/:recipeId', (req, res) => {  
      var id = req.params.recipeId;
      console.log('Query single recipe detail with recipeId: ' + id);
      this.Recipes.retrieveRecipeDetails(res, {recipeId: id});
    });

    router.get('/app/recipe/', (req, res) => {
      console.log('Query All Recipes');
      this.Recipes.retrieveAllRecipes(res);
    });

    router.get('/app/recipeuser/:userId', (req, res) => {  
      var id = req.params.userId;
      console.log('Query recipes with userId: ' + id);
      this.Recipes.retrieveRecipeByUserId(res, id);
    });

    /*
    router.post('/app/recipe/:accountId', (req, res) => {
      console.log('Add recipe'+req.body.recipeName);
      var id = req.params.accountId;
      this.Recipes.addRecipe(res, req.body, {accountId: id});
    });
    */
   
    //API to add a new Recipe
    router.post('/app/recipe/:accountId', (req, res) => {
      //const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
      var jsonObj = req.body;
      jsonObj.userId = req.params.accountId;
      this.Recipes.createRecipe(res, JSON.stringify(jsonObj));
    });

    const cors = require('cors');
    this.expressApp.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
    }));

    this.expressApp.use('/', router);
    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
  }
}

export {App};