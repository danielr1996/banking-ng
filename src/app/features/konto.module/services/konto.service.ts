import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable, of} from 'rxjs';
import gql from 'graphql-tag';
import {catchError, pluck} from 'rxjs/operators';
import {Konto} from 'src/app/features/konto.module/model/konto';

@Injectable({
  providedIn: 'root'
})
export class KontoService {

  constructor(private apollo: Apollo) {

  }

  public getKonten(userId: string): Observable<Konto[]> {
    return this.apollo
      .watchQuery({
        query: gql`
          {
            konto(userId: "${userId}"){
              id
              blz
              kontonummer
           }
          }
        `,
      })
      .valueChanges
      .pipe(
        pluck('data', 'konto'),
        catchError((err) => {
          console.error('Connection cannot be established');
          return of(err);
        })
      );
  }
}
