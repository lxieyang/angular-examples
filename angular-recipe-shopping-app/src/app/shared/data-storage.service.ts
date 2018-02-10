import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import "rxjs/Rx";
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(
    // private http: Http,
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {

  }

  storeRecipes() {
    // const token = this.authService.getToken();  // ----> moved to be handled in the AuthInterceptor
    // return this.http.put('https://ng-recipe-book-71140.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());

    // new way:
    // return this.httpClient.put(
    //   'https://ng-recipe-book-71140.firebaseio.com/recipes.json', 
    //   this.recipeService.getRecipes(), {
    //     // observe: 'events',
    //     observe: 'body',
    //     params: new HttpParams().append('auth', token)
    //     // headers: new HttpHeaders().set('Authorization', 'Bearer kajlsdfkhajkdhn723hui2').append('FileSize', '16kb')
    //   }
    // );

    // to be able to check status of the requests:
    const req = new HttpRequest(
      'PUT', 
      'https://ng-recipe-book-71140.firebaseio.com/recipes.json', 
      this.recipeService.getRecipes(), 
      {
        reportProgress: true,
        // params: new HttpParams().append('auth', token)  //  ----> moved to be handled in the AuthInterceptor
      });
    return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();  //  ----> moved to be handled in the AuthInterceptor

    // this.http.get('https://ng-recipe-book-71140.firebaseio.com/recipes.json?auth=' + token).map((response: Response) => {
    //   const recipes: Recipe[] = response.json();
    //   // ensure the fetched data follow the Recipe format (no missing fields such as ingredients)
    //   for(let recipe of recipes) {
    //     if (!recipe['ingredients']) {
    //       recipe['ingredients'] = [];
    //     }
    //   }
    //   return recipes;
    // }).subscribe((recipes: Recipe[] ) => {
    //   this.recipeService.setRecipes(recipes);
    // });


    // override default:
    // this.httpClient.get(
    //   'https://ng-recipe-book-71140.firebaseio.com/recipes.json?auth=' + token,
    //   {
    //     observe: 'body',
    //     responseType: 'text'
    //   }
    // )

    this.httpClient.get<Recipe[]>('https://ng-recipe-book-71140.firebaseio.com/recipes.json?', {
      // params: new HttpParams().append('auth', token)  //  ----> moved to be handled in the AuthInterceptor
    }).map((recipes) => {
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