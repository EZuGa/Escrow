import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarManagmentService {

  constructor(private snackbar: MatSnackBar) { 
  }


  openNotify(message:string){
    this.snackbar.open(message,'X',
    {
      panelClass:['notify-snackbar'],
      verticalPosition: 'top',
      duration: 3000
    })
  }

  openAlert(message:string){
    this.snackbar.open(message,'X',
    {
      panelClass:['alert-snackbar'],
      verticalPosition: 'top',
      duration: 3000
    })
  }

  openSuccess(){

  }
}
