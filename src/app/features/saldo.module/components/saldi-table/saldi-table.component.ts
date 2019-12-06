import {Component, Input, OnInit} from '@angular/core';
import {Saldo} from 'src/app/features/saldo.module/model/saldo';

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
