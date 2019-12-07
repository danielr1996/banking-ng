import {Component, OnInit} from '@angular/core';
import {combineLatest, merge, Observable, of, Subject} from 'rxjs';
import {filter, flatMap, map, mapTo, pluck, scan, tap} from 'rxjs/operators';
import {Saldo} from 'src/app/features/saldo.module/model/saldo';
import {SaldiContainer} from 'src/app/features/saldo.module/model/saldi-container';
import {SaldoService} from 'src/app/features/saldo.module/services/saldo.service';
import {KontoQuery} from 'src/app/features/konto.module/store/konto.store';

@Component({
  selector: 'app-saldi-smart',
  templateUrl: './saldi-smart.component.html',
  styleUrls: ['./saldi-smart.component.scss']
})
export class SaldiSmartComponent implements OnInit {
  readonly ITEMS_PER_PAGE: number = 10;
  readonly prev$: Subject<number> = new Subject();
  readonly next$: Subject<number> = new Subject();
  readonly konto$: Observable<string[]> = this.kontoQuery.kontos$;
  private totalPages: number;
  private totalElements: number;
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

  public saldi$: Observable<Saldo[]> = combineLatest(this.page$, this.konto$.pipe(filter(v => v !== null && v !== undefined))).pipe(
    flatMap(([page, kontoIds]) => this.saldoService.getSaldi(kontoIds, page, this.ITEMS_PER_PAGE)),
    tap((container: SaldiContainer) => {
      this.totalPages = container.totalPages;
      this.totalElements = container.totalElements;
    }),
    pluck('saldi')
  );

  constructor(
    private saldoService: SaldoService,
    private kontoQuery: KontoQuery) {
  }

  ngOnInit(): void {
  }

  switch(): void {
    this.style = this.style === 'table' ? 'chart' : 'table';
  }

  repeat(n: number): any {
    return [...Array(n).keys()];
  }
}
