import { AbstractControl } from "@angular/forms";

export function  confirmPassword(c: AbstractControl): { invalid: boolean } | null {
  
    if (c.get('password')!.value !== c.get('repeat_password')!.value) {
        return {invalid: true};
    }else{
      return null;
    }
}