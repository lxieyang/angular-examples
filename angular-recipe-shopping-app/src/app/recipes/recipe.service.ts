import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  
  private recipes: Recipe[] = [
    new Recipe(
      'Trump Burger', 
      'This is the burger that the president loves.', 
      'https://www.tellusaboutus.com/comments/images/BK-WebComment/BB_WHOPPER-v1.png',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 50)
      ]
    ),
    new Recipe(
      'Giant Pizza', 
      'This is the pizza that the first lady hates.',
      'https://purewows3.imgix.net/images/articles/2017_10/spicy_whole_roasted_cauliflower_recipe_HERO.jpg?auto=format,compress&cs=strip', 
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ];

  constructor(
    private slService: ShoppingListService
  ) {

  }

  getRecipes() {
    return this.recipes.slice();  // ,slice() make a exact copy, not returning the reference to the original array
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}