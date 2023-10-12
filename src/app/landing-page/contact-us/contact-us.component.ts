import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  sendMailForm = this.fb.group({
    fullName:['', [Validators.required]],
    email:['', [Validators.email, Validators.required]],
    phone:['', [Validators.required]],
    message:['', [Validators.required]],
    checkbox:[false, [Validators.requiredTrue]],
  })

  constructor(private fb: FormBuilder){}


  submit(){
    console.log("SUVMIT")
  }

}
