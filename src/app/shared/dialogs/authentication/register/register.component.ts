import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { CurrentState } from '../authentication.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  @Output() changeState = new EventEmitter<CurrentState>();

  
  passwordConfirming(c: AbstractControl): { invalid: boolean } | null {
    if (c.get('password')!.value !== c.get('confirmPassword')!.value) {
        return {invalid: true};
    }else{
      return null;
    }
  }


  registerForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    passwords: this.fb.group({
      password: [null, Validators.minLength(8)],
      confirmPassword: [null, Validators.minLength(8)],
    },{validator: this.passwordConfirming}),
    agreeTerms: [null, Validators.requiredTrue]
  });


  constructor(private fb:FormBuilder, private authService: AuthenticationService){}

  ngOnInit(): void {
    
  }

  submitRegister(){

    this.authService.startRegistration({ email: this.email!.value, password: this.password!.value }).subscribe(
      confirmCode =>{
        this.changeState.emit(CurrentState.CONFIRM_EMAIL);
      }
    )

  }

  get password(){
  return this.registerForm.get('passwords')!.get("password")
  }

  get email(){
    return this.registerForm.get('email');
  }

}
