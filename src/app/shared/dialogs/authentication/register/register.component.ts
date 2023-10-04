import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
    confirmPassword: [null, Validators.required],
    agreeTerms: [null, Validators.requiredTrue]
  });

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    
  }

  submitRegister(){
    if(this.registerForm.invalid){return};

    

  }

}
