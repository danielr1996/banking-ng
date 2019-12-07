import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Saldo} from 'src/app/features/saldo.module/model/saldo';
import {SaldoService} from 'src/app/features/saldo.module/services/saldo.service';
import {UserQuery} from 'src/app/features/account.module/store/user.store';
import {KontoQuery} from 'src/app/features/konto.module/store/konto.store';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {
  readonly kontoId$: Observable<string[]> = this.kontoQuery.kontos$;
  readonly saldo$: Observable<Saldo> = this.kontoId$.pipe(mergeMap(kontoIds => this.saldoService.getSaldo(kontoIds)));
  readonly isLoggedIn$: Observable<boolean> = this.userQuery.isLoggedIn$;

  constructor(
    private saldoService: SaldoService,
    private userQuery: UserQuery,
    private kontoQuery: KontoQuery,
  ) {
  }

  ngOnInit(): void {
  }
}
