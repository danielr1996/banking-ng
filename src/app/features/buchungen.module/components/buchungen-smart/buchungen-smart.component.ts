import {Component, OnInit} from '@angular/core';
import {merge, Observable, of, Subject} from 'rxjs';
import {map, mapTo, scan} from 'rxjs/operators';
import {Buchung} from 'src/app/features/buchungen.module/model/buchung';
import {BuchungenQuery} from 'src/app/features/buchungen.module/store/buchungen.store';

@Component({
  selector: 'app-buchungen-smart',
  templateUrl: './buchungen-smart.component.html',
  styleUrls: ['./buchungen-smart.component.scss']
})
export class BuchungenSmartComponent implements OnInit {
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
    }),
  );
  readonly buchungen$: Observable<Buchung[]> = this.buchungQuery.buchungen$;

  constructor(private buchungQuery: BuchungenQuery) {
  }

  ngOnInit(): void {
  }

  switch(): void {
    this.style = this.style === 'table' ? 'chart' : 'table';
  }
}
