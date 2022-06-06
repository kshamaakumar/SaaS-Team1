import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './user-recipes/recipe.component';
import { HomeComponent } from './home/home.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path: 'user_recipes/:userId', component:  RecipeComponent},
  { path: '', component:  HomeComponent},
  {path: 'user_profile/:userId', component:  UserProfileComponent},
  {path: 'food-page/:recipeId', component:  FoodPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }