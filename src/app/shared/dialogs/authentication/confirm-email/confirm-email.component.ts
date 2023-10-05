import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit{

  @ViewChildren('inputEl') inputEls!: QueryList<ElementRef<HTMLInputElement>>;


  confirmForm: FormGroup = new FormGroup({
    validateEmail : new FormArray([
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
    ])
  });

  constructor(private fb:FormBuilder, private authService: AuthenticationService){}

  handleInput(index: number){
    const nextInputIndex = (index + 1).toString();
    const nextInput = this.confirmForm.get('validateEmail')?.get(nextInputIndex);
    // if(nextInput?.pristine){
      this.inputEls.get(index + 1)?.nativeElement.focus();
    // }
  }



  ngOnInit(): void {
  }

  submitConfirm(){
    const resultArr: string[] = this.confirmForm.get("validateEmail")?.getRawValue();
    const result = resultArr.join('');

    this.authService.registerUser(+ result)
    .subscribe(response=>{
      console.log("response",response)
    })
  }

  get validateEmailControls(){
    const validateEmail = <FormArray>this.confirmForm.get('validateEmail');
    return validateEmail.controls;
  }
}
