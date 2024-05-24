import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/service/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model'; 
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('nameInput', {static: true}) nameInputRef!: ElementRef;
  // @ViewChild('amountInput', {static: true}) amountInputRef!: ElementRef;

  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('f', {static: true}) slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingService.getIndredient(index);
      this.slForm.setValue({
        name: this.editedItem.name, 
        amount: this.editedItem.amount
      });

    });
  }

  onSubmit(form: NgForm){
    // const igName = this.nameInputRef.nativeElement.value;
    // const igAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(igName, igAmount);
    // this.shoppingService.ingredientAdded.emit(newIngredient);

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);  
    
    if(this.editMode){

      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
      
    }else{
      this.shoppingService.addIngredient(newIngredient);
    
    }    
    console.log(newIngredient)
    this.editMode = false;
    form.reset();

  }

  onDeleteItem(){
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClearItem();
  }

  onClearItem(){
    // this.nameInputRef.nativeElement.value = '';
    // this.amountInputRef.nativeElement.value = '';
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
