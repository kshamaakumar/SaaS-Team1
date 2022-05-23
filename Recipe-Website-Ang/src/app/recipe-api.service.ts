import { Injectable } from '@angular/core';
import { RecipeClass } from './recipe-class';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {

  hostUrl:string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  getRecipes(){
    return this.http.get<RecipeClass[]>(this.hostUrl + 'app/recipe/');
  }
}
