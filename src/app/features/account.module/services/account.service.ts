import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {BehaviorSubject, Observable, of} from 'rxjs';
import gql from 'graphql-tag';
import {catchError, pluck, tap} from 'rxjs/operators';
import {UserStore} from '../store/user.store';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // public currentUserJwt$: BehaviorSubject<string> = new BehaviorSubject(this.currentUserJwt);

  constructor(private apollo: Apollo, private userStore: UserStore) {

  }

  public register(username: string, password: string): Observable<{ id: string, name: string }> {
    return this.apollo
      .mutate({
        mutation: gql`
            mutation{
              createUser(user: {
                name: "${username}"
                password: "${password}"
              }){
                name
              }
            }
        `,
      })
      .pipe(
        pluck('data', 'createUser'),
        catchError((err: Error) => {
          console.error('Error executing query', err);
          return of(err);
        })
      ) as Observable<{ id: string, name: string }>;
  }

  public signin(name: string, password: string): Observable<string> {
    return this.apollo
      .mutate({
        mutation: gql`
            mutation{
              signIn(user: {
                name: "${name}"
                password: "${password}"
              })
            }
        `,
      })
      .pipe(
        pluck('data', 'signIn'),
        tap((token: any) => this.userStore.update(state => ({token}))),
        catchError((err: Error) => {
          console.error('Error executing query', err);
          return of(err);
        })
      );
  }
}
