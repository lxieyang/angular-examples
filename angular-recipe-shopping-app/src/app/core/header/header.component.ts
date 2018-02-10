import { 
  Component,
  EventEmitter,
  Output
 } from '@angular/core';
// import { Response } from '@angular/http';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
// import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(
    private dataStorageService: DataStorageService,
    public authService: AuthService
  ) {

  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe((response) => {
      console.log(response);
    });

    // this.dataStorageService.storeRecipes().subscribe((response: HttpEvent<Object>) => {
    //   console.log(response.type == HttpEventType.Sent);
    // });
  }

  onGetData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
 
}