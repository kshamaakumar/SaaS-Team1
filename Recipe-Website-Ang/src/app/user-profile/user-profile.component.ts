import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeApiService } from '../recipe-api.service';
import {UserClass} from '../user-class';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // default value
  userId: number = -1;
  userProfileInfo: UserClass = {
    userId : -1,
    userName : 'default',
    followers : 0,
    following : 0,
    likes : 0,
    recipes : [{recipeId:-1}],
    ingredientList : [{
      ingId: 1,
      ingredient: 'default'
  }]
  } ;

  constructor(private route: ActivatedRoute, private apiService: RecipeApiService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    console.log('userId: ' + this.userId);
    this.apiService.getSpecificUserProfile(this.userId).subscribe((result: UserClass) => 
    {
      this.userProfileInfo = result;
      console.log('detail result' + JSON.stringify(result));
    });
  }

}
