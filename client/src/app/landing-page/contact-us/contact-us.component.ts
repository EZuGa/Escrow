import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { finalize, from } from 'rxjs';
import { SnackbarManagmentService } from 'src/app/shared/services/snackbar-managment/snackbar-managment.service';


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

  constructor(private fb: FormBuilder, private snackbar: SnackbarManagmentService){
  }


  submit(){
    this.isLoading = true;
    const { checkbox, ...formData } = this.sendMailForm.getRawValue();
    from(emailjs.send("service_pkrysyt","template_7rv5oiw",formData,"wSk38ZlTWAJVXXSVt"))
    .pipe(finalize(()=>this.isLoading = false))
    .subscribe(
    ()=>{this.sendMailForm.reset()},
    error=>{this.snackbar.openAlert("Could't send a message!")}
    )
  }

}
