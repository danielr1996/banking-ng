import {Component, Input, OnInit} from '@angular/core';
import {Saldo} from '../../saldo';

@Component({
  selector: 'app-saldi-table',
  templateUrl: './saldi-table.component.html',
  styleUrls: ['./saldi-table.component.scss']
})
export class SaldiTableComponent implements OnInit {
  @Input() saldi: Saldo[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
