import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor(private apollo: Apollo) {

  }

  public refresh(userId: string, rpcId: string): Observable<void> {
    return this.apollo
      .mutate({
        mutation: gql`
            mutation{
              refresh(username: "${userId}", rpcId: "${rpcId}")
            }
        `,
      })
      .pipe(
        catchError(err => {
          console.error('Error executing query', err);
          return of(err);
        })
      );
  }
}
