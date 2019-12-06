import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserQuery} from 'src/app/features/account.module/store/user.store';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private userQuery: UserQuery, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userQuery.isLoggedIn$.pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/', 'account', 'login']);
        }
      })
    );
  }

}
