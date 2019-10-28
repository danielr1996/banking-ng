import {Component, OnInit} from '@angular/core';
import {combineLatest, merge, Observable, of, Subject} from 'rxjs';
import {flatMap, map, mapTo, pluck, scan, tap} from 'rxjs/operators';
import {Buchung} from "../../../buchungen.module/model/buchung";
import {BuchungContainer} from "../../../buchungen.module/buchung-container";
import {Saldo} from "../../../saldo.module/saldo";
import {BuchungenService} from "../../../buchungen.module/services/buchungen.service";
import {SaldoService} from "../../../saldo.module/saldo.service";
import {KontoService} from '../../../konto.module/components/konto.service';

@Component({
  selector: 'app-combined-smart',
  templateUrl: './combined-smart.component.html',
  styleUrls: ['./combined-smart.component.scss']
})
export class CombinedSmartComponent implements OnInit {
  readonly ITEMS_PER_PAGE: number = 10;
  readonly prev$: Subject<number> = new Subject();
  readonly next$: Subject<number> = new Subject();
  readonly konto$: Observable<string> = this.kontoService.currentKonto$;
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

  readonly saldi$: Observable<Saldo[]> = this.page$.pipe(
    flatMap((page: number) => this.saldoService.getSaldi(page, this.ITEMS_PER_PAGE)),
    pluck('saldi')
  )

  constructor(private buchungenService: BuchungenService, private saldoService: SaldoService, private kontoService: KontoService) {
  }

  ngOnInit(): void {
  }

  switch(): void {
    this.style = this.style === 'table' ? 'chart' : 'table';
  }
}
