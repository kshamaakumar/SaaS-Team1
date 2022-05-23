export interface RecipeClass {
    recipeId: number;
    userId: number;
    recipeName: string;
    ingredients:[];
    description: string;
    calorie:number;
    cookTime: string;
    author: string;
}