import { Dialog } from '@angular/cdk/dialog';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationComponent } from 'src/app/shared/dialogs/authentication/authentication.component';

@Component({
  selector: 'app-mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.scss']
})
export class MobileNavigationComponent implements OnInit {

  router = inject(Router);
  dialog = inject(Dialog);

  @HostListener('window:resize', ['$event'])
    getScreenSize(event:any) {
    this.ifNotMobileNavigate();
  }


  ngOnInit(): void {
    this.ifNotMobileNavigate();
  }

  private ifNotMobileNavigate(){
    if(window.innerWidth> 950){
      this.router.navigateByUrl('/');
    }
  }

  openAuthDialog(){
    const token = localStorage.getItem('auth_token');
    
    if(token){
      this.router.navigateByUrl("personal-cabinet");
      return;
    }

    this.dialog.open(
      AuthenticationComponent,
      {
        panelClass:'custom-dialog',
        maxWidth:'100vw',
        maxHeight:'100vh'
      }
      );
  }

}
