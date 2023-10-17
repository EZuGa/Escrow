import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const canAccessCabinetGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("auth_token");
  if(!token){
    return inject(Router).navigateByUrl('/');
  }


  return true;
};
