import { Component } from '@angular/core';

export enum CurrentState {
  LOGIN,
  REGISTER,
  CONFIRM_EMAIL,
  FORGOT_PASSWORD,
  NEW_PASSWORD
}

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  get StateEnum(){
    return CurrentState;
  }

  currentAuthState: CurrentState = CurrentState.LOGIN;



  changeCurrentState(state: CurrentState){
    this.currentAuthState = state;
  }

  closeDialog(){
    // this.dialogRef.close();
  }


}
