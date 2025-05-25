import { CanActivateFn } from '@angular/router';

export const adminloginGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('adminisLoggedin'))
  {
    return true;
  }
  return false;
};
