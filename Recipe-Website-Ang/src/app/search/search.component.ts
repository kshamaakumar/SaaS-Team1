import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeApiService } from "../recipe-api.service"
import { RecipeClass } from '../recipe-class';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  results: Array<RecipeClass> = [];
  filtere: Array<RecipeClass> = [];

  constructor(private route: ActivatedRoute, private apiService: RecipeApiService) { }

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe((result:RecipeClass[]) =>{
      this.results = result;
      console.log('Recipes are:' + JSON.stringify(result));
    });
  }

  applyFilter(filterValue:string){
    let filterValueLower = filterValue.toLowerCase();
         if(filterValue === 'Egg' ) {
            this.filtere = this.results;
         } 
         //else {
         //}
  }

}
