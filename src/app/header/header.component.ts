import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSubscription!: Subscription;

  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }


  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      // this.isAuthenticated = !user ? false : true;
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onSelect(feature: string){
    this.featureSelected.emit(feature);
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
