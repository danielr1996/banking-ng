import {Component, OnInit} from '@angular/core';
import {merge, Observable, of, Subject} from 'rxjs';
import {map, mapTo, scan} from 'rxjs/operators';
import {Buchung} from 'src/app/features/buchungen.module/model/buchung';
import {Saldo} from 'src/app/features/saldo.module/model/saldo';
import {SaldoQuery} from 'src/app/features/saldo.module/store/saldo.store';
import {BuchungenQuery} from 'src/app/features/buchungen.module/store/buchungen.store';

@Component({
  selector: 'app-combined-smart',
  templateUrl: './combined-smart.component.html',
  styleUrls: ['./combined-smart.component.scss']
})
export class CombinedSmartComponent implements OnInit {
  readonly prev$: Subject<number> = new Subject();
  readonly next$: Subject<number> = new Subject();
  private totalPages: number;
  private style: 'table' | 'chart' = 'table';

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

  readonly buchungen$: Observable<Buchung[]> = this.buchungenQuery.buchungen$;
  readonly saldi$: Observable<Saldo[]> = this.saldoQuery.saldi$;

  constructor(private saldoQuery: SaldoQuery, private buchungenQuery: BuchungenQuery) {
  }

  ngOnInit(): void {
  }

  switch(): void {
    this.style = this.style === 'table' ? 'chart' : 'table';
  }
}
