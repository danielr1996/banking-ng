import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {BehaviorSubject, Observable, of, ReplaySubject} from 'rxjs';
import {BuchungContainer} from '../../buchungen.module/buchung-container';
import gql from 'graphql-tag';
import {catchError, filter, pluck} from 'rxjs/operators';
import {Konto} from './konto';
import {AccountService} from '../../account.module/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class KontoService {
  // public selectedKontos$: BehaviorSubject<string[]> = new BehaviorSubject(this.selectedKontos);

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
