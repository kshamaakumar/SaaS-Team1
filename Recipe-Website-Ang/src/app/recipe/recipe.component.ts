import { Component, OnInit } from '@angular/core';
import { RecipeApiService } from "../recipe-api.service"
import { RecipeClass } from '../recipe-class';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  results: Array<RecipeClass> = [];

  constructor(private apiService: RecipeApiService) { }

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe((result:RecipeClass[]) =>{
      this.results = result;
      console.log('Recipes are:' + JSON.stringify(result));
    });
  }

}
