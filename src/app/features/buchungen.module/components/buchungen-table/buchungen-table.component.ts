import {Component, Input, OnInit} from '@angular/core';
import {Buchung} from 'src/app/features/buchungen.module/model/buchung';

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
