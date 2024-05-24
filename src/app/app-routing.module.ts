import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RecipesModule } from "./recipe/recipes.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";


const appRoutes: Routes = [

  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', loadChildren: ()=> RecipesModule},
  {path: 'shopping-list', loadChildren: ()=> ShoppingListModule}
  // {path: 'recipes', loadChildren: './recipe/recipes.module#RecipesModule'}

];


@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
