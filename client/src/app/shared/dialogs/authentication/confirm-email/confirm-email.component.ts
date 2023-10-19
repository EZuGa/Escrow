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

  keydown(event: any, index: number){
    if((+event.key >= 0 && +event.key <= 9)){
      setTimeout(()=>{this.inputEls.get(index + 1)?.nativeElement.focus()})  
    }else if(event.key === "Backspace"){
      if(event.target.value === ''){
        setTimeout(()=>{this.inputEls.get(index - 1)?.nativeElement.focus()})  
      }
    }
    else{
      event.preventDefault();
    }
  }



  ngOnInit(): void {
  }

  submitConfirm(){
    const resultArr: string[] = this.confirmForm.get("validateEmail")?.getRawValue();
    const result = resultArr.join('');

    this.authService.registerUser(+ result).subscribe();
  }

  get validateEmailControls(){
    const validateEmail = <FormArray>this.confirmForm.get('validateEmail');
    return validateEmail.controls;
  }
}
