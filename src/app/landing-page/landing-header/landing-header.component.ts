import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationComponent } from 'src/app/shared/dialogs/authentication/authentication.component';

@Component({
  selector: 'landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent {

  constructor(private dialog:MatDialog, private router:Router){}

  openAuthDialog(){
    const token = localStorage.getItem('auth_token');
    
    if(token){
      this.router.navigateByUrl("personal-cabinet");
      return;
    }

    this.dialog.open(
      AuthenticationComponent,
      {panelClass:'custom-dialog'}
      );
  }


}
