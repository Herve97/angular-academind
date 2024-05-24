import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {

  selectedRecipe!: Recipe;

  private recipeSub !: Subscription;

  constructor( private recipeService: RecipeService, private loggingService: LoggingService) { }

  ngOnInit(): void {
    // la methode subscribe est un écouteur d'action.
    // this.recipeSub = this.recipeService.recipeSelected.subscribe((recipe: Recipe) =>{
    //   this.selectedRecipe = recipe;
    // });

    this.loggingService.printLog('Hello from RecipeComponent ngOnInit');
  }

  ngOnDestroy(): void {
    // this.recipeSub.unsubscribe();
  }

}
