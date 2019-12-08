import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {catchError, mergeMap, tap} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor(private apollo: Apollo) {
    this.refresh$.subscribe();
  }

  public refresh$: Subject<{ userId: string, rpcId: string }> = new Subject<any>().pipe(
    mergeMap(({userId, rpcId}) => this.refresh(userId, rpcId))
  ) as Subject<any>;


  private refresh(userId: string, rpcId: string): Observable<any> {
    return this.apollo
      .query({
        query: gql`
            query{
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
