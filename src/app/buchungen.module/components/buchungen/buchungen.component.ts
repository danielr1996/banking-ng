import {Component, OnInit} from '@angular/core';
import {flatMap, mapTo, scan, tap} from 'rxjs/operators';
import {BuchungenService} from '../../services/buchungen.service';
import {Buchung} from '../../buchung';
import {merge, Observable, of, Subject,} from 'rxjs';

@Component({
  selector: 'app-buchungen',
  templateUrl: './buchungen.component.html',
  styleUrls: ['./buchungen.component.scss']
})
export class BuchungenComponent implements OnInit {
  readonly ITEMS_PER_PAGE: number = 10;
  readonly prev$: Subject<number> = new Subject();
  readonly next$: Subject<number> = new Subject();
  readonly page$: Observable<number> = merge(
    of(0),
    this.prev$.pipe(mapTo(-1)),
    this.next$.pipe(mapTo(+1)),
  ).pipe(
    scan((acc: number, curr: number) => {
      let next: number = acc + curr;
      if (next < 0) {
        next = 0;
      }
      return next;
    })
  );

  readonly buchungen$: Observable<Buchung[]> = this.page$.pipe(
    flatMap((page: number) => this.buchungenService.getBuchungen(page, this.ITEMS_PER_PAGE)),
    tap(() => console.log('finished'))
  );

  constructor(private buchungenService: BuchungenService) {
  }

  ngOnInit(): void {
  }
}
