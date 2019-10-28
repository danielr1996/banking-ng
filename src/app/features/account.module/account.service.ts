import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable, of} from 'rxjs';
import gql from 'graphql-tag';
import {catchError, pluck, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private apollo: Apollo) {

  }

  public register(username: string, password: string): Observable<{ id: string, name: string }> {
    console.log(username, password);
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
      );
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
        tap((token: any) => {
          localStorage.setItem('currentUser', token);
        }),
        catchError((err: Error) => {
          console.error('Error executing query', err);
          return of(err);
        })
      );
  }
}
