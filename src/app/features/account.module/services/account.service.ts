import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable, of} from 'rxjs';
import gql from 'graphql-tag';
import {catchError, mergeMap, pluck, tap} from 'rxjs/operators';
import {UserQuery, UserStore} from 'src/app/features/account.module/store/user.store';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private apollo: Apollo, private userStore: UserStore, private userQuery: UserQuery) {

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
      .query({
        query: gql`
            query{
              signIn(user: {
                name: "${name}"
                passwordhash: "${password}"
              })
            }
        `,
      })
      .pipe(
        pluck('data', 'signIn'),
        tap((token) => console.log(`Token obtained ${token}`)),
        tap((token: any) => this.userStore.update(state => ({token}))),
        mergeMap(() => this.userQuery.token$),
        tap((token: any) => console.log(token)),
        catchError((err: Error) => {
          console.error('Error executing query', err);
          return of(err);
        })
      );
  }
}
