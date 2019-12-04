import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

(window as any).global = window;
(window as any).process = window;
(window as any).Buffer = window;
(window as any).process.browser = true;
(window as any).process.version = '';
(window as any).process.versions = {node: false};

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor(private apollo: Apollo) {

  }

  public refresh(rpcId: string): Observable<void> {
    return this.apollo
      .mutate({
        mutation: gql`
            mutation{
              refresh(username: "user1", rpcId: "${rpcId}")
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
