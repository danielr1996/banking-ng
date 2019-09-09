import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Buchung} from '../../buchung';

@Component({
  selector: 'app-buchungen-table',
  templateUrl: './buchungen-table.component.html',
  styleUrls: ['./buchungen-table.component.scss']
})
export class BuchungenTableComponent implements OnInit {
  @Input() buchungen: Buchung[];

  ngOnInit(): void {
  }
}
