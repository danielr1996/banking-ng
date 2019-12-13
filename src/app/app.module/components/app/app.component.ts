import {Component} from '@angular/core';
import {UserQuery} from 'src/app/features/account.module/store/user.store';
import {KontoService} from 'src/app/features/konto.module/services/konto.service';
import {mergeMap, tap} from 'rxjs/operators';
import {merge} from 'rxjs';
import {KontoStore} from 'src/app/features/konto.module/store/konto.store';
import {BuchungenService} from 'src/app/features/buchungen.module/services/buchungen.service';
import {BuchungenStore} from 'src/app/features/buchungen.module/store/buchungen.store';
import {SaldoService} from 'src/app/features/saldo.module/services/saldo.service';
import {SaldoStore} from 'src/app/features/saldo.module/store/saldo.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public userQuery: UserQuery,
    private konto: UserQuery,
    private kontoService: KontoService,
    private buchungenService: BuchungenService,
    private saldoService: SaldoService,
    private buchungenStore: BuchungenStore,
    private kontoStore: KontoStore,
    private saldoStore: SaldoStore,
  ) {
    this.userQuery.username$.pipe(
      mergeMap(username => merge(
        this.kontoService.getKonten(username).pipe(tap(konten => kontoStore.update({konten}))),
        this.buchungenService.getBuchungen(username).pipe(tap(buchungen => buchungenStore.update({buchungen}))),
        this.saldoService.getSaldi(username).pipe(tap(saldi => saldoStore.update({saldi}))),
        this.saldoService.getSaldo(username).pipe(tap(saldo => saldoStore.update({saldo}))),
      ))
    ).subscribe();
  }
}
