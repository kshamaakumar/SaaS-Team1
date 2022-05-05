import * as express from 'express';
import * as bodyParser from 'body-parser';
import {RecipeListModel} from './model/RecipeListModel';
import {RecipeModel} from './model/RecipeModel';
import * as crypto from 'crypto';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public RecipeLists:RecipeListModel;
  public Recipes:RecipeModel;


  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.RecipeLists = new RecipeListModel();
    this.Recipes = new RecipeModel();
  }



  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }



  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get('/app/recipes/:accountId', (req, res) => {  
        var id = req.params.accountId;
        console.log('Query single list with accountId: ' + id);
        this.Recipes.retrieveUserDetails(res, {accountId: id});
    });
    
    router.get('/app/recipes/', (req, res) => {
      console.log('Query All list');
      this.RecipeLists.retrieveAllRecipes(res);
    });

    router.post('/app/recipe/:accountId', (req, res) => {
      console.log('Add recipe'+req.body.recipeName);
      var id = req.params.accountId;
      this.Recipes.addRecipe(res, req.body, {accountId: id});
    });

  



    this.expressApp.use('/', router);
    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
  }
}

export {App};