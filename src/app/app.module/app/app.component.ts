import {Component} from '@angular/core';
import {UserQuery} from 'src/app/features/account.module/store/user.store';
import {KontoService} from 'src/app/features/konto.module/services/konto.service';
import {mergeAll, mergeMap, tap} from 'rxjs/operators';
import {merge} from 'rxjs';
import {KontoStore} from 'src/app/features/konto.module/store/konto.store';
import {BuchungenService} from 'src/app/features/buchungen.module/services/buchungen.service';
import {BuchungenStore} from 'src/app/features/buchungen.module/store/buchungen.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private userQuery: UserQuery,
    private kontoService: KontoService,
    private buchungenService: BuchungenService,
    private buchungenStore: BuchungenStore,
    private kontoStore: KontoStore,
  ) {
    this.userQuery.userId$.pipe(
      mergeMap(userid => merge(
        this.kontoService.getKonten(userid).pipe(tap(konten => kontoStore.update({konten}))),
        // this.buchungenService.getBuchungen().pipe(tap(konten => kontoStore.update({konten}))),
      ))
    ).subscribe();
  }
}
