import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {BehaviorSubject, Observable, of, ReplaySubject} from 'rxjs';
import {BuchungContainer} from '../../buchungen.module/buchung-container';
import gql from 'graphql-tag';
import {catchError, pluck} from 'rxjs/operators';
import {Konto} from './konto';
import {AccountService} from '../../account.module/account.service';

@Injectable({
  providedIn: 'root'
})
export class KontoService {
  public currentKonto$: BehaviorSubject<string> = new BehaviorSubject(this.currentKonto);

  constructor(private apollo: Apollo, private accountService: AccountService) {

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

  public get currentKonto(): string {
    return localStorage.getItem('currentKonto');
  }

  public set currentKonto(konto: string) {
    localStorage.setItem('currentKonto', konto);
    this.currentKonto$.next(konto);
  }
}
