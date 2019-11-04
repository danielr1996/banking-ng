import {Component, Input, OnInit} from '@angular/core';
import 'chartist-plugin-tooltip';
import 'chartist-plugin-pointlabels';
import {Observable, zip} from 'rxjs';
import {ChartEvent, ChartType} from 'ng-chartist';
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
  chartType: ChartType = 'Bar';

  options: any = {
    stackBars: true,
    axisX: {
      showGrid: false
    },
    height: 250,
    plugins: [
      // Chartist.plugins.ctPointLabels(),
    ]
  };

  events: ChartEvent = {
    draw: (data: any): any => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: {
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };


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
