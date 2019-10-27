import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map, pluck, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Buchung} from '../buchungen.module/model/buchung';
import {Saldo} from './saldo';
import {SaldiContainer} from './saldi-container';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  constructor(private apollo: Apollo) {

  }

  public getSaldo(): Observable<Saldo> {
    return this.apollo
      .watchQuery({
        query: gql`
          {
            saldo{
              betrag
              datum
            }
          }
        `,
      })
      .valueChanges
      .pipe(
        pluck('data', 'saldo'),
      );
  }

  public getSaldi(page?: number, size?: number): Observable<SaldiContainer> {
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
            saldi${paramQuery}{
            totalPages
            totalElements
             saldi{
              betrag
              datum
             }
            }
          }
        `,
      })
      .valueChanges
      .pipe(
        pluck('data', 'saldi'),
      );
  }
}
