import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationComponent } from 'src/app/shared/dialogs/authentication/authentication.component';

@Component({
  selector: 'landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent {

  constructor(private dialog:MatDialog){}

  openAuthDialog(){
    this.dialog.open(
      AuthenticationComponent,
      {panelClass:'custom-dialog'}
      );
  }


}
