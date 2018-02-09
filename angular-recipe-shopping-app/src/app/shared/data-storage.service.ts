import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import "rxjs/Rx";
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {

  }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-71140.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get('https://ng-recipe-book-71140.firebaseio.com/recipes.json?auth=' + token).map((response: Response) => {
      const recipes: Recipe[] = response.json();
      // ensure the fetched data follow the Recipe format (no missing fields such as ingredients)
      for(let recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return recipes;
    }).subscribe((recipes: Recipe[] ) => {
      this.recipeService.setRecipes(recipes);
    });
  }
}