import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { ShoppingListService } from '../service/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients!: Ingredient[];
  private idChangeSub!: Subscription;

  constructor(private shoppingService: ShoppingListService, private loggingService: LoggingService) { }


  ngOnInit(): void {

    this.ingredients = this.shoppingService.getIngredients();
    // this.shoppingService.ingredientAdded.subscribe((ingredient) =>{
    //   this.ingredients.push(ingredient);
    // });

    this.idChangeSub = this.shoppingService.ingredientChanged.subscribe((ingredient: Ingredient[]) =>{
      this.ingredients = ingredient;
    });

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');

  }

  ngOnDestroy(): void {
    this.idChangeSub.unsubscribe();
  }

  onEditItem(id: number){
    this.shoppingService.startedEditing.next(id);
  }

  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  //   console.log("Ingredient pushed: " + this.ingredients[-1]);
  // }

}
