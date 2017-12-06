import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();   // add @Output to enable listening from parent component
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://purewows3.imgix.net/images/articles/2017_10/spicy_whole_roasted_cauliflower_recipe_HERO.jpg?auto=format,compress&cs=strip'),
    new Recipe('Another Test Recipe', 'This is another simple test','https://purewows3.imgix.net/images/articles/2017_10/spicy_whole_roasted_cauliflower_recipe_HERO.jpg?auto=format,compress&cs=strip')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
