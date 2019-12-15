import {Component, OnInit} from '@angular/core';
import {combineLatest, merge, Observable} from 'rxjs';
import {Saldo} from 'src/app/features/saldo.module/model/saldo';
import {SaldoService} from 'src/app/features/saldo.module/services/saldo.service';
import {UserQuery} from 'src/app/features/account.module/store/user.store';
import {KontoQuery} from 'src/app/features/konto.module/store/konto.store';
import {mergeMap, startWith, tap, withLatestFrom} from 'rxjs/operators';
import {RefreshService} from 'src/app/features/refresh/services/refresh.service';
import {SaldoQuery} from 'src/app/features/saldo.module/store/saldo.store';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {
  // readonly kontoIds$: Observable<string[]> = this.kontoQuery.kontos$;
  // readonly refresh$: Observable<any> = this.refreshService.refresh$.pipe(startWith(null));
  /* readonly saldo$: Observable<Saldo> = combineLatest(this.kontoIds$, this.refresh$).pipe(
     mergeMap(([kontoIds]) => this.saldoService.getSaldo(null)),
     tap((saldo) => console.log(saldo)),
   );*/
  readonly saldo$: Observable<Saldo> = this.saldoQuery.saldo$;
  readonly isLoggedIn$: Observable<boolean> = this.userQuery.isLoggedIn$;

  constructor(
    private saldoQuery: SaldoQuery,
    private saldoService: SaldoService,
    private userQuery: UserQuery,
    // private kontoQuery: KontoQuery,
    // private refreshService: RefreshService,
  ) {
  }

  ngOnInit(): void {
  }
}
