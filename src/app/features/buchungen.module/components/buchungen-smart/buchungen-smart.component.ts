import { Component, OnInit } from '@angular/core';
import {merge, Observable, of, Subject} from 'rxjs';
import {flatMap, map, mapTo, pluck, scan, tap} from 'rxjs/operators';
import {Buchung} from '../../buchung';
import {BuchungContainer} from '../../buchung-container';
import {BuchungenService} from '../../services/buchungen.service';

@Component({
  selector: 'app-buchungen-smart',
  templateUrl: './buchungen-smart.component.html',
  styleUrls: ['./buchungen-smart.component.scss']
})
export class BuchungenSmartComponent implements OnInit {
  readonly ITEMS_PER_PAGE: number = 10;
  readonly prev$: Subject<number> = new Subject();
  readonly next$: Subject<number> = new Subject();
  private totalPages: number;
  private totalElements: number;

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


  readonly buchungen$: Observable<Buchung[]> = this.page$.pipe(
    flatMap((page: number) => this.buchungenService.getBuchungen(page, this.ITEMS_PER_PAGE)),
    tap((container: BuchungContainer) => {
      this.totalPages = container.totalPages;
      this.totalElements = container.totalElements;
    }),
    pluck('buchungen')
  );

  constructor(private buchungenService: BuchungenService) {
  }

  ngOnInit(): void {
  }
}