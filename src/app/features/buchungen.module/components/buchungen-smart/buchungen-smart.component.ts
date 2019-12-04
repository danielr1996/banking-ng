import {Component, OnInit} from '@angular/core';
import {combineLatest, merge, Observable, of, Subject, zip} from 'rxjs';
import {filter, flatMap, map, mapTo, pluck, scan, tap} from 'rxjs/operators';
import {Buchung} from '../../model/buchung';
import {BuchungContainer} from '../../buchung-container';
import {BuchungenService} from '../../services/buchungen.service';
import {KontoService} from '../../../konto.module/components/konto.service';
import {KontoQuery} from '../../../konto.module/store/konto.store';

@Component({
  selector: 'app-buchungen-smart',
  templateUrl: './buchungen-smart.component.html',
  styleUrls: ['./buchungen-smart.component.scss']
})
export class BuchungenSmartComponent implements OnInit {
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
    }),
  );


  readonly buchungen$: Observable<Buchung[]> = combineLatest(this.page$, this.konto$.pipe(filter(v => v !== null && v !== undefined))).pipe(
    // tap(([page, konto]) => console.log(page, konto)),
    flatMap(([page, konto]) => this.buchungenService.getBuchungen(konto, page, this.ITEMS_PER_PAGE)),
    tap((container: BuchungContainer) => {
      this.totalPages = container.totalPages;
      this.totalElements = container.totalElements;
    }),
    pluck('buchungen'),
  );

  constructor(private buchungenService: BuchungenService, private kontoQuery: KontoQuery) {
  }

  ngOnInit(): void {
  }

  switch(): void {
    this.style = this.style === 'table' ? 'chart' : 'table';
  }
}
