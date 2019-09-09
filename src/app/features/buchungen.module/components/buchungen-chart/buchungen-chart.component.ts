import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ChartEvent, ChartType} from "ng-chartist";
import {map} from "rxjs/operators";
import {format} from "date-fns";
import * as Chartist from 'chartist';
import 'chartist-plugin-tooltip';
import 'chartist-plugin-pointlabels';
import {Buchung} from "../../buchung";

@Component({
  selector: 'app-buchungen-chart',
  templateUrl: './buchungen-chart.component.html',
  styleUrls: ['./buchungen-chart.component.scss']
})
export class BuchungenChartComponent implements OnInit {
  @Input() buchungen$: Observable<Buchung[]>;
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
    this.data$ = this.buchungen$.pipe(
      map((buchungen: Buchung[]) => {
        const lbls: any = buchungen.map((buchung: Buchung) => format(new Date(buchung.buchungstag), 'dd.MM.yyyy')).reverse();
        const data: any = buchungen.map((buchung: Buchung) => buchung.betrag).reverse();
        return {
          series: [data],
          labels: lbls
        };
      }));
  }
}
