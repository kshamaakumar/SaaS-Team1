import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: 'recipe', component:  RecipeComponent},
  { path: '', component:  SearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
