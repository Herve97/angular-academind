import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipe/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('This is a test', 'It simply a test',
  //     'https://www.saveur.com/uploads/2019/03/18/ANCDB4F3BMARGPMVAAFC4AJQHM-1536x1152.jpg', [
  //       new Ingredient('Meat', 1), new Ingredient('French Fries', 20)
  //     ]
  //   ),
  //   new Recipe('This is a test2', 'It simply a test2',
  //   'https://www.saveur.com/uploads/2019/02/08/ICSVD7ATCBISYMQK36NXE3SCBI-1536x1152.jpg', [
  //     new Ingredient('Buns', 2), new Ingredient('Meat', 1)
  //   ]
  //   ),
  //   new Recipe('This is a test3', 'It simply a test3',
  //     'https://www.saveur.com/uploads/2020/11/20/Y7RZPFZEERAZVHJ2VHC2RXMEEY.jpg?quality=85&width=540', [
  //       new Ingredient('Meat', 1), new Ingredient('French Fries', 20)
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeSelected.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes.slice()[index];
  }


  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeSelected.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeSelected.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeSelected.next(this.recipes.slice());
  }

}
