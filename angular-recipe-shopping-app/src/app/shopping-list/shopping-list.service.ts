import { EventEmitter } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';


export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Banana', 50),
    new Ingredient('Tomato', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ing of ingredients) {
    //   this.addIngredient(ing);
    // }
    this.ingredients.push(...ingredients);  // ES6 spread operator to spread elements in an array to be pushed
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}