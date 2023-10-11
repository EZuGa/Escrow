import { Component } from '@angular/core';

export enum CurrentState {
  LOGIN,
  REGISTER,
  CONFIRM_EMAIL,
  FORGOT_PASSWORD,
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

  currentAuthState: CurrentState = CurrentState.FORGOT_PASSWORD;


  changeCurrentState(state: CurrentState){
    this.currentAuthState = state;
  }


}
