import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {combineLatest, Observable, of} from 'rxjs';
import {UserQuery} from 'src/app/features/account.module/store/user.store';
import {map, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private userQuery: UserQuery) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request$: Observable<HttpRequest<any>> = of(request);
    const token$: Observable<string> = this.userQuery.token$;

    return combineLatest(request$, token$).pipe(
      map(([req, token]) => req.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })),
      mergeMap((req) => next.handle(req))
    );
  }
}
