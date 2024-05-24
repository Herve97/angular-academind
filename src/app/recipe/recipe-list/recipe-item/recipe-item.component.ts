import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/app/service/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe!: Recipe;
  @Input() index!: number;

  // @Output() recipeSelected = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSelected(){
    // this.recipeSelected.emit();
    // this.recipeService.recipeSelected.emit(this.recipe);
    //this.recipeService.recipeSelected.next(this.recipe);
  }

}
