export interface UserClass {
    userId: number;
    userName: string;
    followers:  number;
    following: number;
    likes: number;
    recipes: [ {
        recipeId: number;
    }];
    ingredientList: [ {
        ingId: number;
        ingredient: string;
    }];
}

