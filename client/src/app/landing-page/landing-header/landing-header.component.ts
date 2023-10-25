import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationComponent } from 'src/app/shared/dialogs/authentication/authentication.component';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent {

  constructor(private authService: AuthenticationService){}

  openAuthDialog(){
    this.authService.openLoginPage();
  }


}
