import { Component } from '@angular/core';

export enum CurrentState {
  LOGIN,
  REGISTER,
  CONFIRM_EMAIL
}

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  currentStateEnum = CurrentState;

  currentAuthState: CurrentState = CurrentState.REGISTER;


  changeCurrentState(state: CurrentState){
    this.currentAuthState = state;
  }


}
