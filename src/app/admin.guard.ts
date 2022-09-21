import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { getAuth , onAuthStateChanged} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private rout: Router){}
  auth :any = getAuth();
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(this.auth, (user) => {
          if (user?.uid == 'WovJv4ZKunenAYfOYnCwBOnK5ZY2') {
            resolve(true);
          } else {
            this.rout.navigate(['/home']);
            resolve(false);
          }
        });
      });
  }
  
}
