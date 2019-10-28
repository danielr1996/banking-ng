import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {catchError, pluck, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {Buchung} from '../model/buchung';
import {BuchungContainer} from '../buchung-container';

@Injectable({
  providedIn: 'root'
})
export class BuchungenService {

  constructor(private apollo: Apollo) {

  }

  public getBuchungen(page?: number, size?: number): Observable<BuchungContainer> {
    let paramQuery: string = '';

    const pageQuery: string = `page: ${page},`;
    const sizeQuery: string = `size: ${size},`;
    const kontoQuery: string = `kontoId: "42601f3b-6e91-4c80-bb11-c5a21d98fc57"`;

    if (page !== undefined && size !== undefined) {
      paramQuery = `(${kontoQuery},${pageQuery}${sizeQuery})`;
    } else {
      paramQuery = `${kontoQuery}`;
    }
    return this.apollo
      .watchQuery({
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
              buchungstag,
              otherPartner{
                iban
                name
              }
             }
            }
          }
        `,
      })
      .valueChanges
      .pipe(
        pluck('data', 'buchungen'),
        catchError((err) => {
          console.error('Connection cannot be established');
          return of(err);
        })
      );
  }
}
