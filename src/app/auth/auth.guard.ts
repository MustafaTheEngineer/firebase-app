import { inject } from '@angular/core';
import { AuthService } from '../auth.service';

export const authGuard = ():boolean => {
  const authService = inject(AuthService);
  if (authService.isLoggedIn) {
    console.log('Logged in');
    return true;
  } else {
    console.log('Error');
    return false;
  }
};
