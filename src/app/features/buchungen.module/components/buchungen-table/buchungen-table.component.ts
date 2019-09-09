import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Buchung} from '../../buchung';

@Component({
  selector: 'app-buchungen-table',
  templateUrl: './buchungen-table.component.html',
  styleUrls: ['./buchungen-table.component.scss']
})
export class BuchungenTableComponent implements OnInit {
  @Input() buchungen: Buchung[];
  @Input() page: number;
  @Output() prev: EventEmitter<void> = new EventEmitter();
  @Output() next: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
  }
}
