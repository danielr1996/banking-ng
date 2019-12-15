import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {format} from 'date-fns';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Saldo} from 'src/app/features/saldo.module/model/saldo';

@Component({
  selector: 'app-saldi-chart',
  templateUrl: './saldi-chart.component.html',
  styleUrls: ['./saldi-chart.component.scss']
})
export class SaldiChartComponent implements OnInit {
  @Input() saldi$: Observable<Saldo[]>;
  data$: Observable<{ labels: string[], series: string[][] }>;

  constructor() {
  }

  ngOnInit(): void {
    this.data$ = this.saldi$.pipe(
      map((saldi: Saldo[]) => {
        const lbls: any = saldi.map((saldo: Saldo) => format(new Date(saldo.datum), 'dd.MM.yyyy')).reverse();
        const data: any = saldi.map((saldo: Saldo) => saldo.betrag).reverse();
        return {
          series: [data],
          labels: lbls
        };
      }));
  }
}
