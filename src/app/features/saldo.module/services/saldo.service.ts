import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {catchError, pluck, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Saldo} from 'src/app/features/saldo.module/model/saldo';
import {SaldiContainer} from 'src/app/features/saldo.module/model/saldi-container';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  constructor(private apollo: Apollo) {

  }

  public getSaldo(username: string): Observable<Saldo> {
    const userQuery: string = `username: "${username}",`;
    // const kontoQuery: string = `kontoIds: [${kontoIds.map(k => '"' + k + '"').join(',')}]`;
    return this.apollo
      .query({
        query: gql`
          {
            saldo(${userQuery}){
              betrag
              datum
            }
          }
        `,
      })
      .pipe(
        pluck('data', 'saldo'),
      );
  }

  public getSaldi(username: string): Observable<Saldo[]> {
    let paramQuery: string = '';

    // const kontoQuery: string = `kontoIds: [${kontoIds.map(k => '"' + k + '"').join(',')}]`;
    const userQuery: string = `username: "${username}",`;
    // const pageQuery: string = `page: ${page},`;
    // const sizeQuery: string = `size: ${size},`;
    // if (page !== undefined && size !== undefined) {
    //   paramQuery = `(${kontoQuery},${pageQuery}${sizeQuery})`;
    // } else {
    paramQuery = `(${userQuery})`;
    // }
    return this.apollo
      .query({
        query: gql`
          {
            saldi${paramQuery}{
            totalPages
            totalElements
             saldi{
              betrag
              datum
              kontoId
             }
            }
          }
        `,
      })
      .pipe(
        pluck('data', 'saldi', 'saldi'),
        catchError((err) => {
          console.error('Error executing query', err);
          return of(err);
        })
      );
  }
}
