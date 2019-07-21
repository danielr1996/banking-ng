import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {pluck, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Buchung} from '../buchung';

@Injectable({
  providedIn: 'root'
})
export class BuchungenService {

  constructor(private apollo: Apollo) {

  }

  public getBuchungen(page?: number, size?: number): Observable<Buchung[]> {
    let paramQuery: string = '';

    const pageQuery: string = `page: ${page},`;
    const sizeQuery: string = `size: ${size},`;
    if (page !== undefined && size !== undefined) {
      paramQuery = `(${pageQuery}${sizeQuery})`;
    }
    return this.apollo
      .watchQuery({
        query: gql`
          {
            buchungen${paramQuery}{
              id
              verwendungszweck
              betrag
              waehrung
              buchungstag
            }
          }
        `,
      })
      .valueChanges
      .pipe(
        pluck('data'),
        pluck('buchungen'),
      );
  }
}
