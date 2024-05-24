import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/service/recipe.service';
import { ShoppingListService } from 'src/app/service/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // https://www.saveur.com/uploads/2019/02/08/FBQB3QRDN77LITVACXCYZX25Q4-1536x1152.jpg

  // @Input() recipe!: Recipe;
  recipe!: Recipe;
  id!: number;

  constructor(private recipeService: RecipeService, private sLService: ShoppingListService, 
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    }); 
  }

  onAddShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
