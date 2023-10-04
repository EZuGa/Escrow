import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationComponent } from './shared/dialogs/authentication/authentication.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Escrow';

  constructor(private dialog: MatDialog){}

  ngOnInit(): void {
    this.dialog.open(
      AuthenticationComponent,
      {panelClass:'custom-dialog'}
      );
  }

}
