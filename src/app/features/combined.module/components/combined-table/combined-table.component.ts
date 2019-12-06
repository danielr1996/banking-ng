import {Component, Input, OnInit} from '@angular/core';
import {Buchung} from 'src/app/features/buchungen.module/model/buchung';

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
