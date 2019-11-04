import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SaldoService} from '../../services/saldo.service';
import {Saldo} from '../../model/saldo';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {
  readonly saldo$: Observable<Saldo> = this.saldoService.getSaldo();

  constructor(private saldoService: SaldoService) {
  }

  ngOnInit(): void {

  }

}
