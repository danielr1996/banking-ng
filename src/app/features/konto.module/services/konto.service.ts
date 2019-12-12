import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable, of} from 'rxjs';
import gql from 'graphql-tag';
import {catchError, pluck, tap} from 'rxjs/operators';
import {Konto} from 'src/app/features/konto.module/model/konto';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class KontoService {

  constructor(private apollo: Apollo) {

  }

  public getKonten(username: string): Observable<Konto[]> {
    return this.apollo
      .query({
        query: gql`
          {
            konten(username: "${username}"){
              id
              blz
              kontonummer
              bankaccount
              tanmedia
              secmech
              active
           }
          }
        `,
      })
      .pipe(
        pluck('data', 'konten'),
        catchError((err) => {
          console.error('Error executing query', err);
          return of(err);
        })
      );
  }

  public deleteKonto(kontoId: string): Observable<Konto> {
    return this.apollo
      .query({
        query: gql`
          {
            deleteKonto(kontoId: "${kontoId}"){
              id
           }
          }
        `,
      })
      .pipe(
        pluck('data', 'deleteKonto'),
        catchError((err) => {
          console.error('Error executing query', err);
          return of(err);
        })
      );
  }

  public createKonto(konto: Konto): Observable<Konto> {
    return this.apollo
      .query({
        query: gql`
          query{
            createKonto(konto: {
              id: "${uuid()}"
              secmech:"${konto.secmech}"
              tanmedia:"${konto.tanmedia}"
              blz:"${konto.blz}",
              password:"${konto.password}"
              kontonummer: "${konto.kontonummer}"
              bankaccount: "${konto.bankaccount}"
            }){
              id
              blz
              kontonummer
              secmech
              bankaccount
              tanmedia
              active
            }
          }
        `
      })
      .pipe(
        pluck('data', 'konto'),
        catchError((err) => {
          console.error('Error executing query', err);
          return of(err);
        })
      );
  }
}
