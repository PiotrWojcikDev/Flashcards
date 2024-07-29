import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { SetService } from '../services/set.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const setService = inject(SetService);
  
  const userId = authService.getCurrentUserId();
  const setId = route.params['setId'];

  if (!userId) {
    router.navigate(['/login']);
    return false;
  }

  return setService.getSetById(setId).pipe(
    map(set => {
      const isOwner = set.userId === parseInt(userId);
      if(!isOwner){
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
