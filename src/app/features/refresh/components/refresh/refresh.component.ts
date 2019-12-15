import {Component, OnInit} from '@angular/core';
import * as uuid from 'uuid';
import {RefreshService} from 'src/app/features/refresh/services/refresh.service';
import {UserQuery} from 'src/app/features/account.module/store/user.store';
import {merge, Observable, of, Subject} from 'rxjs';
import {mapTo, mergeMap, take, tap} from 'rxjs/operators';
import {KontoService} from 'src/app/features/konto.module/services/konto.service';
import {BuchungenService} from 'src/app/features/buchungen.module/services/buchungen.service';
import {SaldoService} from 'src/app/features/saldo.module/services/saldo.service';
import {KontoStore} from 'src/app/features/konto.module/store/konto.store';
import {SaldoStore} from 'src/app/features/saldo.module/store/saldo.store';
import {BuchungenStore} from 'src/app/features/buchungen.module/store/buchungen.store';


@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss']
})
export class RefreshComponent implements OnInit {
  private rpcId: string = uuid.v4();
  private username$: Observable<string> = this.userQuery.username$.pipe(take(1));

  constructor(
    private refreshService: RefreshService,
    private userQuery: UserQuery,
    private kontoService: KontoService,
    private buchungenService: BuchungenService,
    private saldoService: SaldoService,
    private kontoStore: KontoStore,
    private buchungenStore: BuchungenStore,
    private saldoStore: SaldoStore,
  ) {
  }

  public refresh$: Subject<void> = new Subject<void>().pipe(
    mergeMap(() => this.username$),
    mergeMap((username) => this.refreshService.refresh(username, this.rpcId).pipe(mapTo(username))),
    mergeMap(username => merge(
      this.kontoService.getKonten(username).pipe(tap(konten => this.kontoStore.update({konten}))),
      this.buchungenService.getBuchungen(username).pipe(tap(buchungen => this.buchungenStore.update({buchungen}))),
      this.saldoService.getSaldi(username).pipe(tap(saldi => this.saldoStore.update({saldi}))),
      this.saldoService.getSaldo(username).pipe(tap(saldo => this.saldoStore.update({saldo}))),
    )),
    tap((data) => console.log('Data refreshed', data))
  ) as Subject<any>;

  ngOnInit(): void {
    this.refresh$.subscribe();

    // FIXME
// FIXME

    const autobahn: any = require('autobahn');
    const connection: any = new autobahn.Connection({url: 'ws://127.0.0.1:9090/wamp', realm: 'default'});
    connection.onopen = (session: any): void => {
      function getTan(): any {
        const tan: any = prompt('Bitte gebe deine Tan ein');
        return tan;
      }

      function getTanMedia(): any {
        const tan: any = prompt('Bitte gebe dein TanMedium ein');
        return tan;
      }

      function getTanMech(): any {
        const tan: any = prompt('Bitte gebe deinen Sicherheitsmechanismus ein');
        return tan;
      }

      const NEED_PT_TAN: string = `de.danielr1996.NEED_PT_TAN.${this.rpcId}`;
      const NEED_PT_TANMEDIA: string = `de.danielr1996.NEED_PT_TANMEDIA.${this.rpcId}`;
      const NEED_PT_SECMECH: string = `de.danielr1996.NEED_PT_SECMECH.${this.rpcId}`;
      session.register(NEED_PT_TAN, getTan);
      session.register(NEED_PT_TANMEDIA, getTanMedia);
      session.register(NEED_PT_SECMECH, getTanMech);
    };
    connection.open();
  }
}
