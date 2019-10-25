import {Component, OnInit} from '@angular/core';
import {SaldoService} from '../../saldo.service';
import {Saldo} from '../../saldo';
import {merge, Observable, of, Subject} from 'rxjs';
import {flatMap, map, mapTo, pluck, scan, tap} from 'rxjs/operators';
import {SaldiContainer} from '../../saldi-container';

@Component({
  selector: 'app-saldi-smart',
  templateUrl: './saldi-smart.component.html',
  styleUrls: ['./saldi-smart.component.scss']
})
export class SaldiSmartComponent implements OnInit {
  readonly ITEMS_PER_PAGE: number = 10;
  readonly prev$: Subject<number> = new Subject();
  readonly next$: Subject<number> = new Subject();
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

  public saldi$: Observable<Saldo[]> = this.page$.pipe(
    flatMap((page: number) => this.saldoService.getSaldi(page, this.ITEMS_PER_PAGE)),
    tap((container: SaldiContainer) => {
      this.totalPages = container.totalPages;
      this.totalElements = container.totalElements;
    }),
    pluck('saldi')
  );

  constructor(private saldoService: SaldoService) {
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
