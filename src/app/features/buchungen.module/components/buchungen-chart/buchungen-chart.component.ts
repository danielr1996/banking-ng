import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {format} from 'date-fns';
import {Buchung} from 'src/app/features/buchungen.module/model/buchung';

@Component({
  selector: 'app-buchungen-chart',
  templateUrl: './buchungen-chart.component.html',
  styleUrls: ['./buchungen-chart.component.scss']
})
export class BuchungenChartComponent implements OnInit {
  @Input() buchungen$: Observable<Buchung[]>;
  constructor() {
  }

  ngOnInit(): void {

  }
}
