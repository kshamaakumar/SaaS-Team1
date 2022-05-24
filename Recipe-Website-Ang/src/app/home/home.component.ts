import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeApiService } from "../recipe-api.service"
import { RecipeClass } from '../recipe-class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  results: Array<RecipeClass> = [];
  filtere: Array<RecipeClass> = [];

  constructor(private route: ActivatedRoute, private apiService: RecipeApiService) { }

  ngOnInit(): void {
    
    this.apiService.getRecipes().subscribe((result:RecipeClass[]) =>{
      this.results = result;
      this.filtere = [];
      console.log('Recipes are:' + JSON.stringify(result));
    });
  }

  applyFilter(filterValue:string){
    //let filterValueLower = filterValue.toLowerCase();
    for(var recipe of this.results){
         if(recipe.recipeName.includes(filterValue)) {
            this.filtere.push(recipe);
            console.log(recipe.recipeName);
         } 
    }
  }
}
