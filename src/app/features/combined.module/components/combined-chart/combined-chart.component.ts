import {Component, Input, OnInit} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {Buchung} from 'src/app/features/buchungen.module/model/buchung';
import {Saldo} from 'src/app/features/saldo.module/model/saldo';
import {map} from 'rxjs/operators';
import {format} from 'date-fns';

@Component({
  selector: 'app-combined-chart',
  templateUrl: './combined-chart.component.html',
  styleUrls: ['./combined-chart.component.scss']
})
export class CombinedChartComponent implements OnInit {
  @Input() buchungen$: Observable<Buchung[]>;
  @Input() saldi$: Observable<Saldo[]>;

  data$: Observable<{ labels: string[], series: string[][] }>;

  constructor() {
  }

  ngOnInit(): void {
    this.data$ = zip(
      this.buchungen$,
      this.saldi$,
    ).pipe(map((arr: any[]) => {
      const buchungen: Buchung[] = arr[0];
      const saldi: Buchung[] = arr[1];
      const lbls: any = buchungen.map((buchung: Buchung) => format(new Date(buchung.buchungstag), 'dd.MM.yyyy')).reverse();
      const data1: any = buchungen.map((buchung: Buchung) => buchung.betrag).reverse();
      const data2: any = saldi.map((buchung: Buchung) => buchung.betrag).reverse();
      return {
        series: [data1, data2],
        labels: lbls
      };
    }));
  }
}
