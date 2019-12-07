import {Component, OnInit} from '@angular/core';
import {combineLatest, merge, Observable, of, Subject} from 'rxjs';
import {flatMap, map, mapTo, pluck, scan, tap} from 'rxjs/operators';
import {Buchung} from 'src/app/features/buchungen.module/model/buchung';
import {BuchungContainer} from 'src/app/features/buchungen.module/buchung-container';
import {Saldo} from 'src/app/features/saldo.module/model/saldo';
import {BuchungenService} from 'src/app/features/buchungen.module/services/buchungen.service';
import {SaldoService} from 'src/app/features/saldo.module/services/saldo.service';
import {KontoQuery} from 'src/app/features/konto.module/store/konto.store';

@Component({
  selector: 'app-combined-smart',
  templateUrl: './combined-smart.component.html',
  styleUrls: ['./combined-smart.component.scss']
})
export class CombinedSmartComponent implements OnInit {
  readonly ITEMS_PER_PAGE: number = 10;
  readonly prev$: Subject<number> = new Subject();
  readonly next$: Subject<number> = new Subject();
  readonly konto$: Observable<string[]> = this.kontoQuery.kontos$;
  private totalPages: number;
  private totalElements: number;
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


  readonly buchungen$: Observable<Buchung[]> = combineLatest(this.page$, this.konto$).pipe(
    flatMap(([page, konto]) => this.buchungenService.getBuchungen(konto, page, this.ITEMS_PER_PAGE)),
    tap((container: BuchungContainer) => {
      this.totalPages = container.totalPages;
      this.totalElements = container.totalElements;
    }),
    pluck('buchungen')
  );

  readonly saldi$: Observable<Saldo[]> = combineLatest(this.page$, this.konto$).pipe(
    flatMap(([page, kontoIds]) => this.saldoService.getSaldi(kontoIds, page, this.ITEMS_PER_PAGE)),
    pluck('saldi')
  );

  constructor(private buchungenService: BuchungenService, private saldoService: SaldoService, private kontoQuery: KontoQuery) {
  }

  ngOnInit(): void {
  }

  switch(): void {
    this.style = this.style === 'table' ? 'chart' : 'table';
  }
}
