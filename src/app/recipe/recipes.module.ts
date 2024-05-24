import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeComponent } from "./recipe.component";
import { RecipesRoutingModule } from "./recipes-routing.module";

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeItemComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ]
  // ,
  // exports: [
  //   RecipeComponent,
  //   RecipeDetailComponent,
  //   RecipeEditComponent,
  //   RecipeStartComponent,
  //   RecipeListComponent,
  //   RecipeItemComponent
  // ]
})
export class RecipesModule{

}
