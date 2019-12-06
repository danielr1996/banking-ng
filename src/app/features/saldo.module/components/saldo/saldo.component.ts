import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Saldo} from 'src/app/features/saldo.module/model/saldo';
import {SaldoService} from 'src/app/features/saldo.module/services/saldo.service';
import {UserQuery} from 'src/app/features/account.module/store/user.store';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {
  readonly saldo$: Observable<Saldo> = this.saldoService.getSaldo();
  readonly isLoggedIn$: Observable<boolean> = this.userQuery.isLoggedIn$;
  constructor(
    private saldoService: SaldoService,
    private userQuery: UserQuery,
  ) {
  }

  ngOnInit(): void {

  }

}
