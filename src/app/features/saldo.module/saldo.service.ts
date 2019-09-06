import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {pluck, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Buchung} from '../buchungen.module/buchung';
import {Saldo} from './saldo';

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

  public getSaldi(): Observable<Saldo[]> {
    return this.apollo
      .watchQuery({
        query: gql`
          {
            saldi{
              betrag
              datum
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
