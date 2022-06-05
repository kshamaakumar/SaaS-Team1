import { Injectable } from '@angular/core';
import { RecipeClass } from './recipe-class';
import { UserClass } from './user-class';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {

  //hostUrl:string = 'http://localhost:8080/';
  hostUrl:string = "";

  constructor(private http: HttpClient) {
  }

  getRecipes(){
    return this.http.get<RecipeClass[]>(this.hostUrl + 'app/recipe/');
  }

  getRecipesByUser(userId:number){
    return this.http.get<RecipeClass[]>(this.hostUrl + 'app/recipeuser/' + userId);
  }

  getSpecificUserProfile(userId:number){
    return this.http.get<UserClass>(this.hostUrl + 'app/user/' + userId);
  }
}
