import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {catchError, pluck, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {Buchung} from '../../buchungen.module/model/buchung';
import {BuchungContainer} from '../../buchungen.module/buchung-container';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor(private apollo: Apollo) {

  }

  public refresh(): Observable<void> {
    return this.apollo
      .mutate({
        mutation: gql`
            mutation{
              refresh(username: "user1")
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
