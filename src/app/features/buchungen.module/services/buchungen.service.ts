import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {catchError, pluck} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {BuchungContainer} from 'src/app/features/buchungen.module/buchung-container';
import {Buchung} from 'src/app/features/buchungen.module/model/buchung';

@Injectable({
  providedIn: 'root'
})
export class BuchungenService {

  constructor(private apollo: Apollo) {

  }

  public getBuchungen(username: string): Observable<Buchung[]> {
    let paramQuery: string = '';

    // const pageQuery: string = `page: ${page},`;
    const userQuery: string = `username: "${username}",`;
    // const sizeQuery: string = `size: ${size},`;
    // const kontoQuery: string = `kontoIds: [${kontoIds.map(k => '"' + k + '"').join(',')}]`;

    // if (page !== undefined && size !== undefined) {
    //   paramQuery = `(${kontoQuery},${pageQuery}${sizeQuery})`;
    // } else {
    paramQuery = `(${userQuery})`;
    // }
    return this.apollo
      .query({
        query: gql`
          {
            buchungen${paramQuery}{
            totalPages
            totalElements
             buchungen{
              id
              verwendungszweck
              betrag
              waehrung
              buchungstag
              konto{
                kontonummer
              }
              otherPartner{
                iban
                name
              }
             }
            }
          }
        `,
      })
      .pipe(
        pluck('data', 'buchungen', 'buchungen'),
        catchError((err) => {
          console.error('Error executing query', err);
          return of(err);
        })
      );
  }
}
