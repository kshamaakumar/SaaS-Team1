import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { HomeComponent } from './home/home.component';
import { FoodPageComponent } from './food-page/food-page.component';

const routes: Routes = [
  {path: 'recipe', component:  RecipeComponent},
  { path: '', component:  HomeComponent},
  {path: 'food-page', component:  FoodPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
