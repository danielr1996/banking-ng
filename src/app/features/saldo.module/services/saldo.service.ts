import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {pluck, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Saldo} from 'src/app/features/saldo.module/model/saldo';
import {SaldiContainer} from 'src/app/features/saldo.module/model/saldi-container';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  constructor(private apollo: Apollo) {

  }

  public getSaldo(kontoIds: string[]): Observable<Saldo> {
    const kontoQuery: string = `kontoIds: [${kontoIds.map(k => '"' + k + '"').join(',')}]`;
    return this.apollo
      .watchQuery({
        query: gql`
          {
            saldo(${kontoQuery}){
              betrag
              datum
            }
          }
        `,
      })
      .valueChanges
      .pipe(
        tap(() => console.log('saldo queried')),
        pluck('data', 'saldo'),
      );
  }

  public getSaldi(kontoIds: string[], page?: number, size?: number): Observable<SaldiContainer> {
    let paramQuery: string = '';

    const kontoQuery: string = `kontoIds: [${kontoIds.map(k => '"' + k + '"').join(',')}]`;
    const pageQuery: string = `page: ${page},`;
    const sizeQuery: string = `size: ${size},`;
    if (page !== undefined && size !== undefined) {
      paramQuery = `(${kontoQuery},${pageQuery}${sizeQuery})`;
    } else {
      paramQuery = `${kontoQuery}`;
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
