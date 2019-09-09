import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Buchung} from '../../buchung';

@Component({
  selector: 'app-buchungen-table',
  templateUrl: './combined-table.component.html',
  styleUrls: ['./combined-table.component.scss']
})
export class CombinedTableComponent implements OnInit {
  @Input() buchungen: Buchung[];

  ngOnInit(): void {
  }
}
