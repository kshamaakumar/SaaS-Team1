import { Component, OnInit } from '@angular/core';
import { RecipeApiService } from "../recipe-api.service"
import { RecipeClass } from '../recipe-class';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  userId: number = 0;
  results: Array<RecipeClass> = [];

  constructor(private route: ActivatedRoute, private apiService: RecipeApiService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.apiService.getRecipesByUser(this.userId).subscribe((result:RecipeClass[]) =>{
      this.results = result;
      console.log('Recipes are:' + JSON.stringify(result));
    });
  }

}
