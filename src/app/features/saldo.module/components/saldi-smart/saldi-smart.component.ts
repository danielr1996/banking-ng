import {Component, OnInit} from '@angular/core';
import {merge, Observable, of, Subject} from 'rxjs';
import {map, mapTo, scan} from 'rxjs/operators';
import {Saldo} from 'src/app/features/saldo.module/model/saldo';
import {SaldoService} from 'src/app/features/saldo.module/services/saldo.service';
import {KontoQuery} from 'src/app/features/konto.module/store/konto.store';
import {RefreshService} from 'src/app/features/refresh/services/refresh.service';
import {SaldoQuery} from 'src/app/features/saldo.module/store/saldo.store';

@Component({
  selector: 'app-saldi-smart',
  templateUrl: './saldi-smart.component.html',
  styleUrls: ['./saldi-smart.component.scss']
})
export class SaldiSmartComponent implements OnInit {
  readonly prev$: Subject<number> = new Subject();
  readonly next$: Subject<number> = new Subject();
  private totalPages: number;
  public style: 'table' | 'chart' = 'table';

  readonly page$: Observable<number> = merge(
    of(0).pipe(
      map((page: number) => {
        const urlParams: any = new URLSearchParams(window.location.search);
        const myParam: string = urlParams.get('page');
        if (myParam) {
          page = Number(myParam);
        }
        return page;
      }),
    ),
    this.prev$.pipe(mapTo(-1)),
    this.next$.pipe(mapTo(+1)),
  ).pipe(
    scan((acc: number, curr: number) => {
      let next: number = acc + curr;
      if (next < 0) {
        next = 0;
      }
      if (next === this.totalPages) {
        next = acc;
      }
      return next;
    })
  );
  readonly saldi$: Observable<Saldo[]> = this.saldoQuery.saldi$;

  constructor(
    private saldoService: SaldoService,
    private kontoQuery: KontoQuery,
    private saldoQuery: SaldoQuery,
  ) {
  }

  ngOnInit(): void {
  }

  switch(): void {
    this.style = this.style === 'table' ? 'chart' : 'table';
  }
}
