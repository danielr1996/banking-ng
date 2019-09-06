import {Component, OnInit, ViewChild} from '@angular/core';
import {SaldoService} from '../../saldo.service';
import {Saldo} from '../../saldo';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ChartEvent, ChartType} from 'ng-chartist';
import {format} from 'date-fns';

@Component({
  selector: 'app-saldi',
  templateUrl: './saldi.component.html',
  styleUrls: ['./saldi.component.scss']
})
export class SaldiComponent implements OnInit {
  public saldi$: Observable<Saldo[]> = this.saldoService.getSaldi().pipe(
    map((saldi: Saldo[]) => saldi.slice(0, 700).reverse())
  );

  type: ChartType = 'Bar';
  /* saldi.map((saldo: Saldo)=>({label: saldo.datum, })).slice(1, 20).reverse() */
  data$: any = this.saldi$.pipe(
    map((saldi: Saldo[]) => {
      const labels: any = saldi.map((saldo: Saldo) => format(new Date(saldo.datum), 'dd'));
      const data: any = saldi.map((saldo: Saldo) => saldo.betrag);

      return {
        'labels': labels,
        series: [data],
      }
        ;
    })
  );
  /*of({
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    series: [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8]
    ]
  });*/

  options: any = {
    axisX: {
      showGrid: false
    },
    height: 300
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

  constructor(private saldoService: SaldoService) {
  }

  ngOnInit(): void {
  }

}
