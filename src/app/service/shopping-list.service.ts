import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  // ingredientAdded = new EventEmitter<Ingredient>();
  // ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Carotte', 2),
    new Ingredient('Apples', 5),
    new Ingredient('Courge', 4)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIndredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    // this.ingredientChanged.emit(this.ingredients.slice());
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    // for(let ingredient of ingredients){
    //   this.addIngredient(ingredient); 
    // }
    // this.ingredientChanged.emit(this.ingredients.slice());

    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());

  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }


}
