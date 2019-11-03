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
  public selectedKontos$: BehaviorSubject<string[]> = new BehaviorSubject(this.selectedKontos);

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

  public get selectedKontos(): string[] {
    return JSON.parse(localStorage.getItem('selectedKontos'));
  }

  public set selectedKontos(kontos: string[]) {
    localStorage.setItem('selectedKontos', JSON.stringify(kontos));
    this.selectedKontos$.next(kontos);
  }
}
