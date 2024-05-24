import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id!: number;
  editMode = false;
  recipeForm!: FormGroup;

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, 
    private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath = '';
    let recipeDescription = '';
    // let recipeIngredients =this.formBuilder.array([]);
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }

    }

    this.recipeForm = this.formBuilder.group({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(recipeImagePath, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "ingredients": recipeIngredients
    });

    console.log(recipeIngredients)

    /*
      this.recipeForm = new FormGroup({
        "name": new FormControl(recipeName),
        "imagePath": new FormControl(recipeImagePath),
        "description": new FormControl(recipeDescription),
        "ingredients": recipeIngredients
        });
    */


  }

  get controls() { // a getter!
    // return (this.recipeForm.get('ingredients') as FormArray).controls;
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  // get getControl(){
  //   console.log((<FormArray>this.recipeForm.get('ingredients')).controls)
  //   return (<FormArray>this.recipeForm.get('ingredients')).controls;
  //   // return this.recipeForm.controls;
  // }

  // get ingredients() : FormArray {
  //   return this.recipeForm.get("ingredients") as FormArray
  // }

  onSubmit(){
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
