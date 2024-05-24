import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDiretive } from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null!;
  @ViewChild(PlaceholderDiretive, {static: false}) alertHost!: PlaceholderDiretive;

  private closeSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){

    if(!form.valid){
      return;
    }

    const telephone = form.value.telephone;
    const matricule = form.value.matricule;

    let authObs!: Observable<AuthResponseData>;

    this.isLoading = true;

    if(this.isLoginMode){

      authObs = this.authService.login(telephone, matricule)

    }else{

      authObs = this.authService.signup(telephone, matricule)

    }

    authObs.subscribe((resData)=>{

      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);

    }, (errorMessage) => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });

    form.reset();
  }

  onHandleError(){
    this.error = null!;
  }

  private showErrorAlert(message: string){
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }


}


/*

  .subscribe((resData)=>{

        console.log(resData);
        this.isLoading = false;

      }, (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      });

*/
