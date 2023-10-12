import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { finalize, from } from 'rxjs';


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

  isLoading = false;

  constructor(private fb: FormBuilder){}


  submit(){
    this.isLoading = true;
    const { checkbox, ...formData } = this.sendMailForm.getRawValue();
    from(emailjs.send("service_pkrysyt","template_7rv5oiw",formData,"wSk38ZlTWAJVXXSVt"))
    .pipe(finalize(()=>this.isLoading = false))
    .subscribe(()=>{this.sendMailForm.reset()})
  }

}
