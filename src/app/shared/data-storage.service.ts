import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RecipeService } from '../service/recipe.service';
import { map, catchError, tap, take, exhaustMap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Recipe } from '../recipe/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  error = new Subject<string>();

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://academind-project-c0501-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchRecipes() {
    // La fonction take nous permet de spécifier à l'observable que nous voulons avoir qu'une valeur
    // exhaustMap attend la fin du 1er observable afin de renvoyer un nouveau observable

    return this.http
      .get<Recipe[]>(
        'https://academind-project-c0501-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        catchError((errorRes) => {
          // Send to Analytics server
          return throwError(errorRes);
        }),

        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}

/*



*/
