import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  userProfile(userId:number): string {
    return "/user_profile/" + userId;
  }

  userRecipes(userId:number): string {
    return "/user_recipes/" + userId;
  }

}
