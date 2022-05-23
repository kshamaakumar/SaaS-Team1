import { Component, OnInit } from '@angular/core';
import { RecipeApiService } from "../recipe-api.service"
import { RecipeClass } from '../recipe-class';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  recipeId: number = 0;
  results = {} as RecipeClass;

  constructor(private route: ActivatedRoute, private apiService: RecipeApiService) { }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.params['recipeId'];
    this.apiService.getRecipes().subscribe((result:RecipeClass[]) =>{
      this.results = result[this.recipeId - 1];
      console.log('Recipes are:' + JSON.stringify(result));
    });
  }

}
