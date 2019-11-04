import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChartEvent, ChartType} from 'ng-chartist';
import {Saldo} from '../../model/saldo';
import {format} from 'date-fns';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as Chartist from 'chartist';
import 'chartist-plugin-tooltip';
import 'chartist-plugin-pointlabels';

@Component({
  selector: 'app-saldi-chart',
  templateUrl: './saldi-chart.component.html',
  styleUrls: ['./saldi-chart.component.scss']
})
export class SaldiChartComponent implements OnInit {
  @Input() saldi$: Observable<Saldo[]>;
  data$: Observable<{ labels: string[], series: string[][] }>;
  chartType: ChartType = 'Bar';

  options: any = {
    axisX: {
      showGrid: false
    },
    height: 250,
    plugins: [
      Chartist.plugins.ctPointLabels(),
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
